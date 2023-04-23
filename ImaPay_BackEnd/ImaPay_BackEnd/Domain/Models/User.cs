using System.ComponentModel.DataAnnotations;

namespace ImaPay_BackEnd.Domain.Model;

public class User : Entity
{
    [Required]
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Cpf { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime Birthday { get; set; }
    public string Password { get; set; }
    public virtual Account Account { get; set; }
    public virtual Address Address { get; set; }
}

