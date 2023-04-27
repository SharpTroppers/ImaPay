using AutoMapper;
using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Helpers;
using ImaPay_BackEnd.Repositories.Interfaces;
using ImaPay_BackEnd.Services;
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

    public UserController(IUserRepository userRepository, IMapper mapper)
    {
        _mapper = mapper;
        _userRepository = userRepository;
    }

    /// <summary>
    /// Retorna todos usuários cadastrados no banco de dados
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userRepository.GetAll();

        return Ok(users);
    }

    /// <summary>
    /// Envia um email para  serviço mailTrap com o link para redefinir a senha do usuario
    /// </summary>
    /// <returns></returns>

    [HttpPost]
    [Route("recovery")]
    public async Task<IActionResult> SendRecoveryEmail([FromBody] UserEmailDto userEmailDto)
    {

        User user = await _userRepository.GetByEmail(userEmailDto.Email);

        if (user == null)
            return StatusCode(statusCode: (int)HttpStatusCode.NotFound,
                value: new
                {
                    Message = $"O email {userEmailDto.Email} nao esta cadastrado em nosso sistema",
                    Moment = DateTime.Now
                });

        EmailService.SendEmail(EmailContent.emailSubject, EmailContent.htmlMarkup);


        return Ok(userEmailDto.Email);
    }

    /// <summary>
    /// Redefine a senha do usuario
    /// </summary>
    /// <returns></returns>


    [HttpPost]
    [Route("reset-password")]
    public async Task<IActionResult> CreateNewPassword([FromBody] ResetPasswordDto resetPasswordDto)
    {
        if (!AuthenticationService.PasswordResetMatch(resetPasswordDto))
            return StatusCode(400);

        User user = await _userRepository.GetByCpf(resetPasswordDto.Cpf);

        await _userRepository.ChangePassword(user, resetPasswordDto.NewPassword);
        return Ok("Success");
    }

    /// <summary>
    /// Faz o login do usuario
    /// </summary>
    /// <returns></returns>

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        User user = await _userRepository.GetByCpf(loginDto.Cpf);

        if (user == null) return StatusCode(statusCode: (int)HttpStatusCode.NotFound,
                value: new
                {
                    Message = $"O Cpf {loginDto.Cpf} nao esta cadastrado em nosso sistema",
                    Moment = DateTime.Now
                }); ;


        //string passwordHash = PasswordVerificationService.HashPassword(loginDto.Password);

        bool doesPasswordMatch = PasswordVerificationService.CheckPassword(user.Password, loginDto.Password);

        if (!doesPasswordMatch) return StatusCode(403);

        string token = JwtAuth.GenerateToken(user);

        return Ok(new
        {
            Token = token,
        });
    }

    /// <summary>
    /// Pega as informações do usuario baseado em seu id
    /// </summary>
    /// <returns></returns>

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetAccountData(int id)
    {
        var user = await _userRepository.GetById(id);


        if (user == null) return NotFound(new
        {
            Moment = DateTime.Now,
            Message = $"Cannot find user with id= {id}"
        });

        var userProfile = _mapper.Map<UserProfileDto>(user);
        var conta = _mapper.Map<UserAccountDto>(user.Account);

        var UserProfileWithAccountDto = new UserProfileWithAccountDto
        {
            UserProfile = userProfile,
            Account = conta
        };

        return Ok(UserProfileWithAccountDto);
    }

    /// <summary>
    ///  Deleta uma conta baseada em seu id
    /// </summary>

    [HttpDelete]
    [Route("{id}")]

    public async Task<IActionResult> DeleteUser(int id)
    {
        await _userRepository.Delete(id);

        return Ok("Success");
    }


}

