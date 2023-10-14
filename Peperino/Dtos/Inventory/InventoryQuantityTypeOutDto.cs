using Peperino.EntityFramework.Entities.Inventory;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.Inventory
{
    public class InventoryQuantityTypeOutDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string ShortName { get; set; } = string.Empty;

        [Required]
        public QuantityUnit Unit { get; set; } = QuantityUnit.Unit;
    }
}
