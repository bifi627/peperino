using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Application.User.Commands.CreateUser;
using Peperino.Contracts.Services;
using Peperino.Dtos.User;

namespace Peperino.Controllers
{
    [Authorize]
    public class UserController : ApiControllerBase
    {
        private readonly ICurrentUserService currentUserService;

        public UserController(ICurrentUserService currentUserService)
        {
            this.currentUserService = currentUserService;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(UserInDto user)
        {
            var userId = await Mediator.Send(new CreateUserCommand(currentUserService.UserId, user.UserName));

            return Ok(userId);
        }
    }
}
