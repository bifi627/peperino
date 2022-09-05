using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Application.UserGroup.Commands.CreateUserGroup;
using Peperino.Application.UserGroup.Commands.DeleteUserGroup;
using Peperino.Application.UserGroup.Queries.GetUserGroups;
using Peperino.Dtos.UserGroup;

namespace Peperino.Controllers
{
    [Authorize]
    public class UserGroupController : ApiControllerBase
    {
        public UserGroupController()
        {
        }

        [HttpPost(Name = "Create")]
        public async Task<ActionResult<UserGroupOutDto>> Create(UserGroupInDto userGroupIn)
        {
            var createdGroup = await Mediator.Send(new CreateUserGroupCommand(userGroupIn.GroupName));

            var dto = createdGroup.Adapt<UserGroupOutDto>();

            if (dto is null)
            {
                return BadRequest();
            }

            return dto;
        }

        [HttpGet(Name = "GetAll")]
        public async Task<ActionResult<IEnumerable<UserGroupOutDto>>> Get()
        {
            var groups = await Mediator.Send(new GetUserGroupsQuery());

            var dto = groups.Adapt<IEnumerable<UserGroupOutDto>>();

            if (dto is null)
            {
                return NotFound();
            }

            return Ok(dto);
        }

        [HttpGet("{slug}", Name = "GetBySlug")]
        public async Task<ActionResult<UserGroupOutDto>> GetBySlug(string slug)
        {
            var groups = await Mediator.Send(new GetUserGroupsQuery(slug));

            var group = groups.FirstOrDefault();

            if (group is null)
            {
                return NotFound();
            }

            var dto = group.Adapt<UserGroupOutDto>();

            if (dto is null)
            {
                return BadRequest();
            }

            return dto;
        }

        [HttpDelete("{slug}", Name = "DeleteBySlug")]
        public async Task<ActionResult> DeleteBySlug(string slug)
        {
            await Mediator.Send(new DeleteUserGroupCommand(slug));
            return Ok();
        }
    }
}
