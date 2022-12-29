using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Contracts.Services;
using Peperino.Core.Contracts;
using Peperino.Infrastructure.Authentication;
using Peperino.Infrastructure.Persistence;
using Peperino.Infrastructure.Services;
using Peperino.Infrastructure.Validation;
using System.Reflection;

namespace Peperino.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddFirebaseAuth(configuration);

            services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
            services.AddSingleton<IFirebaseStorageService, FirebaseStorageService>();

            //services.AddScoped<AuditableEntitySaveChangesInterceptor>();
            //services.AddScoped<OwnableEntityCreatedInterceptor>();

            services.AddScoped<ICustomClaimService, CustomClaimService>();

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
