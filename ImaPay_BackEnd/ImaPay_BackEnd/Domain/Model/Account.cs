namespace ImaPay_BackEnd.Domain.Model;

    public class Account
    {
    public int AccountName { get; set; }
    public long AccountNumber { get; private set; }

    public int Agency { get; set; }

    public double Balance { get;set; } = 0;

    public bool isBlocked { get; set; }

    public bool isLoggedIn { get; set; }

    public List<Transaction>? TransactionHistory{ get; set; }
    }

