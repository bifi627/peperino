using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Peperino.Core.EntityFramework
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCoreEntityFramework(this IServiceCollection services, IConfiguration configuration)
        {
            return services;
        }
    }
}
