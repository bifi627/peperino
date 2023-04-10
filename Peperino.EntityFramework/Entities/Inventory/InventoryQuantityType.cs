using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities.Inventory
{
    public enum QuantityType
    {
        None = 0,
        Unit = 1,

        Gramm = 100,
        Kilo = 101,

        Mililitre = 200,
        Litre = 201,
    }

    public class InventoryQuantityType : BaseEntity<int>
    {
        public string Name { get; set; } = string.Empty;
        public string ShortName { get; set; } = string.Empty;
        public QuantityType QuantityType { get; set; } = QuantityType.None;
    }
}
