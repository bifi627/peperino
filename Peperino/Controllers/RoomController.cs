using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Application.Room.Commands.CreateRoom;
using Peperino.Application.Room.Commands.DeleteRoom;
using Peperino.Application.Room.Commands.UpdateRoom;
using Peperino.Application.Room.Queries.GetRooms;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Dtos.UserGroup;

namespace Peperino.Controllers
{
    [Authorize]
    public class RoomController : ApiControllerBase
    {
        public RoomController()
        {
        }

        [HttpPost(Name = "CreateRoom")]
        public async Task<ActionResult<RoomOutDto>> CreateRoom(CreateRoomCommand createRoomCommand)
        {
            var createdRoom = await Mediator.Send(createRoomCommand);

            var dto = createdRoom.Adapt<RoomOutDto>();

            if (dto is null)
            {
                return BadRequest();
            }

            return dto;
        }

        [HttpGet(Name = "GetAll")]
        public async Task<ActionResult<IEnumerable<RoomOutDto>>> GetAll()
        {
            var rooms = await Mediator.Send(new GetRoomsQuery());

            var currentUser = CurrentUser;
            var dto = rooms.Select(room =>
            {
                var roomOut = room.Adapt<RoomOutDto>();
                roomOut.AccessLevel = room.CalculateAccessLevel(currentUser);
                return roomOut;
            });

            if (dto is null)
            {
                return NotFound();
            }

            return Ok(dto);
        }

        [HttpGet("{slug}", Name = "GetBySlug")]
        public async Task<ActionResult<RoomOutDto>> GetBySlug(string slug)
        {
            var rooms = await Mediator.Send(new GetRoomsQuery(slug));

            var room = rooms.FirstOrDefault();

            if (room is null)
            {
                return NotFound();
            }

            var dto = room.Adapt<RoomOutDto>();
            dto.AccessLevel = room.CalculateAccessLevel(CurrentUser);

            if (dto is null)
            {
                return BadRequest();
            }

            return dto;
        }

        [HttpDelete("{slug}", Name = "DeleteBySlug")]
        public async Task<ActionResult> DeleteBySlug(string slug)
        {
            await Mediator.Send(new DeleteRoomCommand(slug));
            return Ok();
        }

        [HttpPost("{slug}/rename", Name = "RenameRoom")]
        public async Task<ActionResult> RenameRoom(RenameRoomCommand command)
        {
            await Mediator.Send(command);
            return Ok();
        }
    }
}
