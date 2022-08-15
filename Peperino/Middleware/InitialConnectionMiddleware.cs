using MediatR;
using Peperino.Application.User.Commands.CreateUser;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;

namespace Peperino.Middleware
{
    public sealed class InitialConnectionMiddleware : IMiddleware
    {
        private static readonly HashSet<string> _checkedConnections = new();
        private readonly ICurrentUserService _currentUserService;
        private readonly IUsersDbContext _usersDbContext;

        public InitialConnectionMiddleware(ICurrentUserService currentUserService, IUsersDbContext usersDbContext)
        {
            _currentUserService = currentUserService;
            _usersDbContext = usersDbContext;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (_currentUserService.UserId != "0" && !_checkedConnections.Contains(_currentUserService.UserId))
            {
                if (await _usersDbContext.Users.FindAsync(_currentUserService.UserId) is null)
                {
                    var mediatR = context?.RequestServices.GetRequiredService<ISender>();
                    if (mediatR is not null)
                    {
                        var newUserId = await mediatR.Send(new CreateUserCommand(_currentUserService.UserId, "Anonymous_" + Guid.NewGuid().ToString()));
                    }
                }

                _checkedConnections.Add(_currentUserService.UserId);
            }

            await next(context);
        }
    }
}
