using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ImaPay_BackEnd.Domain.Model;

public class Address : Entity
{
    public string PostalCode { get; set; }
    public string BaseAddress { get; set; }
    public string BaseAddressNumber { get; set; } = "S/N";
    public string Neighborhood { get; set; }
    public string CityName { get; set; }
    public string StateName { get; set; }


    [ForeignKey("User")]
    public int UserId { get; set; }
    public virtual User User { get; set; }

}
