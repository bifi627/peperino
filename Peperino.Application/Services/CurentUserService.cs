using Microsoft.AspNetCore.Http;
using Peperino.Contracts.Constants.Authentication;
using Peperino.Contracts.Services;
using System.Security.Claims;

namespace Peperino.Application.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string FirebaseUserId
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
