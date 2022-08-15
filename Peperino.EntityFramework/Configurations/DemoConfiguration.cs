using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.Domain.Base;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework.Configurations
{
    public class DemoConfiguration : IEntityTypeConfiguration<Demo>
    {
        public void Configure(EntityTypeBuilder<Demo> builder)
        {
            builder.HasOne(d => d.CreatedBy).WithMany().OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(d => d.LastModifiedBy).WithMany().OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(d => d.Access).WithOne().HasForeignKey<AccessList>(a => a.ParentRelation).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
