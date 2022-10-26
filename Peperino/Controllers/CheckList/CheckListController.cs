using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Application.CheckList.Commands.CreateCheckList;
using Peperino.Application.CheckList.Commands.DeleteCheckList;
using Peperino.Domain.Base;
using Peperino.Dtos.CheckList;
using Peperino.Dtos.CheckList.Actions;
using Peperino.EntityFramework.Entities.CheckList;
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

        [HttpDelete(Name = "DeleteList")]
        public async Task<ActionResult> DeleteList(DeleteCheckListCommand deleteCheckListCommand)
        {
            await Mediator.Send(deleteCheckListCommand);
            return Ok();
        }

        [HttpPost("{slug}/add", Name = nameof(AddCheckListItem))]
        public async Task<ActionResult<BaseCheckListItemOutDto>> AddCheckListItem(string slug, [FromBody][Required] UpdateTextAction item)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var checkListItem = new TextCheckListItem
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

            var dto = checkListItem.Adapt<TextCheckListItemOutDto>();

            return dto;
        }

        [HttpDelete("{slug}/{id}", Name = nameof(DeleteCheckListItem))]
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

        [HttpPost("{slug}/check/{id}", Name = nameof(ToggleCheck))]
        public async Task<ActionResult<BaseCheckListItemOutDto>> ToggleCheck(string slug, int id)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var baseCheckListItem = checklist.Entities.FirstOrDefault(e => e.Id == id);

            if (baseCheckListItem is null)
            {
                return NotFound();
            }

            baseCheckListItem.Checked = !baseCheckListItem.Checked;

            await DbContext.SaveChangesAsync();

            var dto = baseCheckListItem.Adapt<BaseCheckListItemOutDto>();

            return dto;
        }

        [HttpPost("{slug}/text/{id}", Name = nameof(UpdateTextCheckItem))]
        public async Task<ActionResult<BaseCheckListItemOutDto>> UpdateTextCheckItem(string slug, int id, [FromBody] UpdateTextAction updateTextAction)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var baseCheckListItem = checklist.Entities.FirstOrDefault(e => e.Id == id);

            if (baseCheckListItem is null)
            {
                return NotFound();
            }

            if (baseCheckListItem is TextCheckListItem checkListItem)
            {
                checkListItem.Text = updateTextAction.Text;
            }

            await DbContext.SaveChangesAsync();

            var dto = baseCheckListItem.Adapt<BaseCheckListItemOutDto>();

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

            foreach (var updateItem in updateItems)
            {
                var originalItem = originalItems.FirstOrDefault(i => i.Id == updateItem.Id);
                if (originalItem is not null && originalItem.SortIndex != updateItem.SortIndex)
                {
                    originalItem.SortIndex = updateItem.SortIndex;
                }
            }

            await DbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
