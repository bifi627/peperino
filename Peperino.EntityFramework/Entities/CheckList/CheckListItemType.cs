using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities.CheckList
{
    public enum ItemVariant
    {
        Text = 1,
        Link = 2,
        Image = 3,
        Inventory = 4,
    }

    public class CheckListItemType : BaseEntity<int>
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ItemVariant Variant { get; set; } = ItemVariant.Text;
    }
}
