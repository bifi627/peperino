using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;
using Peperino.EntityFramework;

namespace Peperino.Application.Room.Queries.GetRooms
{
    public record GetRoomsQuery(string Slug = "") : IRequest<IEnumerable<EntityFramework.Entities.Room>>;
    public class GetRoomsQueryHandler : IRequestHandler<GetRoomsQuery, IEnumerable<EntityFramework.Entities.Room>>
    {
        private readonly IUsersDbContext _usersDbContext;
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public GetRoomsQueryHandler(IApplicationDbContext dbContext, IUsersDbContext usersDbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _usersDbContext = usersDbContext;
            _currentUserService = currentUserService;
        }

        public async Task<IEnumerable<EntityFramework.Entities.Room>> Handle(GetRoomsQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await _usersDbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            var allRooms = _dbContext.Rooms.AsNoTracking().AsSplitQuery()
                                           .Include(r => r.CheckLists)
                                           .ThenInclude(l => l.Entities)
                                           .ThenInclude(e => e.ItemType)
                                           .WithOwnable()
                                           .FilterRequireRead(currentUser)
                                           .AsQueryable();

            if (!string.IsNullOrEmpty(request.Slug))
            {
                allRooms = allRooms.Where(r => r.Slug == request.Slug);
            }

            return allRooms;
        }
    }
}
