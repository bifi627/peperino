using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;
using Peperino.Dtos.CheckList;
using Peperino.EntityFramework.Entities.CheckList;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Controllers.CheckList
{
    [Authorize]
    public class CheckListItemController : ApiControllerBase
    {
        private readonly IFirebaseStorageService _firebaseStorageService;

        public CheckListItemController(IFirebaseStorageService firebaseStorageService)
        {
            _firebaseStorageService = firebaseStorageService;
        }

        private async Task<ActionResult<BaseCheckListItemOutDto>> AddCheckListItem(string slug, BaseCheckListItem item)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var variant = item.GetType() == typeof(TextCheckListItem) ? ItemVariant.Text : item.GetType() == typeof(LinkCheckListItem) ? ItemVariant.Link : ItemVariant.Image;

            var itemType = await DbContext.CheckListItemTypes.FirstOrDefaultAsync(x => x.Variant == variant);

            if (itemType is null)
            {
                return BadRequest("Item type not found");
            }

            item.ItemType = itemType;

            if (checklist.Entities.Any())
            {
                item.SortIndex = checklist.Entities.Max(e => e.SortIndex) + 1;
            }

            checklist.Entities.Add(item);
            await DbContext.SaveChangesAsync();

            var dto = BaseCheckListItemOutDto.AdaptFrom(item);
            return dto;
        }

        [HttpPost("{slug}/text/add", Name = nameof(AddTextItem))]
        public async Task<ActionResult<BaseCheckListItemOutDto>> AddTextItem(string slug, [FromBody][Required] string text)
        {
            var textCheckListItem = new TextCheckListItem
            {
                Text = text,
            };

            var dto = await AddCheckListItem(slug, textCheckListItem);

            return dto;
        }

        [HttpPost("{slug}/link/add", Name = nameof(AddLinkItem))]
        public async Task<ActionResult<BaseCheckListItemOutDto>> AddLinkItem(string slug, [FromBody][Required] LinkCheckListItemInDto linkInDto)
        {
            var textCheckListItem = new LinkCheckListItem
            {
                Link = linkInDto.Link,
                Title = linkInDto.Title,
            };

            var dto = await AddCheckListItem(slug, textCheckListItem);

            return dto;
        }

        [HttpPost("{slug}/image/add", Name = nameof(AddImageItem))]
        public async Task<ActionResult<BaseCheckListItemOutDto>> AddImageItem(string slug, [FromBody][Required] ImageCheckListItemInDto imageInDto)
        {
            var parts = imageInDto.ImageBase64.Split(",");

            var contentType = parts[0].Split(";")[0].Split(":")[1];
            var content = parts[1];

            var bytes = Convert.FromBase64String(content);

            var guid = await _firebaseStorageService.UploadFile(StorageScope.CheckListStorage, new MemoryStream(bytes), contentType);

            var imageCheckListItem = new ImageCheckListItem
            {
                Title = imageInDto.Title,
                ImageReference = guid,
            };

            var dto = await AddCheckListItem(slug, imageCheckListItem);
            return dto;
        }

        [HttpPost("{slug}/{id}/text/update", Name = nameof(UpdateCheckListItem))]
        public async Task<ActionResult> UpdateCheckListItem(string slug, int id, [FromBody][Required] string text)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var baseCheckListItem = checklist.Entities.FirstOrDefault(e => e.Id == id);

            if (baseCheckListItem is TextCheckListItem textCheckListItem)
            {
                textCheckListItem.Text = text;
                await DbContext.SaveChangesAsync();

                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("{slug}/{id}/link/update", Name = nameof(UpdateLinkCheckListItem))]
        public async Task<ActionResult> UpdateLinkCheckListItem(string slug, int id, [FromBody][Required] LinkCheckListItemInDto linkInDto)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);

            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var baseCheckListItem = checklist.Entities.FirstOrDefault(e => e.Id == id);

            if (baseCheckListItem is LinkCheckListItem linkCheckListItem)
            {
                linkCheckListItem.Link = linkInDto.Link;
                linkCheckListItem.Title = linkInDto.Title;

                await DbContext.SaveChangesAsync();

                return Ok();
            }

            return BadRequest();
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

            if (checkListItem is ImageCheckListItem imageCheckListItem)
            {
                await _firebaseStorageService.DeleteFile(StorageScope.CheckListStorage, imageCheckListItem.ImageReference);
            }

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
