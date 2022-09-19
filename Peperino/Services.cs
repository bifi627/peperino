using Peperino.Application;
using Peperino.EntityFramework;
using Peperino.Infrastructure;

namespace Peperino
{
    public static class Services
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<Middleware.ExceptionHandlerMiddleware>();

            services.AddApplication();
            services.AddEntityFramework(configuration);
            services.AddInfrastructure(configuration);

            services.AddTransient<Middleware.InitialConnectionMiddleware>();

            return services;
        }
    }
}
