using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Core.EntityFramework.Configurations
{
    public class BaseOwnableEntityConfiguration : IEntityTypeConfiguration<BaseOwnableEntity>
    {
        public void Configure(EntityTypeBuilder<BaseOwnableEntity> builder)
        {
            builder.HasMany(e => e.GroupAccess).WithMany(a => a.Entities);
            builder.HasMany(e => e.UserAccess).WithMany(a => a.Entities);
        }
    }
}
