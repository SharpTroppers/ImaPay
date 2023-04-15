using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ImaPay_BackEnd.Domain.Model;

public class Transaction : Entity
{
    
    public int Amount { get; set; }

    public DateTime Date { get; set; }

    public string TypeOfTransacation { get; set; }

    public string Sender { get; set; }

    public string Receiver { get; set; }

    public virtual Account Account { get; set; }
    [ForeignKey("Account")]
    public int AccountId { get; set; }


}
