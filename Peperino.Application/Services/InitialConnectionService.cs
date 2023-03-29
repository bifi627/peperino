using MediatR;
using Peperino.Application.User.Commands.CreateUser;
using Peperino.Core.Contracts;
using Peperino.Core.Contracts.ConnectionManagement;
using Peperino.EntityFramework;

namespace Peperino.Infrastructure.Services
{
    public class InitialConnectionService : IInitialConnectionService
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IApplicationDbContext _dbContext;
        private readonly ISender _mediator;

        public InitialConnectionService(ICurrentUserService currentUserService, IApplicationDbContext dbContext, ISender mediator)
        {
            _currentUserService = currentUserService;
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task HandleInitialConnection()
        {
            // Dispatches CreateUserCommand if user id is unknown
            if (await _dbContext.Users.FindAsync(_currentUserService.UserId) is null)
            {
                await _mediator.Send(new CreateUserCommand(_currentUserService.UserId, "Anonymous_" + Guid.NewGuid().ToString()));
            }
        }
    }
}
