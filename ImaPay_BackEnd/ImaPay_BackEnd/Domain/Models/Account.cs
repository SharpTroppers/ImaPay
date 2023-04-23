using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ImaPay_BackEnd.Domain.Model;

public class Account : Entity
{

    public long AccountNumber { get; set; }

    public string UserName { get; set; }
    
    public string Agency { get; set; }

    public double Balance { get; set; } = 0;

    public bool isBlocked { get; set; }

    public virtual ICollection<Transaction> TransactionHistory { get; set; }


    [ForeignKey("User")]
    public int UserId { get; set; }
    public virtual User User { get; set; }
}

