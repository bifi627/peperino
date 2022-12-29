namespace Peperino.Core.EntityFramework.Entities
{
    public abstract class BaseOwnableEntityList<T> : BaseOwnableEntity where T : BaseEntity<int>
    {
        public virtual IList<T> Entities { get; set; } = new List<T>();
    }
}
