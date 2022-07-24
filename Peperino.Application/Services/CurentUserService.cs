using Microsoft.AspNetCore.Http;
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

        public string? UserId
        {
            get
            {
                var id = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

                return id;
            }
        }
    }
}
