namespace ImaPay_BackEnd.Domain.Dtos
{
    public class SignupDto
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string Cpf { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime Birthday { get; set; }

        public string PostalCode { get; set; }

        public string BaseAddress { get; set; }

        public string BaseAddressNumber { get; set; }

        public string Neighborhood { get; set; }

        public string CityName { get; set; }

        public string StateName { get; set; }

        public string Password { get; set; }
    }
}
