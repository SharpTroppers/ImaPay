namespace ImaPay_BackEnd.Services
{
    public class PasswordVerificationService
    {
        public static bool CheckPassword(string hashedPassword, string dbHashedPassword)
        {
            //bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(hashedPassword, dbHashedPassword);

            return hashedPassword.Equals(dbHashedPassword);
        }

        public static string HashPassword(string password)
        {
            Console.WriteLine("asdas "+ password);
            var salt = BCrypt.Net.BCrypt.GenerateSalt(16);
            return BCrypt.Net.BCrypt.HashPassword(password, salt);
        }
    }
}
