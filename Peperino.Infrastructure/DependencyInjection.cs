using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Contracts.Services;
using Peperino.Infrastructure.Authentication;
using Peperino.Infrastructure.Persistence.Interceptors;
using Peperino.Infrastructure.Services;
using Peperino.Infrastructure.Validation;

namespace Peperino.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddFirebaseAuth(configuration);

            services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

            services.AddScoped<AuditableEntitySaveChangesInterceptor>();

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            return services;
        }
    }
}
