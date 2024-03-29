﻿using MediatR;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Room.Commands.CreateRoom
{
    public class CreateRoomCommand : IRequest<EntityFramework.Entities.Room>
    {
        public const string SHARED_ROOM_ACCESS = "SHARED_ROOM_ACCESS";

        [Required]
        [MinLength(3)]
        public string RoomName { get; set; }

        public CreateRoomCommand(string roomName)
        {
            RoomName = roomName;
        }
    }

    public class CreateRoomCommandHandler : IRequestHandler<CreateRoomCommand, EntityFramework.Entities.Room>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public CreateRoomCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<EntityFramework.Entities.Room> Handle(CreateRoomCommand request, CancellationToken cancellationToken)
        {
            var currentUser = _dbContext.Users.FirstOrDefault(u => u.Id == _currentUserService.UserId);

            if (currentUser is null)
            {
                throw new ArgumentNullException(nameof(currentUser));
            }

            var slug = request.RoomName.Slugify();

            if (_dbContext.Rooms.Any(r => r.Slug == slug))
            {
                slug += $"-{Guid.NewGuid().ToString()[..8]}";
            }

            var room = new EntityFramework.Entities.Room()
            {
                RoomName = request.RoomName,
                Slug = slug,
            };

            var groupAccess = new GroupAccess
            {
                AccessLevel = AccessLevel.WriteContent
            };

            groupAccess.UserGroup.GroupName = CreateRoomCommand.SHARED_ROOM_ACCESS;
            groupAccess.UserGroup.Users.Add(currentUser);

            room.GroupAccess.Add(groupAccess);

            await _dbContext.Rooms.AddAsync(room, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return room;
        }
    }
}
