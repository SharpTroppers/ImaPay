namespace ImaPay_BackEnd.Domain.Model;

    public class Transaction
    {
    public string TransactionId { get; set; }
    public int Amount { get; set; }

    public DateTime Date { get; set; }

    public string TypeOfTransacation{ get; set; }

    public string Sender { get; set; }

    public string Receiver { get; set;}


    }
