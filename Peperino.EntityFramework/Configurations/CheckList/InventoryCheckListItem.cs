using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.CheckList
{
    public class InventoryCheckListItem : IEntityTypeConfiguration<Entities.CheckList.InventoryCheckListItem>
    {
        public void Configure(EntityTypeBuilder<Entities.CheckList.InventoryCheckListItem> builder)
        {
            builder.HasOne(i => i.CheckList).WithMany(l => l.Entities as IList<Entities.CheckList.InventoryCheckListItem>).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("InventoryCheckListItems");
        }
    }
}
