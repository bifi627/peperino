using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.CheckList
{
    public class TextCheckListItem : IEntityTypeConfiguration<Entities.CheckList.TextCheckListItem>
    {
        public void Configure(EntityTypeBuilder<Entities.CheckList.TextCheckListItem> builder)
        {
            builder.HasOne(i => i.CheckList).WithMany(l => l.Entities as IList<Entities.CheckList.TextCheckListItem>).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("TextCheckListItems");
        }
    }
}
