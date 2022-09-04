using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Dtos.UserStoreClient;
using Peperino.EntityFramework.Entities;

namespace Peperino.Controllers
{
    [Authorize]
    public class UserStoreController : ApiControllerBase
    {
        public UserStoreController()
        {
        }

        [HttpGet]
        public async Task<ActionResult<UserStoreDto>> LoadUserStore()
        {
            if (CurrentUser is not null)
            {
                var userStore = DbContext.UserStores.FirstOrDefault(s => s.User == CurrentUser);

                if (userStore is null)
                {
                    userStore = new UserStoreClient
                    {
                        User = CurrentUser
                    };

                    await DbContext.UserStores.AddAsync(userStore);
                    await DbContext.SaveChangesAsync();
                }

                var result = userStore.Adapt<UserStoreDto>();
                return result;
            }

            return BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult> SaveUserStore([FromBody] UserStoreDto userStoreDto)
        {
            var existingUserStore = DbContext.UserStores.FirstOrDefault(s => s.User == CurrentUser);

            if (existingUserStore is not null && CurrentUser is not null)
            {
                existingUserStore.KeyValueStorage = userStoreDto.KeyValueStorage;
                await DbContext.SaveChangesAsync();

                return Ok();
            }

            return BadRequest();
        }
    }
}
