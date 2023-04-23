using Microsoft.AspNetCore.Authentication;

namespace ImaPay_BackEnd.Domain.Dtos;

public class UserAccountDto

{
    public long AccountNumber { get; private set; }
    public int Agency { get; set; }
  

}
