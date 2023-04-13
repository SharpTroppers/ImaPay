using ImaPay_BackEnd.Domain;
using Microsoft.AspNetCore.Mvc;

namespace ImaPay_BackEnd.Controllers;

[ApiController]
[Route("/users")]
public class UserController:ControllerBase
{
    private BankContext _bank;

    public UserController(BankContext context)
    {
        _bank = context;
    }

    /// <summary>
    /// Pega todos Usuários
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _bank.Users.ToList();

        return Ok(users);
    }
}

