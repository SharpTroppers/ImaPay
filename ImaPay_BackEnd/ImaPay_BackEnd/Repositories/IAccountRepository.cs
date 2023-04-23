using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Repositories
{
    public interface IAccountRepository
    {
        public List<Account> GetAll();
        public bool CheckIfAccountExists(List<Account> accounts, string accountNumber);
    }
}
