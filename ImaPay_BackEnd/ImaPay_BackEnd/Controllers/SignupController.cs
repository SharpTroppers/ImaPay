using AutoMapper;
using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories;
using ImaPay_BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImaPay_BackEnd.Controllers;

/// <summary>
/// Controlador para o formulário de cadastro.
/// </summary>
[ApiController]
[Route("/signups")]
public class SignupController : ControllerBase
{
    private readonly BankContext _bank;
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;
    private readonly IAccountRepository _accountRepository;

    public SignupController(IAccountRepository accountRepository, IUserRepository userRepository, IMapper mapper, BankContext context)
    {
        _bank = context;
        _mapper = mapper;
        _userRepository = userRepository;
        _accountRepository = accountRepository;
    }

    /// <summary>
    /// Cria uma nova conta para o usuário.
    /// </summary>
    /// <remarks>
    /// Aqui você pode fornecer detalhes adicionais sobre a ação.
    /// </remarks>
    /// <param name="bodyData">Dados do formulário de cadastro.</param>
    /// <returns>Um objeto com a mensagem "successful" e o momento da criação.</returns>
    /// <response code="201">Retorna a resposta com sucesso.</response>
    /// <response code="400">Retorna a resposta com erro.</response>
    
    [HttpPost]
    public async Task<IActionResult> CreateAccount([FromBody] SignupDto bodyData)
    {
        var transaction = await _bank.Database.BeginTransactionAsync();
        try
        {
            FormValidatorController validator = new FormValidatorController();


            List<string> formValidation = validator.ValidateSignupForm(bodyData);
            if (formValidation.Any()) throw new Exception(string.Join(',', formValidation));
            
            List<User> userData = _userRepository.GetAll();
            if (_userRepository.IsCpfRegistered(userData, bodyData.Cpf)) throw new Exception("cpfAlreadyRegistered");
            if(_userRepository.IsEmailRegistered(userData, bodyData.Email)) throw new Exception("emailAlreadyRegistered"); ;

            var newUser = _mapper.Map<User>(bodyData);
            await _bank.Users.AddAsync(newUser);
            await _bank.SaveChangesAsync();

            var newAddress = _mapper.Map<Address>(bodyData, opts =>
            {
                opts.AfterMap((src, dest) => dest.UserId = newUser.Id);
            });
            var newAccount = _mapper.Map<Account>(bodyData, opts =>
            {
                opts.AfterMap((src, dest) => {
                    dest.UserId = newUser.Id;
                    dest.Agency = "001";
                    dest.AccountNumber = GenerateRandomAccountNumber();
                    });
            });

            var passwordHash = PasswordVerificationService.HashPassword(newUser.Password);
            var teste = PasswordVerificationService.CheckPassword(newUser.Password, passwordHash); 
            newUser.Password = passwordHash;
            Console.WriteLine("asdas " + teste);

            await _bank.Addresses.AddAsync(newAddress);
            await _bank.Accounts.AddAsync(newAccount);
            await _bank.SaveChangesAsync();
            await transaction.CommitAsync();
            
            var responseText = new
            {
                Message = "Successful",
                CreatedAt = DateTime.UtcNow
            }; 
            return CreatedAtAction(nameof(CreateAccount), responseText);
        }
        catch (DbUpdateException ex)
        {
            transaction.Rollback();
            var response = new
            {
                Message2 = "Invalid request body",
                ErrorCode = ex.Message,
                Time = DateTime.Now
            };
            return BadRequest(response);
        }
        catch (Exception ex)
        {
            transaction.Rollback();
            Console.WriteLine($"Error: {ex.Message}");
            var response = new
            {
                Message = "Invalid request body",
                ErrorCode = ex.Message,
                Time = DateTime.Now
            };
            return BadRequest(response);
        }
    }

    /// <summary>
    /// Gera um número de conta aleatório e verifica se já existe na base de dados.
    /// </summary>
    /// <returns>O número da conta gerada.</returns>
    private int GenerateRandomAccountNumber()
    {
        Random random = new Random();
        int randomNubmer = random.Next(1, 999999);
        List<Account> userAccounts = _accountRepository.GetAllAccounts();
        bool doesAccountExist = _accountRepository.CheckIfAccountExists(userAccounts, randomNubmer);
        if (doesAccountExist) GenerateRandomAccountNumber();
        return randomNubmer;
    }
}
