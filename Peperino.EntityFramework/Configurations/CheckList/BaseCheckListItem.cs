using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.EntityFramework.Entities.CheckList;

namespace Peperino.EntityFramework.Configurations.CheckList
{
    public class BaseCheckListItemConfiguration : IEntityTypeConfiguration<BaseCheckListItem>
    {
        public void Configure(EntityTypeBuilder<BaseCheckListItem> builder)
        {
            builder.HasOne(i => i.CheckList).WithMany(l => l.Entities).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("BaseCheckListItems");
        }
    }
}
