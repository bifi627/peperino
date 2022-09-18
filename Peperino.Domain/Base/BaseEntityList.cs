namespace Peperino.Domain.Base
{
    public abstract class BaseEntityList<T> : BaseOwnableEntity where T : BaseEntity<int>
    {
        public virtual IList<T> Entities { get; set; } = new List<T>();
    }
}
