using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Application.Room.Commands.CreateRoom;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Inventory.Command
{
    public class CreateInventoryCommand : IRequest<EntityFramework.Entities.Inventory.Inventory>
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string RoomSlug { get; set; } = string.Empty;
    }

    public class CreateInventoryCommandHandler : IRequestHandler<CreateInventoryCommand, EntityFramework.Entities.Inventory.Inventory>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public CreateInventoryCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<EntityFramework.Entities.Inventory.Inventory> Handle(CreateInventoryCommand request, CancellationToken cancellationToken)
        {
            var currentUser = _dbContext.Users.FirstOrDefault(u => u.Id == _currentUserService.UserId);

            var roomSlug = request.RoomSlug;

            // First check if we have access to this room
            var room = await _dbContext.Rooms.FirstOrDefaultAsync(f => f.Slug == request.RoomSlug, cancellationToken);

            if (room is null)
            {
                throw new ArgumentException("Room not found");
            }

            room.RequireAccess(currentUser, AccessLevel.WriteContent);

            var slug = request.Name.Slugify();

            if (_dbContext.Inventories.Any(r => r.Slug == slug))
            {
                slug += $"-{Guid.NewGuid().ToString()[..8]}";
            }

            var inventory = new EntityFramework.Entities.Inventory.Inventory
            {
                Name = request.Name,
                Slug = slug
            };

            var sharedRoomAccess = room.GroupAccess.FirstOrDefault(f => f.UserGroup.GroupName == CreateRoomCommand.SHARED_ROOM_ACCESS);
            if (sharedRoomAccess is null)
            {
                throw new Exception($"Room ({roomSlug}) has no shared room access group, something is fishy there");
            }

            inventory.GroupAccess.Add(sharedRoomAccess);

            room.Inventories.Add(inventory);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return inventory;
        }
    }
}
