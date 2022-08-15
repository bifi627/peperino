using Peperino.Domain.Base;

namespace Peperino.Domain.Exceptions
{
    public class EntityAccessException : Exception
    {
        public string EntityName { get; init; }
        public int EntityId { get; init; }
        public string UserId { get; init; }
        public AccessLevel RequestedAccessLevel { get; init; }
        public AccessLevel? AccessLevel { get; }

        public EntityAccessException(string entityName, int entityId, string userId, AccessLevel requestedAccessLevel, AccessLevel? accessLevel = null, Exception? innerException = null) : base("Access denied", innerException)
        {
            EntityName = entityName;
            EntityId = entityId;
            UserId = userId;
            RequestedAccessLevel = requestedAccessLevel;
            AccessLevel = accessLevel;
        }

        public string GetReason()
        {
            var reason = $"The user '{UserId}' is not allowed to access '{EntityName}_{EntityId}' (Requested Access '{RequestedAccessLevel}' Provided Access '{AccessLevel ?? Base.AccessLevel.None}')";

            return reason;
        }
    }
}
