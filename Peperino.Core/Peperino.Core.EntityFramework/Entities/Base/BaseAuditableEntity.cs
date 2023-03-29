using Peperino.Core.EntityFramework.Interfaces;

namespace Peperino.Core.EntityFramework.Entities
{
    public abstract class BaseAuditableEntity : BaseAuditableEntity<int> { }
    public abstract class BaseAuditableEntity<KeyType> : BaseEntity<KeyType>, IAuditable
    {
        public DateTime Created { get; set; }

        public virtual User? CreatedBy { get; set; }

        public DateTime? LastModified { get; set; }

        public virtual User? LastModifiedBy { get; set; }
    }
}