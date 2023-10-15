using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Room.Commands.UpdateRoom
{
    public class RevokeRoomAccessCommand : IRequest<Unit>
    {
        [Required]
        public string Slug { get; set; }

        [Required]
        public string UserId { get; set; }

        public RevokeRoomAccessCommand(string slug, string userId)
        {
            Slug = slug;
            UserId = userId;
        }
    }

    public class RevokeRoomAccessCommandHandler : IRequestHandler<RevokeRoomAccessCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public RevokeRoomAccessCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RevokeRoomAccessCommand request, CancellationToken cancellationToken)
        {
            var room = await _dbContext.Rooms.FirstOrDefaultAsync(r => r.Slug == request.Slug, cancellationToken: cancellationToken);
            var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            if (room is null)
            {
                throw new Exception($"Room {request.Slug} not found");
            }

            room.RequireAccess(currentUser, AccessLevel.Owner);

            var toRemoveUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken: cancellationToken);

            if (toRemoveUser is null)
            {
                throw new Exception($"User {request.UserId} not found");
            }

            room.RemoveAccess(toRemoveUser);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
