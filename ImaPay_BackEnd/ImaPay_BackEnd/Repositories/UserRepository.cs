using DocsBr;
using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ImaPay_BackEnd.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(BankContext context) : base(context)
    {

    }

    public async Task ChangePassword(User user, string newPassword)
    {

        user.Password = newPassword;
        await _bankContext.SaveChangesAsync();
    }

    public async Task<User> GetByCpf(string cpf)
    {
        return await _bankContext.Users.FirstAsync(user => user.Cpf.Equals(cpf)) ;

    }

    public async Task<User> GetByEmail(string email)
    {
        return await _bankContext.Users.FirstAsync(user => user.Email.Equals(email));
        
    }

    public async Task<bool> IsCpfRegistered(string cpf)
    {
        return await _bankContext.Users.AnyAsync(user => user.Cpf.Equals(cpf));
    }
    public async Task<bool> IsEmailRegistered(string email)
    {
        return await _bankContext.Users.AnyAsync(user => user.Email.Equals(email));
    }


}

