using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using DocsBr;
using Microsoft.AspNetCore.Components.Forms;
using NodaTime;
using ImaPay_BackEnd.Domain.Dtos;
using ImaPay_BackEnd.Domain.Models;
using ImaPay_BackEnd.Migrations;

namespace ImaPay_BackEnd.Controllers
{
    public class FormValidatorController : Controller
    {
        List<String> Results = new List<String>();

        public List<String> ValidateSignupForm(SignupDto formData)
        {
            // User Data
            ValidateName(formData.UserName);
            ValidateEmail(formData.Email);
            ValidateCpf(formData.Cpf);
            ValidateBirthday(formData.Birthday);
            // Address
            ValidatePostalCode(formData.PostalCode);
            ValidateCommonText(formData.BaseAddress, "baseAddress");
            ValidateAddressNumber(formData.BaseAddressNumber);
            ValidateCommonText(formData.Neighborhood, "neighborhood");
            ValidateCommonText(formData.CityName, "cityName");
            ValidateCommonText(formData.StateName, "StateName");
            Console.WriteLine("Total de erros: " + Results.Count);
            return Results;
        }

        public void ValidateName(String value)
        {
            Regex regex = new Regex(@"^[A-Za-zÀ-ÖØ-öø-ſ\-'. ]+$");

            if(!regex.IsMatch(value)) Results.Add("nameError");
        }

        public void ValidateEmail(String value) 
        {
            Regex regex = new Regex(@"^[a - zA - Z0 - 9] +@[a-zA - Z0 - 9]+\.[a-zA - Z]{");
            if(!regex.IsMatch(value)) Results.Add("emailError");
        }

        public void ValidateCpf(String value)
        {
            var cpfValidator = new CPF(value);
            if(cpfValidator.IsValid()) Results.Add("cpfError");
        }

        public void ValidatePhoneNumber(String value)
        {
            Regex regex = new Regex(@"^[A-Za-zÀ-ÖØ-öø-ſ\-'. ]+$");
            if(regex.IsMatch(value)) Results.Add("phoneNumberError");
        }

        public void ValidateBirthday(DateTime value)
        {
            try
            {
                DateTime today = DateTime.Today;
                int userAge = today.Year - value.Year;
                if(userAge < 18) Results.Add("birthdayError");
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Results.Add("birthdayError");
            }
        }

        public void ValidateAddressNumber(String value)
        {
            Regex regex = new Regex(@"^[^0-9A-Za-zÀ-ÖØ-öø-ſ]+$");
            if (!regex.IsMatch(value)) Results.Add("addressNumberError"); ;
        }

        public void ValidatePostalCode(String value)
        {
            Regex regex = new Regex(@"^\d+$");
            if (!regex.IsMatch(value) && value.Length == 8) Results.Add("postalCodeError"); ;
        }

        public void ValidateCommonText(String value, String baseNameError)
        {
            Regex regex = new Regex(@"^[A-Za-zÀ-ÖØ-öø-ſ\\-'. ]+$");
            if(!regex.IsMatch(value)) Results.Add($"{baseNameError}Error"); ;
        }

        public void ValidateOnlyNumbers(String value, String baseNameError)
        {
            Regex regex = new Regex(@"^\d+$");
            if (!regex.IsMatch(value)) Results.Add($"{baseNameError}Error"); ;
        }
    }
}
