using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities.CheckList
{
    public class CheckListItem : BaseAuditableEntity
    {
        public int SortIndex { get; set; }
        public bool Checked { get; set; }
        public string Text { get; set; } = string.Empty;

        public virtual CheckList CheckList { get; set; }
    }
}
