using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Core.EntityFramework;

namespace Peperino.EntityFramework
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddEntityFramework(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Postgres");

            services.AddDbContext<ApplicationDbContext>(contextOptions =>
            {
                contextOptions.UseNpgsql(connectionString, postgresOptions =>
                {
                    postgresOptions.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName);
                });
            });

            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            services.AddScoped<ICoreDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

            return services;
        }
    }
}
