using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
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


    public List<Account> GetAllAccounts()
    {

        return _bank.Accounts.ToList();

    }

    public Account GetByAccountNumber(int accountNumber) 
    {
      return GetAllAccounts().Find(account => account.AccountNumber == accountNumber);
    }

    public bool CheckIfAccountExists(List<Account> accounts, int accountNumber)
    {
        return accounts.Any((account) => account.AccountNumber == accountNumber);
    }

    public Account GetAccountById(int id) {
        return GetAllAccounts().Find(acc => acc.Id == id);
    
    }

    public void Transfer(double amount, Account receiver, Account sender)
    {

        receiver.Balance += amount;
        sender.Balance -=amount;
        _bank.SaveChanges();

        Transaction transactionToSave = new Transaction
        {
            Amount = amount,
            Date = DateTime.Now,
            TypeOfTransacation = "Transferência",
            Sender = sender.User.UserName,
            Receiver = receiver.User.UserName,
            AccountId = sender.Id,
        };
        _bank.Transactions.Add(transactionToSave);
        _bank.SaveChanges();

    }


    public void Deposit(double amount, Account account)
    {
        account.Balance += amount;
        _bank.SaveChanges();
    }



}
