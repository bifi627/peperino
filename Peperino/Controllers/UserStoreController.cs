using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Dtos.UserStore;

namespace Peperino.Controllers
{
    [Authorize]
    public class UserStoreController : ApiControllerBase
    {
        public UserStoreController()
        {
        }

        [HttpGet]
        public async Task<ActionResult<UserStoreDto?>> GetUserStore()
        {
            if (CurrentUser is not null)
            {
                var userStore = DbContext.UserStores.FirstOrDefault(s => s.User == CurrentUser);

                if (userStore is null)
                {
                    userStore = new EntityFramework.Entities.UserStore
                    {
                        User = CurrentUser
                    };

                    await DbContext.UserStores.AddAsync(userStore);
                    await DbContext.SaveChangesAsync();
                }

                //var result = _mapper.ProjectTo<UserStoreDto>(userStore);

                return new UserStoreDto() { Theme = userStore.Theme };
            }

            return BadRequest();
        }
    }
}
