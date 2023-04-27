using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories.Interfaces;

namespace ImaPay_BackEnd.Repositories;

    public class AddressRepository:BaseRepository<Address>,IAddressRepository
    {

    public AddressRepository(BankContext bankContext) : base(bankContext) { }

    }

