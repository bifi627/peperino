using Mapster;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Peperino;
using Peperino.Application.CheckList;
using Peperino.Core.Web;
using Peperino.Dtos.CheckList;
using Peperino.EntityFramework;
using Peperino.Filters;
using Peperino.Infrastructure.Options;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddHttpContextAccessor();

    // Add services to the container.
    builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

    builder.Services.AddSignalR();

    TypeAdapterConfig.GlobalSettings.Default.PreserveReference(true);
    TypeAdapterConfig.GlobalSettings.AllowImplicitDestinationInheritance = true;
    TypeAdapterConfig.GlobalSettings.AllowImplicitSourceInheritance = true;
    TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.DocumentFilter<PolymorphismDocumentFilter<BaseCheckListItemOutDto>>();
        options.SchemaFilter<PolymorphismSchemaFilter<BaseCheckListItemOutDto>>();
    });

    builder.Services.AddServices(builder.Configuration);

    var corsSettings = builder.Configuration.GetSection(CorsSettings.SECTION_NAME).Get<CorsSettings>();
    var frontendUrls = JsonConvert.DeserializeObject<string[]>(corsSettings.FrontendUrlsJson) ?? Array.Empty<string>();

    foreach (var url in frontendUrls)
    {
        Console.WriteLine(url);
    }

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("DEV", policy =>
        {
            policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
        });

        options.AddPolicy("PROD", policy =>
        {
            policy.WithOrigins(frontendUrls).WithMethods("POST", "PUT", "GET", "DELETE").AllowAnyHeader();
        });
    });
}

var app = builder.Build();
{
    app.UseWebSockets();
    app.MapHub<CheckListHub>("/signalr/checkListHub");

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

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseCorePeperino();

    app.MapControllers();

    var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";

    var url = $"http://*:{port}";

    app.Run(url);
}
