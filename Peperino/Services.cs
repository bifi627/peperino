using Peperino.Application;
using Peperino.EntityFramework;
using Peperino.Infrastructure;

namespace Peperino
{
    public static class Services
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddEntityFramework(configuration);
            services.AddInfrastructure(configuration);

            services.AddApplication();

            return services;
        }
    }
}
