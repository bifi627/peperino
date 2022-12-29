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

        public static AccessLevel CalculateAccessLevel(this BaseOwnableEntity entity, User? user)
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            AccessLevel accessLevel = AccessLevel.None;

            var userAccesses = entity.UserAccess.Where(access => access.User.Id == user.Id);
            foreach (var userAccess in userAccesses)
            {
                if (userAccess?.AccessLevel > accessLevel)
                {
                    accessLevel = userAccess.AccessLevel;
                }
            }

            var groupAccesses = entity.GroupAccess.Where(ug => ug.UserGroup.Users.FirstOrDefault(u => u.Id == user.Id) is not null);
            foreach (var groupAccess in groupAccesses)
            {
                if (groupAccess?.AccessLevel > accessLevel)
                {
                    accessLevel = groupAccess.AccessLevel;
                }
            }

            return accessLevel;
        }

        /// <summary>
        /// This method checks if the required access level for this user is set or higher. This will consider direct user access and access given through group membership.
        /// </summary>
        /// <param name="throwException">Method will throw if required access is not given.</param>
        /// <param name="requestedAccess">Requested access level for given user.</param>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="EntityAccessException"></exception>
        public static bool RequireAccess(this BaseOwnableEntity entity, User? user, AccessLevel requestedAccess, bool throwException = true)
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var userAccesses = entity.UserAccess.Where(access => access.User.Id == user.Id);
            AccessLevel? existingAccessLevel = null;
            foreach (var userAccess in userAccesses)
            {
                if (userAccess.AccessLevel >= requestedAccess)
                {
                    // Negate response when requesting AccessLevel.None
                    return requestedAccess != AccessLevel.None;
                }
                existingAccessLevel = userAccess.AccessLevel;
            }

            var groupAccesses = entity.GroupAccess.Where(ug => ug.UserGroup.Users.FirstOrDefault(u => u.Id == user.Id) is not null);
            foreach (var groupAccess in groupAccesses)
            {
                if (groupAccess.AccessLevel >= requestedAccess)
                {
                    // Negate response when requesting AccessLevel.None
                    return requestedAccess != AccessLevel.None;
                }
                existingAccessLevel = groupAccess.AccessLevel;
            }

            // If required AccessLevel.None then not having this level is implicitly correct
            if (requestedAccess == AccessLevel.None)
            {
                return true;
            }

            if (throwException)
            {
                throw new EntityAccessException(entity.GetType().Name, entity.Id, user.Id, requestedAccess, existingAccessLevel);
            }

            return false;
        }

        public static bool RequireAccessRead(this BaseOwnableEntity entity, User? user, bool throwException = true)
        {
            return entity.RequireAccess(user, AccessLevel.Read, throwException);
        }

        public static bool RequireAccessWrite(this BaseOwnableEntity entity, User? user, bool throwException = true)
        {
            return entity.RequireAccess(user, AccessLevel.Write, throwException);
        }

        /// <summary>
        /// This method will remove all owner access from this entity and set the given user as the sole owner
        /// </summary>
        public static void OverwriteOwner(this BaseOwnableEntity entity, User? user)
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            entity.RemoveAccess(AccessLevel.Owner);
            entity.AddUserAccess(user, AccessLevel.Owner);
        }

        public static void RemoveAccess(this BaseOwnableEntity entity, AccessLevel accessLevel)
        {
            entity.UserAccess.RemoveAll(ua => ua.AccessLevel == accessLevel);
            entity.GroupAccess.RemoveAll(ga => ga.AccessLevel == accessLevel);
        }

        public static void RemoveAccess(this BaseOwnableEntity entity, User user)
        {
            entity.UserAccess.RemoveAll(u => u.User.Id == user.Id);

            var groupAccess = entity.GroupAccess.Where(ga => ga.UserGroup.Users.Any(ug => ug.Id == user.Id));
            foreach (var group in groupAccess)
            {
                group.UserGroup.Users.RemoveAll(ug => ug.Id == user.Id);
            }
        }

        public static void AddUserAccess(this BaseOwnableEntity entity, User user, AccessLevel accessLevel)
        {
            var userAccess = new UserAccess()
            {
                User = user,
                AccessLevel = accessLevel,
            };

            entity.UserAccess.Add(userAccess);
        }

        public static void AddGroupAccess(this BaseOwnableEntity entity, UserGroup group, AccessLevel accessLevel)
        {
            var groupAccess = new GroupAccess()
            {
                UserGroup = group,
                AccessLevel = accessLevel,
            };

            entity.GroupAccess.Add(groupAccess);
        }

        public static void AddUserToGroupAccess(this BaseOwnableEntity entity, GroupAccess groupAccess, User user)
        {
            var existingGroupAccess = entity.GroupAccess.FirstOrDefault(ga => ga.Id == groupAccess.Id);

            if (existingGroupAccess is null)
            {
                throw new ArgumentException(nameof(groupAccess));
            }

            existingGroupAccess.UserGroup.Users.Add(user);
        }

        public static void AddAccess(this BaseOwnableEntity entity, string groupName, User user, AccessLevel accessLevel)
        {
            var group = entity.GroupAccess.FirstOrDefault(g => g.UserGroup.GroupName.Equals(groupName, StringComparison.OrdinalIgnoreCase));

            if (group == null)
            {
                group = new GroupAccess()
                {
                    UserGroup = new UserGroup() { GroupName = groupName },
                    AccessLevel = accessLevel,
                };
                entity.GroupAccess.Add(group);
            }

            if (group.AccessLevel != accessLevel)
            {
                throw new ArgumentException($"Existing group '{groupName}' has not the required access level '{accessLevel}'");
            }

            group.UserGroup.Users.Add(user);
        }
    }
}
