using Microsoft.EntityFrameworkCore;
using PidsusAPI.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();

// Swagger aktif di semua environment (production juga bisa test)
builder.Services.AddSwaggerGen();

// Database - baca dari environment variable dulu, fallback ke appsettings
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// CORS - izinkan semua origin yang didaftarkan via env var
var allowedOrigins = (Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")
    ?? "http://localhost:5173,http://localhost:5174,http://localhost:5175")
    .Split(',', StringSplitOptions.RemoveEmptyEntries);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Migrasi + seed database otomatis saat startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        context.Database.Migrate(); // jalankan migration otomatis
        DbInitializer.Seed(context);
        Console.WriteLine("Database migration dan seed berhasil.");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error saat migrasi/seed database: " + ex.Message);
    }
}

// Swagger aktif di semua environment
app.UseSwagger();
app.UseSwaggerUI();

// Di production, Render pakai HTTP (bukan HTTPS redirect)
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();