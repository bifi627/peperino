using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Peperino.Core.EntityFramework.Exceptions;

namespace Peperino.Core.EntityFramework.Entities
{
    public static class OwnableEntityExtensions
    {
        public static IIncludableQueryable<T, User> WithOwnable<T>(this IQueryable<T> ownableEntity) where T : BaseOwnableEntity
        {
            return ownableEntity.
                Include(r => r.CreatedBy).
                Include(r => r.LastModifiedBy).
                Include(r => r.GroupAccess).
                    ThenInclude(ga => ga.UserGroup).
                        ThenInclude(ug => ug.Users).
                Include(r => r.UserAccess).
                    ThenInclude(ua => ua.User);
        }

        public static IEnumerable<T> FilterRequireRead<T>(this IEnumerable<T> entities, User? user) where T : BaseOwnableEntity
        {
            return entities.FilterRequireAccessLevel(user, AccessLevel.Read);
        }

        public static IEnumerable<T> FilterRequireWrite<T>(this IEnumerable<T> entities, User? user) where T : BaseOwnableEntity
        {
            return entities.FilterRequireAccessLevel(user, AccessLevel.Write);
        }

        public static IEnumerable<T> FilterRequireAccessLevel<T>(this IEnumerable<T> entities, User? user, AccessLevel requestedAccess) where T : BaseOwnableEntity
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return entities.Where(e =>
            {
                var hasUserAccess = e.UserAccess.Any(ua => ua.User.Id == user.Id && ua.AccessLevel >= requestedAccess);
                var hasGroupAccess = e.GroupAccess.Where(ga => ga.UserGroup.Users.Any(u => u.Id == user.Id)).Any(ga => ga.AccessLevel >= requestedAccess);
                return hasUserAccess || hasGroupAccess;
            });
        }

        public static bool RequireAccessRead(this BaseOwnableEntity entity, User? user, bool throwException = true)
        {
            return entity.RequireAccess(user, AccessLevel.Read, throwException);
        }

        public static bool RequireAccessWrite(this BaseOwnableEntity entity, User? user, bool throwException = true)
        {
            return entity.RequireAccess(user, AccessLevel.Write, throwException);
        }

        public static AccessLevel CalculateAccessLevel(this BaseOwnableEntity entity, User? user)
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            AccessLevel accessLevel = AccessLevel.None;

            var userAccess = entity.UserAccess.FirstOrDefault(access => access.User.Id == user.Id);
            if (userAccess?.AccessLevel > accessLevel)
            {
                accessLevel = userAccess.AccessLevel;
            }

            var groupAccess = entity.GroupAccess.FirstOrDefault(ug => ug.UserGroup.Users.FirstOrDefault(u => u.Id == user.Id) is not null);
            if (groupAccess?.AccessLevel > accessLevel)
            {
                accessLevel = groupAccess.AccessLevel;
            }

            return accessLevel;
        }

        public static bool RequireAccess(this BaseOwnableEntity entity, User? user, AccessLevel requestedAccess, bool throwException = true)
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var userAccess = entity.UserAccess.FirstOrDefault(access => access.User.Id == user.Id);
            AccessLevel? existingAccessLevel = null;
            if (userAccess is not null)
            {
                if (userAccess.AccessLevel >= requestedAccess)
                {
                    return true;
                }
                existingAccessLevel = userAccess.AccessLevel;
            }

            var groupAccess = entity.GroupAccess.FirstOrDefault(ug => ug.UserGroup.Users.FirstOrDefault(u => u.Id == user.Id) is not null);
            if (groupAccess is not null)
            {
                if (groupAccess.AccessLevel >= requestedAccess)
                {
                    return true;
                }
                existingAccessLevel = groupAccess.AccessLevel;
            }

            if (throwException)
            {
                throw new EntityAccessException(entity.GetType().Name, entity.Id, user.Id, requestedAccess, existingAccessLevel);
            }

            return false;
        }
    }
}
