using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.CheckList
{
    public class ImageCheckListItem : IEntityTypeConfiguration<Entities.CheckList.ImageCheckListItem>
    {
        public void Configure(EntityTypeBuilder<Entities.CheckList.ImageCheckListItem> builder)
        {
            builder.HasOne(i => i.CheckList).WithMany(l => l.Entities as IList<Entities.CheckList.ImageCheckListItem>).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("ImageCheckListItems");
        }
    }
}
