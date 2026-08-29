using ConferenceApi.Data;
using Microsoft.EntityFrameworkCore;
using ConferenceApi.Services;
using ConferenceApi.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAdminPanel", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddScoped<IConferenceService, ConferenceService>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IImportantDateService, ImportantDateService>();
builder.Services.AddScoped<ISpeakerService, SpeakerService>();
builder.Services.AddScoped<ISubmissionService, SubmissionService>();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ConferenceDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAdminPanel");
app.UseAuthorization();
app.MapControllers();

app.Run();