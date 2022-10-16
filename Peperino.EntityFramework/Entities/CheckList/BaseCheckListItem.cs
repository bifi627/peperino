using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities.CheckList
{
    public enum ItemType
    {
        Text,
        Link,
        Image,
    }

    public abstract class BaseCheckListItem : BaseAuditableEntity
    {
        public abstract ItemType ItemType { get; }
        public int SortIndex { get; set; }
        public bool Checked { get; set; }
        public virtual CheckList CheckList { get; set; }
    }
}
