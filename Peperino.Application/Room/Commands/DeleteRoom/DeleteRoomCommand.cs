using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Room.Commands.DeleteRoom
{
    public class DeleteRoomCommand : IRequest<Unit>
    {
        [Required]
        public string GroupSlug { get; set; }

        public DeleteRoomCommand(string groupSlug)
        {
            GroupSlug = groupSlug;
        }
    }

    public class DeleteRoomCommandHandler : IRequestHandler<DeleteRoomCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public DeleteRoomCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(DeleteRoomCommand request, CancellationToken cancellationToken)
        {
            var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            var room = _dbContext.Rooms.Where(r => r.Slug == request.GroupSlug).FirstOrDefault();

            if (room is null)
            {
                throw new Exception($"Room {request.GroupSlug} not found");
            }

            if (room is not null)
            {
                room.RequireAccess(currentUser, AccessLevel.Delete);

                _dbContext.Rooms.Remove(room);
                await _dbContext.SaveChangesAsync();
            }

            return Unit.Value;
        }
    }
}
