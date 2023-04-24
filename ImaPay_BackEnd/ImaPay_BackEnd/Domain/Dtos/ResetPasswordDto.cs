namespace ImaPay_BackEnd.Domain.Dtos
{
    public class ResetPasswordDto
    {
        public string Cpf { get; set; }
        public string NewPassword { get; set; }

        public string PasswordConfirm { get; set; }
    }
}
