using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Dtos.Inventory;

namespace Peperino.Controllers
{
    [Authorize]
    public class QuantityController : ApiControllerBase
    {
        [HttpGet(Name = nameof(GetAllQuantities))]
        public async Task<ActionResult<List<InventoryQuantityTypeOutDto>>> GetAllQuantities()
        {
            var list = await DbContext.InventoryQuantityTypes.ToListAsync();

            var mapped = list.Adapt<List<InventoryQuantityTypeOutDto>>();

            return mapped;
        }
    }
}
