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
    /// Returns a hello message.
    /// </summary>
    /// <returns>The hello message.</returns>
    [HttpPost]
    public async Task<IActionResult> Get([FromBody] SignupDto bodyData)
    {
        try
        {
            Console.WriteLine("lol", bodyData.Cpf);

            var newUser = _mapper.Map<User>(bodyData);
            var newAddress = _mapper.Map<Address>(bodyData);
            var newAccount = _mapper.Map<Account>(bodyData);

            var responseText = new { message = "ok" };

            await _bank.Accounts.AddAsync(newAccount);
            await _bank.Users.AddAsync(newUser);
            await _bank.Addresses.AddAsync(newAddress);
            await _bank.SaveChangesAsync();

            return Ok(responseText);
        }
        catch (JsonException ex)
        {
            return BadRequest("Invalid request body: " + ex.Message);
        }
    }
}
