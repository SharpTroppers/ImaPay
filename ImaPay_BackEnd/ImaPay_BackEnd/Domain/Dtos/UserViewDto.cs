using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Domain.Dtos;

    public class UserViewDto
    {
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Cpf { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public DateTime Birthday { get; set; }

    public  Account Account { get; set; } = null!;

    public Address Address { get; set; } = null!;

}

