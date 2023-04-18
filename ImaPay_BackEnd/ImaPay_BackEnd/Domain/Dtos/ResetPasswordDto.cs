namespace ImaPay_BackEnd.Domain.Dtos
{
    public class ResetPasswordDto
    {
        public string NewPassword { get; set; }

        public string newPasswordConfirm { get; set; }
    }
}
