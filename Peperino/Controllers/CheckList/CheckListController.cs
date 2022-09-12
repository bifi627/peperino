using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Application.CheckList.Commands.CreateCheckList;
using Peperino.Domain.Base;
using Peperino.Dtos.CheckList;

namespace Peperino.Controllers.CheckList
{
    [Authorize]
    public class CheckListController : ApiControllerBase
    {
        [HttpGet("room", Name = "GetAllListsInGroup")]
        public async Task<ActionResult<IEnumerable<CheckListOutDto>>> GetAllListsInGroup(string roomSlug)
        {
            var room = await DbContext.Rooms.FirstOrDefaultAsync(r => r.Slug == roomSlug);

            if (room is null)
            {
                return NotFound();
            }

            room.RequireAccessRead(CurrentUser);

            var currentUser = CurrentUser;
            var dtos = room.CheckLists.Select(room =>
            {
                var listOut = room.Adapt<CheckListOutDto>();
                listOut.Room.AccessLevel = room.CalculateAccessLevel(currentUser);
                return listOut;
            });

            return Ok(dtos);
        }

        [HttpPost(Name = "CreateList")]
        public async Task<ActionResult<CheckListOutDto>> CreateList(CreateCheckListCommand createCheckListCommand)
        {
            var checkList = await Mediator.Send(createCheckListCommand);

            if (checkList is null)
            {
                return BadRequest();
            }

            var dto = checkList.Adapt<CheckListOutDto>();

            return dto;
        }
    }
}
