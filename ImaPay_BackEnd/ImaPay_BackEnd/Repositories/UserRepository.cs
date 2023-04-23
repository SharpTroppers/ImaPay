using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace ImaPay_BackEnd.Repositories;

public class UserRepository : IUserRepository
{
    private readonly BankContext _bank;

    public UserRepository(BankContext context)
    {
        _bank = context;
    }

    public List<User> GetAll()
    {
        return _bank.Users.ToList();
    }
    public User GetById(int id)
    {
        return GetAll().Find(user => user.Id == id);
    }

    public User GetByCpf(string cpf)
    {
        return GetAll().Find(user => user.Cpf.Equals(cpf));
    }

    public bool IsCpfRegistered(List<User> users, string cpf)
    {
        return users.Any(user => user.Cpf.Equals(cpf));
    }
    public bool IsEmailRegistered(List<User> users, string email)
    {
        return users.Any(user => user.Email.Equals(email));
    }

}

