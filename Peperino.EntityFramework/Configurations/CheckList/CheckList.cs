using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.CheckList
{
    public class CheckListConfiguration : IEntityTypeConfiguration<Entities.CheckList.CheckList>
    {
        public void Configure(EntityTypeBuilder<Entities.CheckList.CheckList> builder)
        {
            builder.HasMany(c => c.Entities).WithOne(e => e.CheckList).OnDelete(DeleteBehavior.Cascade);

            //builder.Property<int>("RoomId_CheckList");
            //builder.HasOne(c => c.Room_Checklist).WithMany(e => e.CheckLists).OnDelete(DeleteBehavior.Cascade).HasForeignKey("RoomId_CheckList");

            //builder.Property<int>("RoomId_Inventory");
            //builder.HasOne(c => c.Room_Checklist).WithMany(e => e.Inventories).OnDelete(DeleteBehavior.Cascade).HasForeignKey("RoomId_Inventory");

            builder.HasOne(c => c.Room).WithMany(e => e.CheckLists).OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.Room_Inventory).WithMany(e => e.Inventories).OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("CheckLists");
        }
    }
}
