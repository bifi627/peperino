using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Application.UserGroup.Commands.CreateUserGroup;
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
        public async Task<ActionResult<Domain.Base.UserGroup>> Create(UserGroupInDto userGroupIn)
        {
            var createdGroup = await Mediator.Send(new CreateUserGroupCommand(userGroupIn.GroupName));
            return createdGroup;
        }

        [HttpGet(Name = "GetAll")]
        public async Task<ActionResult<IEnumerable<Dtos.UserGroup.UserGroupOutDto>>> Get()
        {
            var groups = await Mediator.Send(new GetUserGroupsQuery());

            var dto = groups.Adapt<IEnumerable<Dtos.UserGroup.UserGroupOutDto>>();

            if (dto is null)
            {
                return NotFound();
            }

            return Ok(dto);
        }

        [HttpGet("{slug}", Name = "GetBySlug")]
        public async Task<ActionResult<Dtos.UserGroup.UserGroupOutDto>> GetBySlug(string slug)
        {
            var groups = await Mediator.Send(new GetUserGroupsQuery(slug));

            var dto = groups.Adapt<IEnumerable<Dtos.UserGroup.UserGroupOutDto>>().FirstOrDefault();

            if (dto is null)
            {
                return NotFound();
            }

            return dto;
        }
    }
}
