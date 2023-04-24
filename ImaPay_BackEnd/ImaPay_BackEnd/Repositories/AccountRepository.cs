using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Repositories;

public class AccountRepository : IAccountRepository
{

    private readonly BankContext _bank;

    public AccountRepository(BankContext context)
    {
        _bank = context;
    }


    public List<Account> GetAllAccounts()
    {

        return _bank.Accounts.ToList();

    }

    public Account GetByAccountNumber(int accountNumber) 
    {
      return GetAllAccounts().Find(account => account.AccountNumber == accountNumber);
    }

    public void Transfer(double amount, Account receiver, Account sender)
    {

        receiver.Balance += amount;
        sender.Balance -=amount;
        _bank.SaveChanges();

    }



}
