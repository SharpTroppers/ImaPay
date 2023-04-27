using AutoMapper;
using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories.Interfaces;
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
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;
    private readonly IAccountRepository _accountRepository;
    private readonly IAddressRepository _addressRepository;

    /// <summary>
    /// Injeção de dependencia dos repositorios utilizados, alem do automapper
    /// </summary>
    public SignupController(IAccountRepository accountRepository, IUserRepository userRepository, IAddressRepository addressRepository, IMapper mapper)
    {
        _mapper = mapper;
        _userRepository = userRepository;
        _accountRepository = accountRepository;
        _addressRepository = addressRepository;
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
        //var transaction = await _bank.Database.BeginTransactionAsync();

        try
        {
            SignupService validator = new SignupService();

            List<string> formValidation = validator.ValidateSignupForm(bodyData);

            if (formValidation.Any()) throw new Exception(string.Join(',', formValidation));

            var userData = await _userRepository.GetAll();



            if (await _userRepository.IsCpfRegistered(bodyData.Cpf))
                throw new Exception("cpfAlreadyRegistered");

            if (await _userRepository.IsEmailRegistered(bodyData.Email))
                throw new Exception("emailAlreadyRegistered"); ;

            var newUser = _mapper.Map<User>(bodyData);
            await _userRepository.Add(newUser);

            var newAddress = _mapper.Map<Address>(bodyData, opts =>
            {
                opts.AfterMap((src, dest) => dest.UserId = newUser.Id);
            });

            long accNumber = await GenerateRandomAccountNumber();

            var newAccount = _mapper.Map<Account>(bodyData, opts =>
            {
                opts.AfterMap((src, dest) =>
                {
                    dest.UserId = newUser.Id;
                    dest.Agency = "001";
                    dest.AccountNumber = accNumber;
                });
            });

            //var passwordHash = PasswordVerificationService.HashPassword(newUser.Password);
            //newUser.Password = passwordHash;

            await _addressRepository.Add(newAddress);
            await _accountRepository.Add(newAccount);

            //await transaction.CommitAsync();

            var responseText = new
            {
                Message = "Successful",
                CreatedAt = DateTime.UtcNow
            };
            return CreatedAtAction(nameof(CreateAccount), responseText);
        }
        catch (DbUpdateException ex)
        {
            //transaction.Rollback();
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
            //transaction.Rollback();
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
    private async Task<long> GenerateRandomAccountNumber()
    {
        Random random = new Random();
        int randomNubmer = random.Next(1, 999);
        Account account = await _accountRepository.GetByAccountNumber(randomNubmer);

        if (account != null) await GenerateRandomAccountNumber();

        return randomNubmer;
    }
}
