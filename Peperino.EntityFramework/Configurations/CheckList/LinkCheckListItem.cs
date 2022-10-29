using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.CheckList
{
    public class LinkCheckListItem : IEntityTypeConfiguration<Entities.CheckList.LinkCheckListItem>
    {
        public void Configure(EntityTypeBuilder<Entities.CheckList.LinkCheckListItem> builder)
        {
            builder.HasOne(i => i.CheckList).WithMany(l => l.Entities as IList<Entities.CheckList.LinkCheckListItem>).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("LinkCheckListItems");
        }
    }
}
