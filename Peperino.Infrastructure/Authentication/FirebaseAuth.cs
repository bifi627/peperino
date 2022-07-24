using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Peperino.Infrastructure.Authentication
{
    public static class FirebaseAuth
    {
        public static IServiceCollection AddFirebaseAuth(this IServiceCollection services, IConfiguration configuration)
        {
            var firebaseSettingsSection = configuration.GetSection(FirebaseSettings.SECTION_NAME);

            var firebaseConfig = firebaseSettingsSection.Get<FirebaseSettings>();

            var app = FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromJson(firebaseConfig.AccessJson)
            });

            services.AddSingleton(FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.Authority = firebaseConfig.ValidIssuer;
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = firebaseConfig.ValidIssuer,
                        ValidAudience = firebaseConfig.ValidAudience
                    };
                });

            return services;
        }
    }
}
