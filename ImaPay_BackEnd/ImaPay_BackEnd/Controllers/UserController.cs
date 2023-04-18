using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Helpers;
using ImaPay_BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ImaPay_BackEnd.Controllers;

[ApiController]
[Route("/users")]
public class UserController : ControllerBase
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

    /// <summary>
    /// Envia um email para  serviço mailTrap com o link para redefinir a senha do usuario
    /// </summary>
    /// <returns></returns>

    [HttpPost]
    [Route("recovery")]
    public IActionResult SendRecoveryEmail([FromBody] UserEmailDto userEmailDto)
    {
        bool isEmailRegistered = _bank.Users.Any(user => user.Email == userEmailDto.userEmail);
        if (!isEmailRegistered)
            return StatusCode(statusCode: (int)HttpStatusCode.NotFound,
                value: new {
                    Message = $"O email {userEmailDto.userEmail} nao esta cadastrado em nosso sistema",
                    Moment = DateTime.Now
                });

        EmailService.SendEmail(EmailContent.emailSubject,EmailContent.htmlMarkup);

        return Ok(userEmailDto.userEmail);
    }

    /// <summary>
    /// Redefine a senha do usuario
    /// </summary>
    /// <returns></returns>


    [HttpPost]
    [Route("reset-password")]
    public IActionResult CreateNewPassword([FromBody] ResetPasswordDto resetPasswordDto)
    {
        return Ok(resetPasswordDto);
    }


}

