using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.Inventory
{
    public class InventoryCheckListItem : IEntityTypeConfiguration<Entities.Inventory.InventoryCheckListItem>
    {
        public void Configure(EntityTypeBuilder<Entities.Inventory.InventoryCheckListItem> builder)
        {
            builder.HasOne(i => i.CheckList).WithMany(l => l.Entities as IList<Entities.Inventory.InventoryCheckListItem>).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("InventoryCheckListItems");
        }
    }
}
