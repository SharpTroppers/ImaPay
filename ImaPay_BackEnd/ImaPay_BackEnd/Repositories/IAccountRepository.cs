using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Repositories;

    public interface IAccountRepository
    {
    public List<Account> GetAllAccounts();

    public Account GetByAccountNumber(int accountNumber);

    public void Transfer(double amount, Account receiver, Account sender);

    public bool CheckIfAccountExists(List<Account> accounts, int accountNumber);
    }

