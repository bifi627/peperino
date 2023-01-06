using MediatR;
using Peperino.Application.User.Events;
using Peperino.Core.EntityFramework;

namespace Peperino.Application.User.Commands.CreateUser
{
    public record CreateUserCommand(string UserId, string UserName) : IRequest<string>;
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
    {
        private readonly ICoreDbContext _dbContext;

        public CreateUserCommandHandler(ICoreDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = new Core.EntityFramework.Entities.User
            {
                Id = request.UserId,
                UserName = request.UserName
            };

            user.AddEvent(new UserCreatedEvent(user));

            await _dbContext.Users.AddAsync(user, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return user.Id;
        }
    }
}
