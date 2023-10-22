using Mapster;
using Microsoft.AspNetCore.Mvc;
using Peperino.Application.Favorites.Commands;
using Peperino.Application.Favorites.Queries;
using Peperino.Dtos.CheckList;

namespace Peperino.Controllers
{
    public class FavoritesController : ApiControllerBase
    {
        [HttpPost("checklist/{slug}", Name = nameof(UpdateFavoriteCheckList))]
        public async Task<ActionResult> UpdateFavoriteCheckList(string slug, [FromBody] UpdateFavoritesCommand command)
        {
            await Mediator.Send(command);
            return Ok();
        }

        [HttpGet("checklist", Name = nameof(GetFavoriteCheckLists))]
        public async Task<ActionResult<IEnumerable<CheckListOutDto>>> GetFavoriteCheckLists()
        {
            var favorites = await Mediator.Send(new GetFavoritesQuery(QueryType.CheckList));
            var checkLists = favorites.SelectMany(f => f.CheckLists.Adapt<List<CheckListOutDto>>()).ToList();
            return checkLists;
        }

        [HttpGet("inventory", Name = nameof(GetFavoriteInventories))]
        public async Task<ActionResult<IEnumerable<CheckListOutDto>>> GetFavoriteInventories()
        {
            var favorites = await Mediator.Send(new GetFavoritesQuery(QueryType.Inventory));
            var inventories = favorites.SelectMany(f => f.CheckLists.Adapt<List<CheckListOutDto>>()).ToList();
            return inventories;
        }
    }
}
