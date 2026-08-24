using ConferenceApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ConferenceApi.Helpers;

namespace ConferenceApi
{
public class Program
{
public static void Main(string[] args)
{
var builder = WebApplication.CreateBuilder(args);

// Controller  
        builder.Services.AddControllers();  

        // SQL Server Database  
        builder.Services.AddDbContext<AppDbContext>(options =>  
            options.UseSqlServer(  
                builder.Configuration.GetConnectionString("DefaultConnection")  
            )  
        );

            // Swagger
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "JWT token giriniz."
                });

                options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
            });

            // CORS  
            builder.Services.AddCors(options =>  
        {  
            options.AddPolicy("AllowReactApp", policy =>  
            {  
                policy.WithOrigins(  
                    "http://localhost:3000",  
                    "http://localhost:5173"  
                )  
                .AllowAnyHeader()  
                .AllowAnyMethod();  
            });  
        });  

        // JWT Authentication  
        builder.Services.AddAuthentication(  
            JwtBearerDefaults.AuthenticationScheme  
        )  
        .AddJwtBearer(options =>  
        {  
            options.TokenValidationParameters = new TokenValidationParameters  
            {  
                ValidateIssuer = true,  
                ValidateAudience = true,  
                ValidateLifetime = true,  
                ValidateIssuerSigningKey = true,  

                ValidIssuer = builder.Configuration["Jwt:Issuer"],  
                ValidAudience = builder.Configuration["Jwt:Audience"],  

                IssuerSigningKey = new SymmetricSecurityKey(  
                    Encoding.UTF8.GetBytes(  
                        builder.Configuration["Jwt:Key"]  
                    )  
                )  
            };  
        });  

        // Token Service  
        builder.Services.AddScoped<TokenService>();  
       builder.Services.AddScoped<FileUploadService>();

        var app = builder.Build();  

        // Swagger  
        if (app.Environment.IsDevelopment())  
        {  
            app.UseSwagger();  
            app.UseSwaggerUI();  
        }  

        // CORS  
        app.UseCors("AllowReactApp");  

        app.UseHttpsRedirection(); 
            app.UseStaticFiles();

        // Authentication & Authorization  
        app.UseAuthentication();  
        app.UseAuthorization();  

        // Controllers  
        app.MapControllers();  

        app.Run();  
    }  
}

}
