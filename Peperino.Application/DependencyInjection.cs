using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Application.Services;
using Peperino.Contracts.Services;
using System.Reflection;

namespace Peperino.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
