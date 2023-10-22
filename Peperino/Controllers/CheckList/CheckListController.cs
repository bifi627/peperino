using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Application.CheckList.Commands.CreateCheckList;
using Peperino.Application.CheckList.Commands.DeleteCheckList;
using Peperino.Application.CheckList.Commands.UpdateCheckList;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Dtos.CheckList;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Controllers.CheckList
{
    [Authorize]
    public class CheckListController : ApiControllerBase
    {
        [HttpGet(Name = nameof(GetCheckListBySlug))]
        public ActionResult<CheckListOutDto> GetCheckListBySlug([Required] string listSlug)
        {
            var checkList = DbContext.CheckLists.AsSplitQuery()
                                                .Include(c => c.Room)
                                                .ThenInclude(r => r.CheckLists)
                                                .Include(c => c.Entities)
                                                .WithOwnable()
                                                .FilterRequireRead(CurrentUser)
                                                .FirstOrDefault(r => r.Slug == listSlug);

            if (checkList is null || CurrentUser is null)
            {
                return NotFound();
            }

            var dto = checkList.Adapt<CheckListOutDto>();
            dto.AccessLevel = checkList.CalculateAccessLevel(CurrentUser);
            dto.IsFavorite = checkList.Favorites.Any(x => x.User.Id == CurrentUser.Id);

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
            dto.AccessLevel = checkList.CalculateAccessLevel(CurrentUser);

            return dto;
        }

        [HttpDelete(Name = nameof(DeleteList))]
        public async Task<ActionResult> DeleteList(DeleteCheckListCommand deleteCheckListCommand)
        {
            await Mediator.Send(deleteCheckListCommand);
            return Ok();
        }

        [HttpPost("{slug}/rename", Name = "RenameList")]
        public async Task<ActionResult> RenameList(RenameCheckListCommand command)
        {
            await Mediator.Send(command);
            return Ok();
        }
    }
}
