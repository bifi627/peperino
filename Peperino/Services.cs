using Peperino.Application;
using Peperino.Core.EntityFramework;
using Peperino.Core.Web;
using Peperino.EntityFramework;
using Peperino.Infrastructure;

namespace Peperino
{
    public static class Services
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCoreEntityFramework(configuration);
            services.AddCorePeperino(configuration);

            services.AddEntityFramework(configuration);

            services.AddApplication();
            services.AddInfrastructure(configuration);

            return services;
        }
    }
}
