using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Domain.Base;
using Peperino.Dtos.CheckList;
using Peperino.Dtos.CheckList.Actions;
using Peperino.EntityFramework.Entities.CheckList;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Controllers.CheckList
{
    public class CheckListItemController : ApiControllerBase
    {
        [HttpPost("{slug}/string/add", Name = nameof(AddCheckListItem))]
        public async Task<ActionResult<BaseCheckListItemOutDto>> AddCheckListItem(string slug, [FromBody][Required] UpdateCheckListItemAction<string> action)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var itemType = await DbContext.CheckListItemTypes.FirstOrDefaultAsync(x => x.Variant == action.Variant);

            if (itemType is null)
            {
                return BadRequest("Item type not found");
            }

            var baseCheckListItem = CheckListItemBuilder.CreateStringItem(action.Value, itemType);

            if (checklist.Entities.Any())
            {
                baseCheckListItem.SortIndex = checklist.Entities.Max(e => e.SortIndex) + 1;
            }

            var dto = BaseCheckListItemOutDto.AdaptFrom(baseCheckListItem);

            checklist.Entities.Add(baseCheckListItem);
            await DbContext.SaveChangesAsync();

            return dto;
        }

        [HttpPost("{slug}/{id}/string/update", Name = nameof(UpdateCheckListItem))]
        public async Task<ActionResult> UpdateCheckListItem(string slug, int id, [FromBody][Required] UpdateCheckListItemAction<string> action)
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

            switch (baseCheckListItem)
            {
                default:
                    break;
            }

            CheckListItemBuilder.UpdateStringItem(baseCheckListItem, action.Value);

            await DbContext.SaveChangesAsync();

            return Ok();
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

        [HttpPost("{slug}/{id}/base/check", Name = nameof(ToggleCheck))]
        public async Task<ActionResult> ToggleCheck(string slug, int id)
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

            return Ok();
        }

        [HttpPost("{slug}/base/arrange", Name = nameof(ArrangeSortIndex))]
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
