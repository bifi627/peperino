using MediatR;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;

namespace Peperino.Application.UserGroup.Commands.DeleteUserGroup
{
    public record DeleteUserGroupCommand(string GroupSlug) : IRequest<Unit>;
    public class DeleteUserGroupCommandHandler : IRequestHandler<DeleteUserGroupCommand, Unit>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IUsersDbContext _dbContext;

        public DeleteUserGroupCommandHandler(ICurrentUserService currentUserService, IUsersDbContext dbContext)
        {
            _currentUserService = currentUserService;
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(DeleteUserGroupCommand request, CancellationToken cancellationToken)
        {
            var group = _dbContext.UserGroups.WithAuditable().FirstOrDefault(ug => ug.GroupNameSlug == request.GroupSlug);
            if (group is not null && group?.CreatedBy?.Id == _currentUserService.UserId)
            {
                _dbContext.UserGroups.Remove(group);
                await _dbContext.SaveChangesAsync();
            }

            return Unit.Value;
        }
    }
}
