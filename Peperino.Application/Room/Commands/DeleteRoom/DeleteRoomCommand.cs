using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;
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
        private readonly IUsersDbContext _usersDbContext;
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public DeleteRoomCommandHandler(IApplicationDbContext dbContext, IUsersDbContext usersDbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _usersDbContext = usersDbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(DeleteRoomCommand request, CancellationToken cancellationToken)
        {
            var currentUser = await _usersDbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            var room = _dbContext.Rooms.Where(r => r.Slug == request.GroupSlug).WithOwnable().WithAuditable().FirstOrDefault();

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
