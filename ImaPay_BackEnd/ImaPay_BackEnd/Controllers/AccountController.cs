using AutoMapper;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ImaPay_BackEnd.Controllers;

[ApiController]
[Route("/accounts")]

public class AccountController : ControllerBase
{
    private readonly IAccountRepository _accountRepository;
    private readonly IMapper _mapper;

    public AccountController(IAccountRepository accountRepository, IMapper mapper)
    {
        _mapper = mapper;
        _accountRepository = accountRepository;
    }

    [HttpGet]
    public IActionResult GetAllAccounts()
    {
        var accounts= _accountRepository.GetAllAccounts();
        return Ok(accounts);
    }

    [HttpPost]
    [Route("transfer")]
    public IActionResult Transfer([FromBody] TransactionDto transactionDto)
    {
        int senderAccNumber = transactionDto.SenderAccNumber;
        int receiverAccNumber = transactionDto.ReceiverAccNumber;

        Account receiver = _accountRepository.GetByAccountNumber(receiverAccNumber);
        Console.WriteLine(receiver);
        Account sender = _accountRepository.GetByAccountNumber(senderAccNumber);

        _accountRepository.Transfer(transactionDto.Amount, receiver, sender);


        return Ok("Success");



    }


}

