using Microsoft.EntityFrameworkCore;
using Peperino;
using Peperino.EntityFramework;
using Peperino.Infrastructure.Options;

var builder = WebApplication.CreateBuilder(args);
{
    //builder.Configuration.AddEnvironmentVariables();

    builder.Services.AddHttpContextAccessor();

    // Add services to the container.
    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddServices(builder.Configuration);

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("DEV", policy =>
        {
            policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
        });

        options.AddPolicy("PROD", policy =>
        {
            var corsSettings = builder.Configuration.GetSection(CorsSettings.SECTION_NAME).Get<CorsSettings>();
            policy.WithOrigins(corsSettings.FrontendUrl).WithMethods("POST", "PUT", "GET", "DELETE").AllowAnyHeader();
        });
    });
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseCors("DEV");
    }
    else
    {
        app.UseHttpsRedirection();

        app.UseCors("PROD");
    }

    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<ApplicationDbContext>();
        await context.Database.MigrateAsync();
    }

    app.UseMiddleware<Peperino.Middleware.ExceptionHandlerMiddleware>();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseMiddleware<Peperino.Middleware.InitialConnectionMiddleware>();

    app.MapControllers();

    var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";

    var url = $"http://*:{port}";

    app.Run(url);
}
