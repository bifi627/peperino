using Microsoft.AspNetCore.Http;
using Peperino.Contracts.Constants.Authentication;
using Peperino.Core.Contracts;
using System.Security.Claims;

namespace Peperino.Application.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        // Dont inject DbContexts here!!!! Migrations will hang...
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string UserId
        {
            get
            {
                var id = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0";

                return id;
            }
        }

        public bool IsKnownPeperinoUser
        {
            get
            {
                var value = _httpContextAccessor.HttpContext?.User?.FindFirstValue(CustomClaimsTypes.IS_PEPERINO_USER);
                return !string.IsNullOrEmpty(value);
            }
        }
    }
}
