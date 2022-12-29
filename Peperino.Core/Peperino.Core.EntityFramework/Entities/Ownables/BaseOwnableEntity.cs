using Peperino.Core.EntityFramework.Interfaces;

namespace Peperino.Core.EntityFramework.Entities
{
    public abstract class BaseOwnableEntity : BaseOwnableEntity<int> { }
    public abstract class BaseOwnableEntity<KeyType> : BaseAuditableEntity<KeyType>, IOwnable
    {
        // Must be strongly typed as list because this is used by entity framework
        public virtual List<UserAccess> UserAccess { get; set; } = new List<UserAccess>();
        public virtual List<GroupAccess> GroupAccess { get; set; } = new List<GroupAccess>();
    }
}
