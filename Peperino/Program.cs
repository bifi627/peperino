using Microsoft.EntityFrameworkCore;
using Peperino;
using Peperino.EntityFramework;

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
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    else
    {
        app.UseHttpsRedirection();
    }

    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<ApplicationDbContext>();
        await context.Database.MigrateAsync();
    }

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";

    var url = $"http://*:{port}";

    app.Run(url);
}
