namespace Peperino.Core.EntityFramework.Entities
{
    public abstract class BaseEntityList<KeyType, EntityType, EntityKeyType> : BaseAuditableEntity<KeyType> where EntityType : BaseEntity<EntityKeyType>
    {
        public virtual IList<EntityType> Entities { get; set; } = new List<EntityType>();
    }
}
