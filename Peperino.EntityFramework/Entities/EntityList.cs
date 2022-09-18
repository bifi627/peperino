using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities
{
    public class EntityList<T> : BaseOwnableEntity where T : BaseOwnableEntity
    {
        public virtual IList<T> Entities { get; set; } = new List<T>();
    }
}
