﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
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

        private IUsersDbContext UserDbConext => _usersDbContext ??= HttpContext.RequestServices.GetRequiredService<IUsersDbContext>();
        private ICurrentUserService CurrentUserService => currentUserService ??= HttpContext.RequestServices.GetRequiredService<ICurrentUserService>();

        protected Domain.Base.User? CurrentUser => UserDbConext.Users.Find(CurrentUserService.UserId);
    }
}
