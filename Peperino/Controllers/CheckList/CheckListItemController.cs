using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.Services;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Dtos.CheckList;
using Peperino.Dtos.CheckList.AddItems;
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

            var variant = item switch
            {
                TextCheckListItem _ => ItemVariant.Text,
                LinkCheckListItem _ => ItemVariant.Link,
                ImageCheckListItem _ => ItemVariant.Image,
                InventoryCheckListItem _ => ItemVariant.Inventory,
                _ => throw new NotImplementedException(),
            };
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
        public async Task<ActionResult<BaseCheckListItemOutDto>> AddTextItem(string slug, [FromBody][Required] TextCheckListItemInDto textInDto)
        {
            var textCheckListItem = new TextCheckListItem
            {
                Text = textInDto.Text,
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

        [HttpPost("{slug}/inventory/add", Name = nameof(AddInventoryItem))]
        public async Task<ActionResult<BaseCheckListItemOutDto>> AddInventoryItem(string slug, [FromBody][Required] InventoryCheckListItemInDto inventoryInDto)
        {
            var inventoryCheckListItem = new InventoryCheckListItem
            {
                Text = inventoryInDto.Text,
                Quantity = inventoryInDto.Quantity,
                Unit = inventoryInDto.Unit,
            };

            var dto = await AddCheckListItem(slug, inventoryCheckListItem);

            return dto;
        }

        [HttpPost("{slug}/updateItem", Name = nameof(UpdateCheckListItem))]
        public async Task<ActionResult> UpdateCheckListItem(string slug, [FromBody][Required] BaseCheckListItemOutDto baseDto)
        {
            var checklist = await DbContext.CheckLists.FirstOrDefaultAsync(x => x.Slug == slug);
            if (checklist is null)
            {
                return NotFound();
            }

            checklist.RequireAccess(CurrentUser, AccessLevel.WriteContent);

            var baseCheckListItem = checklist.Entities.FirstOrDefault(e => e.Id == baseDto.Id);
            if (baseCheckListItem is null)
            {
                return NotFound();
            }

            // Set base data
            baseCheckListItem.Checked = baseDto.Checked;

            if (baseCheckListItem is TextCheckListItem textItem && baseDto is TextCheckListItemOutDto textDto)
            {
                textItem.Text = textDto.Text;
            }
            else if (baseCheckListItem is LinkCheckListItem linkItem && baseDto is LinkCheckListItemOutDto linkDto)
            {
                linkItem.Title = linkDto.Title;
                linkItem.Link = linkDto.Link;
            }
            else if (baseCheckListItem is InventoryCheckListItem inventoryItem && baseDto is InventoryCheckListItemOutDto inventoryDto)
            {
                inventoryItem.Text = inventoryDto.Text;
                inventoryItem.Quantity = inventoryDto.Quantity;
                inventoryItem.Unit = inventoryDto.Unit;
            }
            else
            {
                return BadRequest();
            }

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
