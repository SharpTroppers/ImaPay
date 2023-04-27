using AutoMapper;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories.Interfaces;
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

    /// <summary>
    ///  Retorna todas as contas cadastradas no banco de dados, assim como o seu usuario correspondente
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAllAccounts()
    {
        var accounts = await _accountRepository.GetAll();
        return Ok(accounts);
    }
    /// <summary>
    ///  Transfere um valor entre contas, baseado no valor e numero da conta de destino informados
    /// </summary>
    [HttpPost]
    [Route("transfer")]
    public async Task<IActionResult> Transfer([FromBody] TransactionDto transactionDto)
    {
        int senderID = transactionDto.SenderID;
        int receiverAccNumber = transactionDto.ReceiverAccNumber;

        Account sender = await _accountRepository.GetById(senderID);

        //test
        bool isBalanceEnough = sender.Balance >= transactionDto.Amount

        if (!isBalanceEnough)
            return BadRequest();

     
        Account receiver = await _accountRepository.GetByAccountNumber(receiverAccNumber);


        await _accountRepository.Transfer(transactionDto.Amount, receiver, sender);


        return Ok("Success");

    }

    /// <summary>
    ///  Deposita um valor em conta baseada em seu id 
    /// </summary>
    [HttpPost]
    [Route("deposit")]

    public async Task<IActionResult> Deposit([FromBody] DepositDto depositDto)
    {
        Account account = await _accountRepository.GetById(depositDto.AccountId);

        await _accountRepository.Deposit(depositDto.Amount, account);

        return Ok("Success");
    }




}

