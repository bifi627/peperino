using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework.Configurations
{
    internal class UserStoreConfiguration : IEntityTypeConfiguration<UserStoreClient>
    {
        public void Configure(EntityTypeBuilder<UserStoreClient> builder)
        {
            builder.HasOne(us => us.User).WithOne().HasForeignKey<UserStoreClient>(us => us.Id);
            builder.Property(us => us.KeyValueStorage).HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Dictionary<string, string>>(v));
        }
    }
}
