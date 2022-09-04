using MediatR;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;

namespace Peperino.Application.UserGroup.Commands.CreateUserGroup
{
    public record CreateUserGroupCommand(string GroupName) : IRequest<Domain.Base.UserGroup>;
    public class CreateUserGroupCommandHandler : IRequestHandler<CreateUserGroupCommand, Domain.Base.UserGroup>
    {
        private readonly IUsersDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public CreateUserGroupCommandHandler(IUsersDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Domain.Base.UserGroup> Handle(CreateUserGroupCommand request, CancellationToken cancellationToken)
        {
            var currentUser = _dbContext.Users.FirstOrDefault(u => u.Id == _currentUserService.UserId);

            if (currentUser is null)
            {
                throw new ArgumentNullException(nameof(currentUser));
            }

            var slug = request.GroupName.Slugify();

            if (_dbContext.UserGroups.Any(ug => ug.GroupNameSlug == slug))
            {
                slug += $"-{Guid.NewGuid().ToString()[..8]}";
            }

            var userGroup = new Domain.Base.UserGroup
            {
                GroupName = request.GroupName,
                GroupNameSlug = slug,
            };
            userGroup.Users.Add(currentUser);

            await _dbContext.UserGroups.AddAsync(userGroup, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return userGroup;
        }
    }
}
