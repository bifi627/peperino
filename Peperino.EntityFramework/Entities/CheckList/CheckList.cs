using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities.CheckList
{
    public class CheckList : BaseOwnableEntityList<BaseCheckListItem>
    {
        public virtual Room? Room { get; set; }
        public virtual Room? Room_Inventory { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
    }
}
