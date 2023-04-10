using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Application.Inventory.Command;
using Peperino.Dtos.Inventory;

namespace Peperino.Controllers.Inventory
{
    [Authorize]
    public class InventoryController : ApiControllerBase
    {
        //[HttpGet(Name = nameof(GetInventoryBySlug))]
        //public ActionResult<CheckListOutDto> GetInventoryBySlug([Required] string inventorySlug)
        //{
        //    throw new NotImplementedException();
        //}

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
