using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities.CheckList
{
    public abstract class BaseCheckListItem : BaseAuditableEntity
    {
        public virtual CheckListItemType ItemType { get; set; }
        public int SortIndex { get; set; }
        public bool Checked { get; set; }
        public virtual CheckList CheckList { get; set; }
    }
}
