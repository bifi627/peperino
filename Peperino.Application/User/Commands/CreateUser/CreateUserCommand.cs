using MediatR;
using Peperino.Application.User.Events;
using Peperino.Contracts.DbContexts;

namespace Peperino.Application.User.Commands.CreateUser
{
    public record CreateUserCommand(string ExternalId, string UserName) : IRequest<int>;
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
    {
        private readonly IUsersDbContext _dbContext;

        public CreateUserCommandHandler(IUsersDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = new Domain.Base.User
            {
                ExternalId = request.ExternalId,
                UserName = request.UserName
            };

            user.AddDomainEvent(new UserCreatedEvent(user));

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return user.Id;
        }
    }
}
