using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Favorites.Commands
{
    public class UpdateFavoritesCommand : IRequest<Unit>
    {
        [Required]
        public string Slug { get; set; }

        [Required]
        public bool Favorite { get; set; }

        public UpdateFavoritesCommand(string slug, bool favorite)
        {
            Slug = slug;
            Favorite = favorite;
        }
    }

    public class UpdateFavoritesCommandHandler : IRequestHandler<UpdateFavoritesCommand>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public UpdateFavoritesCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(UpdateFavoritesCommand request, CancellationToken cancellationToken)
        {
            var checkList = await _dbContext.CheckLists.FirstOrDefaultAsync(r => r.Slug == request.Slug, cancellationToken: cancellationToken);
            var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            if (checkList is null)
            {
                throw new Exception($"Inventory {request.Slug} not found");
            }

            var favorites = checkList.Favorites.SingleOrDefault(f => f.User.Id == currentUser.Id);

            if (favorites is null)
            {
                favorites = new EntityFramework.Entities.Favorites()
                {
                    User = currentUser,
                };

                checkList.Favorites.Add(favorites);
            }

            if (!request.Favorite)
            {
                favorites.CheckLists.Remove(checkList);
            }
            else
            {
                favorites.CheckLists.Add(checkList);
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }

}
