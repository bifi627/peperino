using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Application.Room.Commands.CreateRoom;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.CheckList.Commands.CreateCheckList
{
    public class CreateCheckListCommand : IRequest<EntityFramework.Entities.CheckList.CheckList>
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string RoomSlug { get; set; } = string.Empty;
    }

    public class CreateCheckListCommandHandler : IRequestHandler<CreateCheckListCommand, EntityFramework.Entities.CheckList.CheckList>
    {
        private readonly IUsersDbContext _usersDbContext;
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public CreateCheckListCommandHandler(IApplicationDbContext dbContext, IUsersDbContext usersDbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _usersDbContext = usersDbContext;
            _currentUserService = currentUserService;
        }

        public async Task<EntityFramework.Entities.CheckList.CheckList> Handle(CreateCheckListCommand request, CancellationToken cancellationToken)
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

            // Create CheckList
            var slug = roomSlug.Slugify();

            if (_dbContext.CheckLists.Any(r => r.Slug == slug))
            {
                slug += $"-{Guid.NewGuid().ToString()[..8]}";
            }

            var checkList = new EntityFramework.Entities.CheckList.CheckList
            {
                Name = request.Name,
                Slug = slug
            };

            checkList.Entities.Add(new EntityFramework.Entities.CheckList.CheckListItem()
            {
                Checked = false,
                SortIndex = 0,
                Text = "TEST"
            });

            checkList.Entities.Add(new EntityFramework.Entities.CheckList.CheckListItem()
            {
                Checked = false,
                SortIndex = 1,
                Text = "TEST"
            });

            checkList.Entities.Add(new EntityFramework.Entities.CheckList.CheckListItem()
            {
                Checked = false,
                SortIndex = 2,
                Text = "TEST"
            });

            // Every room has a specific user group for easeier managing the access
            // The entity inside the group (CheckList in this case) should reference this user group
            // Once applied we dont need the reference to the actual group but is this even necessary
            // I shoud be able to access the parent room at any time if i need to check access...
            var sharedRoomAccess = room.GroupAccess.FirstOrDefault(f => f.UserGroup.GroupName == CreateRoomCommand.SHARED_ROOM_ACCESS);

            if (sharedRoomAccess is null)
            {
                throw new Exception($"Room ({roomSlug}) has no shared room access group, something is fishy there");
            }

            checkList.GroupAccess.Add(sharedRoomAccess);

            room.CheckLists.Add(checkList);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return checkList;
        }
    }
}
