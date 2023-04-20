using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Services;

    public class AuthenticationService
    {
    public static bool isEmailRegistered(List<User> users, string email)
    {
        return users.Any(user =>user.Email.Equals(email));
    }

    public static bool CheckPasswordMatch(User user, string password)
    {
        return user.Password.Equals(password);
    }

    }

