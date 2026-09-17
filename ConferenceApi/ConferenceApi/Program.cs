using System.Text;
using ConferenceApi.Data;
using ConferenceApi.Helpers;
using ConferenceApi.Middleware;
using ConferenceApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ---------------------------------------------------------------
// LOGGING
// ---------------------------------------------------------------
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// ---------------------------------------------------------------
// CORS - frontend ve admin panelin API'yi cagirabilmesi icin
// ---------------------------------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAdminPanel", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// ---------------------------------------------------------------
// SWAGGER - ustteki "Authorize" butonu ile token girebilmek icin
// ---------------------------------------------------------------
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Conference API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Sadece token'i yapistir (basina 'Bearer' yazmana gerek yok)."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

// ---------------------------------------------------------------
// SERVISLER (Dependency Injection)
// Scoped = her HTTP istegi icin bir tane uretilir, istek bitince atilir.
// ---------------------------------------------------------------
builder.Services.AddScoped<IConferenceService, ConferenceService>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IImportantDateService, ImportantDateService>();
builder.Services.AddScoped<ISpeakerService, SpeakerService>();
builder.Services.AddScoped<ISubmissionService, SubmissionService>();
builder.Services.AddScoped<IParticipantService, ParticipantService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IContactMessageService, ContactMessageService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<TokenService>();

// ---------------------------------------------------------------
// VERITABANI
// ---------------------------------------------------------------
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ConferenceDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// ---------------------------------------------------------------
// JWT DOGRULAMA
// Gelen istekteki Authorization basligindaki token'i acar,
// imzasini ve suresini kontrol eder, gecerliyse User'i doldurur.
// ---------------------------------------------------------------
var jwtKey = builder.Configuration["Jwt:Key"]
             ?? throw new InvalidOperationException("appsettings.json icinde Jwt:Key tanimli degil.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// ---------------------------------------------------------------
// PIPELINE - sira onemli
// ---------------------------------------------------------------
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// wwwroot altindaki yuklenen dosyalar (bildiriler, kitaplar) indirilebilsin
app.UseStaticFiles();

app.UseCors("AllowAdminPanel");

app.UseAuthentication();   // once kimsin?
app.UseAuthorization();    // sonra yetkin var mi?

app.MapControllers();

app.Run();
