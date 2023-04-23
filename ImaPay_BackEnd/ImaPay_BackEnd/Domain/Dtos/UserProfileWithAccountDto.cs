namespace ImaPay_BackEnd.Domain.Dtos;

public class UserProfileWithAccountDto
{
    public UserProfileDto UserProfile { get; set; }
    public UserAccountDto Account { get; set; }
}
