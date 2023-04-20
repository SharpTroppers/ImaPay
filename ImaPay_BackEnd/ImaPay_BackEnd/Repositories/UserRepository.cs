using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Repositories;

public class UserRepository : IRepository
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

    public User GetByEmail(string email)
    {
        return GetAll().Find(user => user.Email.Equals(email));
    }

}

