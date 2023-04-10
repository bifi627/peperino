using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities.Inventory
{
    public class Inventory : BaseOwnableEntityList<InventoryCheckListItem>
    {
        public virtual Room Room { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
    }
}
