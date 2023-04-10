using Peperino.EntityFramework.Entities.CheckList;

namespace Peperino.EntityFramework.Entities.Inventory
{
    public class InventoryCheckListItem : BaseCheckListItem
    {
        public string Text { get; set; } = string.Empty;
        public double Quantity { get; set; } = 0.0;
        public virtual InventoryQuantityType Type { get; set; }
    }
}
