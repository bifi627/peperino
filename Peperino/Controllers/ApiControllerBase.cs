using MediatR;
using Microsoft.AspNetCore.Mvc;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;

namespace Peperino.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        private ISender _mediator = null!;
        private IUsersDbContext _usersDbContext = null!;
        private ICurrentUserService currentUserService = null!;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
        private IUsersDbContext UserDbConext => _usersDbContext ??= HttpContext.RequestServices.GetRequiredService<IUsersDbContext>();
        private ICurrentUserService CurrentUserService => currentUserService ??= HttpContext.RequestServices.GetRequiredService<ICurrentUserService>();


        public Domain.Base.User? CurrentUser => UserDbConext.Users.Find(CurrentUserService.UserId);
    }
}
