using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Repositories;

    public interface IRepository
    {
    public List<User> GetAll();
    public User GetById(int id);

    public User GetByEmail(string email);
    }

