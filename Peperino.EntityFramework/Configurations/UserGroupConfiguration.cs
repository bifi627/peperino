using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Configurations
{
    public class UserGroupConfiguration : IEntityTypeConfiguration<UserGroup>
    {
        public void Configure(EntityTypeBuilder<UserGroup> builder)
        {
            builder.HasMany(ug => ug.Users).WithMany(u => u.UserGroups);
            builder.HasOne(ug => ug.CreatedBy).WithMany().OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(ug => ug.LastModifiedBy).WithMany().OnDelete(DeleteBehavior.SetNull); ;
        }
    }
}
