using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Repositories;

    public interface IUserRepository
    {
    public List<User> GetAll();
    public User GetById(int id);

    public User GetByCpf(string email);
    }

