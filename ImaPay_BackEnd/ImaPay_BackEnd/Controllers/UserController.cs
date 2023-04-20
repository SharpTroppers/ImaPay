using AutoMapper;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Helpers;
using ImaPay_BackEnd.Repositories;
using ImaPay_BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ImaPay_BackEnd.Controllers;

[ApiController]
[Route("/users")]
public class UserController : ControllerBase
{
    private readonly IRepository _userRepository;
    private readonly IMapper _mapper;

    public UserController(IRepository userRepository, IMapper mapper )
    {
        _mapper = mapper;
        _userRepository = userRepository;
    }

    /// <summary>
    /// Pega todos Usuários
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userRepository.GetAll();

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
        var users = _userRepository.GetAll();
        bool isEmailRegistered = AuthenticationService.isEmailRegistered(users, userEmailDto.Email);


        if (!isEmailRegistered)
            return StatusCode(statusCode: (int)HttpStatusCode.NotFound,
                value: new {
                    Message = $"O email {userEmailDto.Email} nao esta cadastrado em nosso sistema",
                    Moment = DateTime.Now
                });

        EmailService.SendEmail(EmailContent.emailSubject,EmailContent.htmlMarkup);

        return Ok(userEmailDto.Email);
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

    [HttpPost]
    [Route("login")]

    public IActionResult Login([FromBody] LoginDto loginDto)
    {
        var users = _userRepository.GetAll();

        bool isEmailRegistered = AuthenticationService.isEmailRegistered(users, loginDto.Email);

        if (!isEmailRegistered) return NotFound();

        User user = _userRepository.GetByEmail(loginDto.Email);

        bool doesPasswordMatch = AuthenticationService.CheckPasswordMatch(user, loginDto.Password);

        if (!doesPasswordMatch) return StatusCode(403);

        var token =JwtAuth.GenerateToken(user);

        return Ok(new
        {
            Token = token,
            User= user,
        });
    }



}

