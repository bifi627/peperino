using Peperino.Core.EntityFramework.Interfaces;

namespace Peperino.Core.EntityFramework.Entities
{
    public abstract class BaseOwnableEntity : BaseAuditableEntity, IOwnable
    {
        public virtual IList<UserAccess> UserAccess { get; set; } = new List<UserAccess>();
        public virtual IList<GroupAccess> GroupAccess { get; set; } = new List<GroupAccess>();
    }
}
