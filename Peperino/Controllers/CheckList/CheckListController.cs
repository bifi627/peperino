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
            var currentUser = CurrentUser;

            Console.WriteLine("___________STARTED");
            var room = DbContext.Rooms.Include(r => r.CheckLists).ThenInclude(c => c.Entities).WithOwnable().FilterRequireRead(currentUser).FirstOrDefault(r => r.Slug == roomSlug);

            if (room is null)
            {
                return NotFound();
            }

            var dtos = room.CheckLists.Select(list =>
            {
                var listOut = list.Adapt<CheckListOutDto>();
                listOut.Room.AccessLevel = list.CalculateAccessLevel(currentUser);
                return listOut;
            });

            room.RequireAccessRead(CurrentUser);

            return Ok(dtos);
        }

        [HttpGet(Name = nameof(GetCheckListBySlug))]
        public async Task<ActionResult<CheckListOutDto>> GetCheckListBySlug([Required] string listSlug)
        {
            var checkList = DbContext.CheckLists.Include(c => c.Room).ThenInclude(r => r.CheckLists).Include(c => c.Entities).WithOwnable().FilterRequireRead(CurrentUser).FirstOrDefault(r => r.Slug == listSlug);

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
