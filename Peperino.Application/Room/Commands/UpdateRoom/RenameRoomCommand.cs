using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Room.Commands.UpdateRoom
{
    public class RenameRoomCommand : IRequest<Unit>
    {
        [Required]
        public string Slug { get; set; }

        [Required]
        [MinLength(3)]
        public string NewName { get; set; }

        public RenameRoomCommand(string slug, string newName)
        {
            Slug = slug;
            NewName = newName;
        }
    }

    public class RenameRoomCommandHandler : IRequestHandler<RenameRoomCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public RenameRoomCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RenameRoomCommand request, CancellationToken cancellationToken)
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

            room.RequireAccessWrite(currentUser);

            room.RoomName = request.NewName;
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
