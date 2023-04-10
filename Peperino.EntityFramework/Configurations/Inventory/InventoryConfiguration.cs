using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.Inventory
{
    public class InventoryConfiguration : IEntityTypeConfiguration<Entities.Inventory.Inventory>
    {
        public void Configure(EntityTypeBuilder<Entities.Inventory.Inventory> builder)
        {
            builder.HasOne(d => d.CreatedBy).WithMany().OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(d => d.LastModifiedBy).WithMany().OnDelete(DeleteBehavior.SetNull);

            builder.ToTable("Inventories");
        }
    }
}
