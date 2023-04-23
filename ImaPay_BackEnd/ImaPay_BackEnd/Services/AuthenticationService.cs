using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using BC = BCrypt.Net.BCrypt;


namespace ImaPay_BackEnd.Services;

    public static class AuthenticationService
    {
    public static bool isCpfRegistered(List<User> users, string cpf)
    {
        return users.Any(user =>user.Cpf.Equals(cpf));
    }
    public static bool isEmailRegistered(List<User> users, string email)
    {
        return users.Any(user => user.Email.Equals(email));
    }

    public static string HashPassword(string password) {

        return BC.HashPassword(password);
    }


    public static bool CheckPasswordMatch(User user, string hash)
    {
        return BC.Verify(user.Password, hash);
    }

    public static bool PasswordResetMatch(ResetPasswordDto passwordDto)
    {
        return passwordDto.NewPassword.Equals(passwordDto.PasswordConfirm);
    }

    }

