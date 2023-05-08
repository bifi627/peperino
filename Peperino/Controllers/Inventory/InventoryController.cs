using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Application.Inventory.Command;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Dtos.Inventory;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Controllers.Inventory
{
    [Authorize]
    public class InventoryController : ApiControllerBase
    {
        [HttpGet(Name = nameof(GetInventoryBySlug))]
        public ActionResult<InventoryOutDto> GetInventoryBySlug([Required] string inventorySlug)
        {
            var inventory = DbContext.CheckLists.AsSplitQuery()
                                                .Include(c => c.Room_Inventory)
                                                .ThenInclude(r => r.Inventories)
                                                .Include(c => c.Entities)
                                                .WithOwnable()
                                                .FilterRequireRead(CurrentUser)
                                                .FirstOrDefault(r => r.Slug == inventorySlug);

            if (inventory is null)
            {
                return NotFound();
            }

            var dto = inventory.Adapt<InventoryOutDto>();

            return dto;
        }

        [HttpPost(Name = nameof(CreateInventory))]
        public async Task<ActionResult<InventoryOutDto>> CreateInventory(CreateInventoryCommand createInventoryCommand)
        {
            var checkList = await Mediator.Send(createInventoryCommand);

            if (checkList is null)
            {
                return BadRequest();
            }

            var dto = checkList.Adapt<InventoryOutDto>();

            return dto;
        }

        [HttpDelete(Name = nameof(DeleteInventory))]
        public async Task<ActionResult> DeleteInventory(DeleteInventoryCommand deleteInventoryCommand)
        {
            await Mediator.Send(deleteInventoryCommand);
            return Ok();
        }
    }
}
