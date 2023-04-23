namespace ImaPay_BackEnd.Services
{
    public class PasswordVerificationService
    {
        public bool CheckPassword(string hashedPassword, string dbHashedPassword)
        {
            bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(hashedPassword, dbHashedPassword);
            return isPasswordCorrect;
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
