using AutoMapper;
using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Domain.Profiles;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text.Json;
using System.Text.Json.Nodes;

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

    public SignupController(IMapper mapper, BankContext context)
    {
        _bank = context;
        _mapper = mapper;
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
            Console.WriteLine("lol", bodyData.Cpf);
            var newUser = _mapper.Map<User>(bodyData);
            await _bank.Users.AddAsync(newUser);
            _bank.SaveChanges();

            Console.WriteLine(newUser.Id);
            var newAddress = _mapper.Map<Address>(bodyData, opts =>
            {
                opts.AfterMap((src, dest) => dest.UserId = newUser.Id);
            });
            var newAccount = _mapper.Map<Account>(bodyData, opts =>
            {
                opts.AfterMap((src, dest) => dest.UserId = newUser.Id);
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
            //return Ok(responseText);
        }
        catch (JsonException ex)
        {
            transaction.Rollback();
            return BadRequest("Invalid request body: " + ex.Message);
        }
    }
}
