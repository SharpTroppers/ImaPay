﻿namespace ImaPay_BackEnd.Domain.Model;

    public class User
    {
    int Id { get; set; }  
    public string Name { get; set; }=null!;
    public string Email { get; set; }=null!;
    public string Password { get; set; }=null!;
    public string Cpf{ get; set; }=null!;

    public  Address Address{ get; set; }=null!;

    }

