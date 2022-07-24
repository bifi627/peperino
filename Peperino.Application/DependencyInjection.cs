using Microsoft.Extensions.DependencyInjection;
using Peperino.Application.Services;
using Peperino.Contracts.Services;

namespace Peperino.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            return services;
        }
    }
}
