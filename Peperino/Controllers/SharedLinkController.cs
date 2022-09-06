using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Domain.Base;
using Peperino.Dtos.SharedLink;
using Peperino.EntityFramework.Entities;

namespace Peperino.Controllers
{
    [Authorize]
    public class SharedLinkController : ApiControllerBase
    {
        [HttpPost(Name = "CreateSharedLink")]
        public async Task<ActionResult<SharedLinkOutDto>> CreateSharedLink([FromBody] SharedLinkInDto sharedLinkInDto)
        {
            BaseOwnableEntity? entity = null;
            if (sharedLinkInDto.EntityType == "Room")
            {
                entity = await DbContext.Rooms.WithOwnable().WithAuditable().FirstOrDefaultAsync(r => r.Slug == sharedLinkInDto.Slug);
            }

            if (entity is null)
            {
                return NotFound();
            }

            entity.RequireAccess(CurrentUser, AccessLevel.Owner);

            var link = new SharedLink
            {
                Duration = TimeSpan.FromDays(1),
                Slug = Guid.NewGuid().ToString()[..8],
                Entity = entity,
                GrantAccessLevel = sharedLinkInDto.GrantAccessLevel
            };

            DbContext.SharedLinks.Add(link);
            await DbContext.SaveChangesAsync();

            var dto = link.Adapt<SharedLinkOutDto>();

            return dto;
        }

        [HttpPost("{slug}", Name = "ExecuteSharedLink")]
        public async Task<ActionResult<SharedLinkResolvedOutDto>> ExecuteSharedLink(string slug)
        {
            if (CurrentUser is null)
            {
                return BadRequest();
            }

            var link = DbContext.SharedLinks.Where(l => l.Slug == slug).Include(l => l.Entity).Include(l => l.Entity.Access.UserAccess).Include(l => l.Entity.Access.GroupAccess).FirstOrDefault();

            if (link is null)
            {
                return NotFound();
            }

            // Check if link is expired
            if (link.Created + link.Duration < DateTime.Now)
            {
                return BadRequest("Link expired");
            }

            var grantAccessLevel = link.GrantAccessLevel;

            // Re-read entity to resolve access lists
            var entity = await DbContext.BaseOwnableEntity.WithAuditable().WithOwnable().FirstOrDefaultAsync(r => r.Id == link.Entity.Id);

            if (entity is null)
            {
                return NotFound();
            }

            // check if access level is already granted
            if (entity.RequireAccess(CurrentUser, grantAccessLevel, false))
            {
                return Ok();
            }

            // check if lower access level is already granted and elevate if needed
            var existingAccess = entity.Access.UserAccess.FirstOrDefault(a => a.User.Id == CurrentUser.Id);
            if (existingAccess is not null)
            {
                existingAccess.AccessLevel = grantAccessLevel;
            }

            entity.Access.UserAccess.Add(new UserAccess() { User = CurrentUser, AccessLevel = grantAccessLevel });

            // if link is single use set duration so it is expired
            if (link.LinkType == LinkType.Single)
            {
                link.Duration = TimeSpan.Zero;
            }

            await DbContext.SaveChangesAsync();

            var dto = link.Adapt<SharedLinkResolvedOutDto>();

            return dto;
        }
    }
}
