namespace ImaPay_BackEnd.Domain;

using ImaPay_BackEnd.Domain.Model;
using Microsoft.EntityFrameworkCore;

    public class BankContext:DbContext
    {

    public DbSet<User> Users { get; set; }

    public DbSet<Account> Accounts { get; set; }

    public DbSet<Address> Addresses { get; set; }

    public DbSet<Transaction> Transactions { get; set; }

    public BankContext(DbContextOptions options):base(options) {
    }

    }

