using AutoMapper;
using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Helpers;
using ImaPay_BackEnd.Repositories;
using ImaPay_BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

using Microsoft.Win32;

using System.Net;

namespace ImaPay_BackEnd.Controllers;

[ApiController]
[Route("/users")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private  readonly BankContext _context;

    public UserController(IUserRepository userRepository, IMapper mapper, BankContext context)
    {
        _context = context;
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

        bool isCpfRegistered = AuthenticationService.isCpfRegistered(users, loginDto.Cpf);

        if (!isCpfRegistered) return StatusCode(statusCode: (int)HttpStatusCode.NotFound,
                value: new
                {
                    Message = $"O Cpf {loginDto.Cpf} nao esta cadastrado em nosso sistema",
                    Moment = DateTime.Now
                }); ;

        User user = _userRepository.GetByCpf(loginDto.Cpf);

        bool doesPasswordMatch = AuthenticationService.CheckPasswordMatch(user, loginDto.Password);

        if (!doesPasswordMatch) return StatusCode(403);

        string token =JwtAuth.GenerateToken(user);

        return Ok(new
        {
            Token= token,
        });
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == id);

        var teste = _context.Accounts.FirstOrDefault(u => u.UserId == id);

        if (user == null) return NotFound(new
        {
            Moment = DateTime.Now,
            Message = $"TCannor find user with id= {id}"
        });

        var userProfile = _mapper.Map<UserProfileDto>(user);
        var conta = _mapper.Map<UserAccountDto>(teste);

        var UserProfileWithAccountDto = new UserProfileWithAccountDto
        {
            UserProfile = userProfile,
            Account = conta
        };

        return Ok(UserProfileWithAccountDto);
    }


}

