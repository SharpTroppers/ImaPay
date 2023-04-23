using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Services;

    public class AuthenticationService
    {
        public static bool CheckPasswordMatch(User user, string password)
        {
            return user.Password.Equals(password);
        }
    }

