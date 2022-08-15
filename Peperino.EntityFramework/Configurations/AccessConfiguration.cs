using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Configurations
{
    public class AccessConfiguration : IEntityTypeConfiguration<AccessList>
    {
        public void Configure(EntityTypeBuilder<AccessList> builder)
        {
            builder.HasMany(a => a.UserAccess).WithOne().OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(a => a.GroupAccess).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class UserAccessConfiguration : IEntityTypeConfiguration<UserAccess>
    {
        public void Configure(EntityTypeBuilder<UserAccess> builder)
        {
            //builder.HasOne(ua => ua.acc)
        }
    }
}
