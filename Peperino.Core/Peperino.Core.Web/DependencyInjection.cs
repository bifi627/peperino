using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Core.EntityFramework.Interceptors;

namespace Peperino.Core.Web
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCorePeperino(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<AuditableEntitySaveChangesInterceptor>();
            services.AddScoped<OwnableEntityCreatedInterceptor>();

            services.AddScoped<BaseEntityEventInterceptor<BaseEntity>>();

            return services;
        }
    }
}
