using System;
using ImaPay_BackEnd.Domain.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ImaPay_BackEnd.Config;

namespace ImaPay_BackEnd.Helpers;

public static class JwtAuth
{
    public static string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        //chave secreta, geralmente se coloca em arquivo de configuração
        var key = Encoding.ASCII.GetBytes(Constants.JWT_SECRET_KEY);

        var claims = new List<Claim> {
      new Claim("Id", user.Id.ToString()),
      new Claim("UserName", user.UserName),
      new Claim("AccountId",user.Account.Id.ToString()),
                };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),

            Expires = DateTime.UtcNow.AddHours(10),

            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    //private static string RoleFactory(int roleNumber)
    //{
    //    switch (roleNumber)
    //    {
    //        case 1:
    //            return "Director";

    //        case 2:
    //            return "Manager";

    //        case 3:
    //            return "Colaborator";


    //        default:
    //            throw new Exception();
    //    }
    //}
}

