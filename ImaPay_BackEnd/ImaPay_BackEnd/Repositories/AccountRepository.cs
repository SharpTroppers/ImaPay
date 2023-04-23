using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Model;
using Microsoft.EntityFrameworkCore;
namespace ImaPay_BackEnd.Repositories;

public class AccountRepository : IAccountRepository
{
    private readonly BankContext _bank;

    public AccountRepository(BankContext context)
    {
        _bank = context;
    }

    public List<Account> GetAll()
    {
        return _bank.Accounts.ToList();
    }
   
    public bool CheckIfAccountExists(List<Account> accounts, string accountNumber)
    {
        return accounts.Any(account => account.AccountNumber.Equals(accountNumber));
    }

}

