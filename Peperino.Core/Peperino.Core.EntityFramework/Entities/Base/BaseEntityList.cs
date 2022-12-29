namespace Peperino.Core.EntityFramework.Entities
{
    public abstract class BaseEntityList<T> : BaseAuditableEntity where T : BaseEntity<int>
    {
        public virtual IList<T> Entities { get; set; } = new List<T>();
    }
}
