using Peperino.EntityFramework.Entities.Inventory;

namespace Peperino.EntityFramework.Entities.CheckList
{
    public class InventoryCheckListItem : BaseCheckListItem
    {
        public string Text { get; set; } = string.Empty;
        public double Quantity { get; set; } = 0.0;
        public QuantityUnit Unit { get; set; } = QuantityUnit.Unit;
    }
}
