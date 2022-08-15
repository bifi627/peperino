using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Peperino.Domain.Exceptions;

namespace Peperino.Domain.Base
{
    public abstract class BaseOwnableEntity : BaseAuditableEntity
    {
        public AccessList Access { get; set; } = new AccessList();
    }

    public static class OwnableEntityExtensions
    {
        public static IIncludableQueryable<T, IList<GroupAccess>> WithOwnable<T>(this IQueryable<T> ownableEntity) where T : BaseOwnableEntity
        {
            return ownableEntity.Include(x => x.Access.UserAccess).Include(x => x.Access.GroupAccess);
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

            foreach (var entity in entities)
            {
                if (RequireAccess(entity, user, requestedAccess, false))
                {
                    yield return entity;
                }
            }
        }

        public static bool RequireAccessRead(this BaseOwnableEntity entity, User? user, bool throwException = true)
        {
            return entity.RequireAccess(user, AccessLevel.Read, throwException);
        }

        public static bool RequireAccessWrite(this BaseOwnableEntity entity, User? user, bool throwException = true)
        {
            return entity.RequireAccess(user, AccessLevel.Write, throwException);
        }

        public static bool RequireAccess(this BaseOwnableEntity entity, User? user, AccessLevel requestedAccess, bool throwException = true)
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var userAccess = entity.Access.UserAccess.FirstOrDefault(access => access.User.Id == user.Id);
            AccessLevel? existingAccessLevel = null;
            if (userAccess is not null)
            {
                if (userAccess.AccessLevel >= requestedAccess)
                {
                    return true;
                }
                existingAccessLevel = userAccess.AccessLevel;
            }

            var groupAccess = entity.Access.GroupAccess.FirstOrDefault(ug => ug.UserGroup.Users.FirstOrDefault(u => u.Id == user.Id) is not null);
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
