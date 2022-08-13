using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework.Configurations
{
    public class DemoConfiguration : IEntityTypeConfiguration<Demo>
    {
        public void Configure(EntityTypeBuilder<Demo> builder)
        {
            builder.HasOne(d => d.CreatedBy).WithMany().OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(d => d.LastModifiedBy).WithMany().OnDelete(DeleteBehavior.SetNull);
        }
    }
}
