using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Application.CheckList.Commands.CreateCheckList;
using Peperino.Application.CheckList.Commands.DeleteCheckList;
using Peperino.Domain.Base;
using Peperino.Dtos.CheckList;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Controllers.CheckList
{
    [Authorize]
    public class CheckListController : ApiControllerBase
    {
        [HttpGet("room", Name = nameof(GetAllListInRoom))]
        public async Task<ActionResult<IEnumerable<CheckListOutDto>>> GetAllListInRoom(string roomSlug)
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

        [HttpGet(Name = nameof(GetCheckListBySlug))]
        public async Task<ActionResult<CheckListOutDto>> GetCheckListBySlug([Required] string listSlug)
        {
            var checkList = await DbContext.CheckLists.FirstOrDefaultAsync(r => r.Slug == listSlug);

            if (checkList is null)
            {
                return NotFound();
            }

            checkList.RequireAccessRead(CurrentUser);

            var dto = checkList.Adapt<CheckListOutDto>();

            return dto;
        }

        [HttpPost(Name = nameof(CreateList))]
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

        [HttpDelete(Name = nameof(DeleteList))]
        public async Task<ActionResult> DeleteList(DeleteCheckListCommand deleteCheckListCommand)
        {
            await Mediator.Send(deleteCheckListCommand);
            return Ok();
        }
    }
}
