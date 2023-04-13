namespace ImaPay_BackEnd.Domain.Model;

    public class Address
    {
     public string? City { get; set; }
    public string? Neighborhood { get; set; }
    public string? Street { get; set; }

    public string? State { get; set; }

    public int HouseNumber { get; set; }
    public string? PostalCode { get; set; }
   
    }
