using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Infrastructure.Persistence.Interceptors;

namespace Peperino.Core.EntityFramework
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCoreEntityFramework(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<AuditableEntitySaveChangesInterceptor>();
            services.AddScoped<OwnableEntityCreatedInterceptor>();

            //services.AddMediatR(Assembly.GetExecutingAssembly());
            //services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
