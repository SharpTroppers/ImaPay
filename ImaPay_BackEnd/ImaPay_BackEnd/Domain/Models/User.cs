using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ImaPay_BackEnd.Domain.Model;

[Index(nameof(Email), IsUnique = true)]
[Index(nameof(Cpf), IsUnique = true)]
[Index(nameof(PhoneNumber), IsUnique = true)]
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

