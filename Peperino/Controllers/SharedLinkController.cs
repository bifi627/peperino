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

            // Remove this specific room stuff later if we want to share more stuff?
            var resolvedLinkDto = new SharedLinkResolvedOutDto();
            if (entity is Room roomDto)
            {
                resolvedLinkDto.Slug = roomDto.Slug;
                resolvedLinkDto.EntityType = "Room";
            }

            // check if access level is already granted
            if (entity.RequireAccess(CurrentUser, grantAccessLevel, false))
            {
                return resolvedLinkDto;
            }

            // check if lower access level is already granted and elevate if needed
            var existingAccess = entity.Access.UserAccess.FirstOrDefault(a => a.User.Id == CurrentUser.Id);
            if (existingAccess is not null)
            {
                existingAccess.AccessLevel = grantAccessLevel;
            }

            // Add user to user access
            entity.Access.UserAccess.Add(new UserAccess() { User = CurrentUser, AccessLevel = grantAccessLevel });

            // If this is a room we need to create a user group assigned to this room
            // this user group can be used to administrate the entities inside this room
            // Remove this specific room stuff later if we want to share more stuff?
            if (entity is Room room)
            {
                var ids = room.Access.GroupAccess.Select(s => s.Id).ToList();

                var groupAccess = await UserDbContext.GroupAccess.Include(ga => ga.UserGroup).Include(ga => ga.UserGroup.Users).Where(ga => ids.Contains(ga.Id)).Where(ga => ga.UserGroup.GroupName == "Members").FirstOrDefaultAsync();

                if (groupAccess is not null)
                {
                    groupAccess.UserGroup.Users.Add(CurrentUser);
                }
            }

            // if link is single use set duration so it is expired
            if (link.LinkType == LinkType.Single)
            {
                link.Duration = TimeSpan.Zero;
            }

            await DbContext.SaveChangesAsync();

            return resolvedLinkDto;
        }
    }
}
