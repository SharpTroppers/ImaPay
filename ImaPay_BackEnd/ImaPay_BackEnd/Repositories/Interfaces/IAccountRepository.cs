using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Repositories.Interfaces;

public interface IAccountRepository:IRepository<Account>
{
    Task<Account> GetByAccountNumber(int accountNumber);
    Task Transfer(double amount, Account receiver, Account sender);

    Task Deposit(double amount, Account account);
}

