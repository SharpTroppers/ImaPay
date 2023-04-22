using AutoMapper;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Domain.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
<<<<<<< HEAD
            
            CreateMap<User, UserProfileDto>();
            CreateMap<Account, UserAccountDto>();


=======
            CreateMap<LoginDto, User>();
            CreateMap<User, LoginDto>();
>>>>>>> f401d69c85ab11ae609717f4dc942b233ab0bcdc

        }
    }
}
