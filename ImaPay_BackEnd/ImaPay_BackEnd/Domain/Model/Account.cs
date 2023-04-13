using System.ComponentModel.DataAnnotations.Schema;

namespace ImaPay_BackEnd.Domain.Model;

    public class Account:Entity
    {
    public int AccountName { get; set; }
    public long AccountNumber { get; private set; }

    public int Agency { get; set; }

    public double Balance { get;set; } = 0;

    public bool isBlocked { get; set; }

    public bool isLoggedIn { get; set; }

    public List<Transaction>? TransactionHistory{ get; set; }


    [ForeignKey("User")]
    public int UserId { get; set; }
    public virtual User User { get; set; }
}

