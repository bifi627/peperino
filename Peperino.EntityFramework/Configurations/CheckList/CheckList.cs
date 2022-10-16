using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Peperino.EntityFramework.Configurations.CheckList
{
    public class CheckListConfiguration : IEntityTypeConfiguration<Entities.CheckList.CheckList>
    {
        public void Configure(EntityTypeBuilder<Entities.CheckList.CheckList> builder)
        {
            builder.HasMany(c => c.Entities).WithOne(e => e.CheckList).OnDelete(DeleteBehavior.Cascade);
            builder.ToTable("CheckLists");
        }
    }
}
