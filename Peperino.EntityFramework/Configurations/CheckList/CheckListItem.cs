using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.CheckList
{
    public class CheckListItemConfiguration : IEntityTypeConfiguration<Entities.CheckList.CheckListItem>
    {
        public void Configure(EntityTypeBuilder<Entities.CheckList.CheckListItem> builder)
        {
            builder.HasOne(i => i.CheckList).WithMany(l => l.Entities).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("CheckListItems");
        }
    }
}
