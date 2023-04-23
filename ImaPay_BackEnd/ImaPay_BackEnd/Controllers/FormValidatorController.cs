using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using DocsBr;
using ImaPay_BackEnd.Domain.Dtos;

namespace ImaPay_BackEnd.Controllers
{
    public class FormValidatorController : Controller
    {
        private List<string> Results = new List<string>();

        public List<string> ValidateSignupForm(SignupDto formData)
        {
            try
            {
                // User Data
                ValidateCommonText(formData.UserName, "userName");
                ValidateEmail(formData.Email);
                ValidateCpf(formData.Cpf);
                ValidateBirthday(formData.Birthday);
                ValidatePhoneNumber(formData.PhoneNumber);
                // Address Data
                ValidatePostalCode(formData.PostalCode);
                ValidateCommonText(formData.BaseAddress, "baseAddress");
                ValidateAddressNumber(formData.BaseAddressNumber);
                ValidateCommonText(formData.Neighborhood, "neighborhood");
                ValidateCommonText(formData.CityName, "cityName");
                ValidateCommonText(formData.StateName, "stateName");
            }
            catch (Exception ex) {
                throw ex;
            }
            return Results;
        }

        private void ValidateEmail(string value) 
        {
            Regex regex = new Regex(@"^(?!.*@.*@)[^@]*$");
            if (!regex.IsMatch(value)) Results.Add("emailError");
        }

        private void ValidateCpf(string value)
        {
            var cpfValidator = new CPF(value);
            if (!cpfValidator.IsValid()) Results.Add("cpfError");
        }

        private void ValidatePhoneNumber(string value)
        {
            Regex regex = new Regex(@"\D+$");
            if (value.Length == 11) ValidateOnlyNumbers(value, "phoneNumber");
        }

        private void ValidateBirthday(DateTime value)
        {
                DateTime today = DateTime.Today;
                int userAge = today.Year - value.Year;
                if (userAge < 18) Results.Add("birthdayError");
        }

        private void ValidateAddressNumber(string value)
        {
            Regex regex = new Regex(@"^[a-zA-ZÀ-ÿ0-9\s]*[^a-zA-ZÀ-ÿ0-9\s-][a-zA-ZÀ-ÿ0-9\s]*");
            if (regex.IsMatch(value)) Results.Add("addressNumberError");
        }

        private void ValidatePostalCode(string value)
        {
            Regex regex = new Regex(@"^\d+$");
            if (!regex.IsMatch(value) && value.Length == 8) Results.Add("postalCodeError");
        }

        private void ValidateCommonText(string value, string baseNameError)
        {
            Regex regex = new Regex(@"[^A-Za-zÀ-ÖØ-öø-ſ\-'. ]");
            if (regex.IsMatch(value)) Results.Add($"{baseNameError}Error");
        }

        private void ValidateOnlyNumbers(string value, string baseNameError)
        {
            Regex regex = new Regex(@"\d$");
            if (regex.IsMatch(value)) Results.Add($"{baseNameError}Error");
        }
    }
}
