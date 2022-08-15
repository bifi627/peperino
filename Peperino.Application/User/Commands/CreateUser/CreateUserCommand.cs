using MediatR;
using Peperino.Application.User.Events;
using Peperino.Contracts.DbContexts;

namespace Peperino.Application.User.Commands.CreateUser
{
    public record CreateUserCommand(string UserId, string UserName) : IRequest<string>;
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
    {
        private readonly IUsersDbContext _dbContext;

        public CreateUserCommandHandler(IUsersDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = new Domain.Base.User
            {
                Id = request.UserId,
                UserName = request.UserName
            };

            user.AddDomainEvent(new UserCreatedEvent(user));

            await _dbContext.Users.AddAsync(user, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return user.Id;
        }
    }
}
