using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Core.EntityFramework.Interceptors;
using Peperino.Core.Web.Middleware;

namespace Peperino.Core.Web
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCorePeperino(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<AuditableEntitySaveChangesInterceptor>();
            services.AddScoped<OwnableEntityCreatedInterceptor>();
            services.AddScoped<BaseEntityEventInterceptor<BaseEntity>>();

            services.AddTransient<InitialConnectionMiddleware>();
            services.AddTransient<ExceptionHandlerMiddleware>();

            return services;
        }

        public static IApplicationBuilder UseCorePeperino(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandlerMiddleware>();
            app.UseMiddleware<InitialConnectionMiddleware>();

            return app;
        }
    }
}
