using ImaPay_BackEnd.Config;
using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Proxies;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("TroopersConnection");

// //DataBase - Production String
// var mySqlUrl = Environment.GetEnvironmentVariable("MYSQL_URL");
// var mySqlDatabase = Environment.GetEnvironmentVariable("MYSQLDATABASE");
// var mySqlHost = Environment.GetEnvironmentVariable("MYSQLHOST");
// var mySqlPassword = Environment.GetEnvironmentVariable("MYSQLPASSWORD");
// var mySqlPort = Environment.GetEnvironmentVariable("MYSQLPORT");
// var mySqlUser = Environment.GetEnvironmentVariable("MYSQLUSER");

// // Construir a string de conexão
// var connectionString = $"Server={mySqlHost};Port={mySqlPort};Database={mySqlDatabase};User Id={mySqlUser};Password={mySqlPassword};";

builder.Services.AddDbContext<BankContext>(options =>
options
.UseLazyLoadingProxies()
.UseMySql(
    connectionString: connectionString,
        serverVersion: ServerVersion.AutoDetect(connectionString))

);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();


builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
});


var jwtSecretKey = Constants.JWT_SECRET_KEY;

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecretKey)),
        ValidateIssuer = false,
        ValidateAudience = false,


    };

});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("ImaPay_api",
        new Microsoft.OpenApi.Models.OpenApiInfo()
        {
            Title = "ImaPay_API",
            Version = "1.0"
        }
        );

    var xmlCommentsFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlCommentsFullPath = Path.Combine(AppContext.BaseDirectory, xmlCommentsFile);
    options.IncludeXmlComments(xmlCommentsFullPath);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});


var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        context.Response.Headers.Add("Access-Control-Allow-Headers", "*");
        context.Response.Headers.Add("Access-Control-Allow-Methods", "*");
        context.Response.StatusCode = 200;
    }
    else
    {
        await next();
    }

});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/ImaPay_api/swagger.json", "imapayapi");
        options.RoutePrefix = "";
    });
}


app.UseCors("AllowAnyOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;
//     var context = services.GetRequiredService<BankContext>();
//     context.Database.Migrate();

// }

app.Run();
