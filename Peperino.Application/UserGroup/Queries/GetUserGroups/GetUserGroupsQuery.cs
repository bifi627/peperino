using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;

namespace Peperino.Application.UserGroup.Queries.GetUserGroups
{
    public record GetUserGroupsQuery(string Slug = "") : IRequest<IEnumerable<Domain.Base.UserGroup>>;
    public class GetUserGroupsQueryHandler : IRequestHandler<GetUserGroupsQuery, IEnumerable<Domain.Base.UserGroup>>
    {
        private readonly IUsersDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public GetUserGroupsQueryHandler(IUsersDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<IEnumerable<Domain.Base.UserGroup>> Handle(GetUserGroupsQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            var allGroups = _dbContext.UserGroups.WithAuditable().Include(ug => ug.Users);
            var filterdGroups = allGroups.Where(ug => ug.CreatedBy != null && ug.CreatedBy.Id == currentUser.Id || ug.Users.Any(u => u.Id == currentUser.Id));

            if (!string.IsNullOrWhiteSpace(request.Slug))
            {
                filterdGroups = filterdGroups.Where(g => g.GroupNameSlug == request.Slug);
            }

            return filterdGroups;
        }
    }
}
