using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.EntityFramework;

namespace Peperino.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        private ISender _mediator = null!;
        private IUsersDbContext _usersDbContext = null!;
        private IApplicationDbContext _dbContext = null!;
        private ICurrentUserService currentUserService = null!;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
        protected IApplicationDbContext DbContext => _dbContext ??= HttpContext.RequestServices.GetRequiredService<IApplicationDbContext>();
        protected IUsersDbContext UserDbContext => _usersDbContext ??= HttpContext.RequestServices.GetRequiredService<IUsersDbContext>();

        private ICurrentUserService CurrentUserService => currentUserService ??= HttpContext.RequestServices.GetRequiredService<ICurrentUserService>();

        private readonly Dictionary<string, Domain.Base.User> _userCache = new();
        protected Domain.Base.User? CurrentUser
        {
            get
            {
                var key = CurrentUserService.UserId;

                if (_userCache.TryGetValue(key, out var cachedUser))
                {
                    return cachedUser;
                }

                var user = UserDbContext.Users.AsNoTracking().FirstOrDefault(u => u.Id == CurrentUserService.UserId);

                if (user is not null)
                {
                    _userCache.Add(key, user);
                }

                return user;
            }
        }
    }
}
