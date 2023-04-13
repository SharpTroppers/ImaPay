using System.ComponentModel.DataAnnotations.Schema;

namespace ImaPay_BackEnd.Domain.Model;

    public class Address:Entity
    {
     public string? City { get; set; }
    public string? Neighborhood { get; set; }
    public string? Street { get; set; }

    public string? State { get; set; }

    public int HouseNumber { get; set; }
    public string? PostalCode { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public virtual User User { get; set; }
   
    }
