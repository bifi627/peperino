using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Application.CheckList;
using Peperino.Application.CheckList.Hubs;
using Peperino.Application.CheckList.Services;
using Peperino.Application.Services;
using Peperino.Contracts.Services.CheckList;
using Peperino.Core.Contracts;
using Peperino.Core.Contracts.ConnectionManagement;
using Peperino.Core.EntityFramework;
using Peperino.Infrastructure.Services;
using System.Reflection;

namespace Peperino.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IInitialConnectionService, InitialConnectionService>();

            services.AddScoped<ICheckListNotificationService<Core.EntityFramework.Entities.User>, CheckListNotificationService>();

            services.AddScoped<ICheckListHub, CheckListHub>();

            var assemblies = new List<Assembly>()
            {
                Assembly.GetExecutingAssembly(),
                Assembly.GetCallingAssembly(),
                Assembly.GetAssembly(typeof(ICoreDbContext))!
            }.ToArray();

            services.AddMediatR(assemblies);
            services.AddValidatorsFromAssemblies(assemblies);

            return services;
        }
    }
}
