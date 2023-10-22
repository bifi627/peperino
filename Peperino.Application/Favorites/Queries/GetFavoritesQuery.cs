using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.EntityFramework;

namespace Peperino.Application.Favorites.Queries
{
    public enum QueryType
    {
        CheckList,
        Inventory,
    }

    public record GetFavoritesQuery(QueryType Type) : IRequest<IEnumerable<EntityFramework.Entities.Favorites>>;

    public class GetFavoriteCheckListsQueryHandler :
        IRequestHandler<GetFavoritesQuery,
        IEnumerable<EntityFramework.Entities.Favorites>>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public GetFavoriteCheckListsQueryHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<IEnumerable<EntityFramework.Entities.Favorites>> Handle(GetFavoritesQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            var favorites = await _dbContext.Favorites.Where(f => f.User == currentUser).ToListAsync();

            foreach (var favorite in favorites)
            {
                switch (request.Type)
                {
                    case QueryType.CheckList:
                        {
                            favorite.CheckLists = favorite.CheckLists.Where(c => c.Room is not null).ToList();
                            break;
                        }

                    case QueryType.Inventory:
                        {
                            favorite.CheckLists = favorite.CheckLists.Where(c => c.Room_Inventory is not null).ToList();
                            break;
                        }
                    default:
                        {
                            throw new Exception("Query type not implemented");
                        }
                }
            }

            favorites = favorites.Where(f => f.CheckLists.Any()).ToList();

            return favorites;
        }
    }
}
