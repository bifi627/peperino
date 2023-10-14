using Peperino.EntityFramework.Entities.Inventory;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList.AddItems
{
    public class InventoryCheckListItemInDto
    {
        [Required]
        public string Text { get; set; } = string.Empty;

        [Required]
        public double Quantity { get; set; } = 0.0;

        [Required]
        public QuantityUnit Unit { get; set; } = QuantityUnit.Unit;
    }
}
