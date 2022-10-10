using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Application.CheckList.Commands.CreateCheckList;
using Peperino.Application.CheckList.Commands.DeleteCheckList;
using Peperino.Domain.Base;
using Peperino.Dtos.CheckList;
using Peperino.EntityFramework.Entities.CheckList;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Controllers.CheckList
{
    [Authorize]
    public class CheckListController : ApiControllerBase
    {
        [HttpGet("room", Name = "GetAllListInRoom")]
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

        [HttpGet(Name = "GetCheckListBySlug")]
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

        [HttpDelete(Name = "DeleteList")]
        public async Task<ActionResult> DeleteList(DeleteCheckListCommand deleteCheckListCommand)
        {
            await Mediator.Send(deleteCheckListCommand);
            return Ok();
        }

        [HttpPost("{slug}/add", Name = "AddCheckListItem")]
        public async Task<ActionResult<CheckListItemOutDto>> AddCheckListItem(string slug, [FromBody][Required] AddCheckListItem item)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var checkListItem = new CheckListItem
            {
                Text = item.Text,
                SortIndex = 0,
            };

            if (checklist.Entities.Any())
            {
                checkListItem.SortIndex = checklist.Entities.Max(e => e.SortIndex) + 1;
            }

            checklist.Entities.Add(checkListItem);
            await DbContext.SaveChangesAsync();

            var dto = checkListItem.Adapt<CheckListItemOutDto>();

            return dto;
        }

        [HttpDelete("{slug}/{id}", Name = "DeleteCheckListItem")]
        public async Task<ActionResult> DeleteCheckListItem(string slug, int id)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var checkListItem = checklist.Entities.FirstOrDefault(e => e.Id == id);

            if (checkListItem is null)
            {
                return NotFound();
            }

            checklist.Entities.Remove(checkListItem);
            await DbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("{slug}/{id}", Name = "UpdateCheckListItem")]
        public async Task<ActionResult<CheckListItemOutDto>> UpdateCheckListItem(string slug, int id, [FromBody] CheckListItemOutDto checkListItemOutDto)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var checkListItem = checklist.Entities.FirstOrDefault(e => e.Id == id);

            if (checkListItem is null)
            {
                return NotFound();
            }

            checkListItem.Text = checkListItemOutDto.Text;
            checkListItem.Checked = checkListItemOutDto.Checked;

            await DbContext.SaveChangesAsync();

            var dto = checkListItem.Adapt<CheckListItemOutDto>();

            return dto;
        }

        [HttpPost("{slug}/arrange", Name = nameof(ArrangeSortIndex))]
        public async Task<ActionResult> ArrangeSortIndex(string slug, RearrangeCheckListItemsInDto rearrangeRequest)
        {
            var updateItems = rearrangeRequest.Items;
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(l => l.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            var originalItems = checklist.Entities.ToArray();

            var toUpdateItems = new List<CheckListItemOutDto>();

            foreach (var updateItem in updateItems)
            {
                var originalItem = originalItems.FirstOrDefault(i => i.Id == updateItem.Id);
                if (originalItem is not null && originalItem.SortIndex != updateItem.SortIndex)
                {
                    originalItem.SortIndex = updateItem.SortIndex;
                    toUpdateItems.Add(updateItem);
                }
            }

            await DbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
