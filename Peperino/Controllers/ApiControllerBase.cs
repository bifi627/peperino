using MediatR;
using Microsoft.AspNetCore.Mvc;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;

namespace Peperino.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        private ISender _mediator = null!;
        private IApplicationDbContext _dbContext = null!;
        private ICurrentUserService currentUserService = null!;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
        protected IApplicationDbContext DbContext => _dbContext ??= HttpContext.RequestServices.GetRequiredService<IApplicationDbContext>();

        private ICurrentUserService CurrentUserService => currentUserService ??= HttpContext.RequestServices.GetRequiredService<ICurrentUserService>();

        private readonly Dictionary<string, User> _userCache = new();
        protected User? CurrentUser
        {
            get
            {
                var key = CurrentUserService.UserId;

                if (_userCache.TryGetValue(key, out var cachedUser))
                {
                    return cachedUser;
                }

                var user = DbContext.Users.SingleOrDefault(u => u.Id == CurrentUserService.UserId);

                if (user is not null)
                {
                    _userCache.Add(key, user);
                }

                return user;
            }
        }
    }
}
