using AutoMapper;
using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImaPay_BackEnd.Controllers;

/// <summary>
/// Controller for the signup form.
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
    /// Creates a new account for the user.
    /// </summary>
    /// <returns>a object with the message "successfull" and the moment of creation.</returns>
    [HttpPost]
    public async Task<IActionResult> Get([FromBody] SignupDto bodyData)
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
            await _bank.Addresses.AddAsync(newAddress);
            await _bank.Accounts.AddAsync(newAccount);
            await _bank.SaveChangesAsync();
            await transaction.CommitAsync();
            
            var responseText = new
            {
                Message = "Successful",
                CreatedAt = DateTime.UtcNow
            }; 
            return CreatedAtAction(nameof(Get), responseText);
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

    //private async Task<bool> CheckIfUserExists(string userCpf, string userEmail)
    //{
    //    List<User> userData = _userRepository.GetAll();
    //    return _userRepository.IsCpfRegistered(userData, userCpf) && _userRepository.IsEmailRegistered(userData, userEmail);
    //}

    private int GenerateRandomAccountNumber()
    {
        Random random = new Random();
        int randomNubmer = random.Next(1, 999999);
        List<Account> userAccounts = _accountRepository.GetAll();
        bool doesAccountExist = _accountRepository.CheckIfAccountExists(userAccounts, randomNubmer.ToString());
        if (doesAccountExist) GenerateRandomAccountNumber();
        return randomNubmer;
    }
}
