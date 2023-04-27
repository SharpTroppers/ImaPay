using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace ImaPay_BackEnd.Repositories;

public class AccountRepository : BaseRepository<Account>,IAccountRepository
{

    public AccountRepository(BankContext context) : base(context)
    {
    }

    public async Task<Account> GetByAccountNumber(int accountNumber)
    {
        return await _bankContext.Accounts.FindAsync(accountNumber);
    }

    //public bool CheckIfAccountExists(List<Account> accounts, int accountNumber)
    //{
    //    return accounts.Any((account) => account.AccountNumber == accountNumber);
    //}


    public async Task Transfer(double amount, Account receiver, Account sender)
    {

        receiver.Balance += amount;
        sender.Balance -= amount;

        Transaction transactionToSave = new Transaction
        {
            Amount = amount,
            Date = DateTime.Now,
            TypeOfTransacation = "Transferência",
            Sender = sender.User.UserName,
            Receiver = receiver.User.UserName,
            AccountId = sender.Id,
        };

        await _bankContext.Transactions.AddAsync(transactionToSave);
        await _bankContext.SaveChangesAsync();


    }


    public async Task Deposit(double amount, Account account)
    {
        Console.WriteLine(account);
        account.Balance += amount;
        await _bankContext.SaveChangesAsync();
    }



}
