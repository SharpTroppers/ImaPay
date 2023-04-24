using ImaPay_BackEnd.Config;
using System.Net;
using System.Net.Mail;




namespace ImaPay_BackEnd.Services;

    public class EmailService
    {
    public static void SendEmail(string emailSubject, string emailBody)
    {
        var client = new SmtpClient(Constants.MAILTRAP_SMTP_HOST,Constants.MAILTRAP_PORT)
        {
            Credentials = new NetworkCredential(Constants.MAILTRAP_USERNAME,Constants.MAILTRAP_PASSWORD),
            EnableSsl = true

        };

        var message = new MailMessage
        {
            From = new MailAddress(Constants.TROOPERS_EMAIL),
            Subject = emailSubject,
            Body = emailBody
        };

        message.To.Add(new MailAddress(Constants.MAILTRAP_EMAIL));
        message.IsBodyHtml= true;
        client.Send(message);

    }
    }

