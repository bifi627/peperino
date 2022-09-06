using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework.Configurations
{
    public class SharedLinkConfiguration : IEntityTypeConfiguration<SharedLink>
    {
        public void Configure(EntityTypeBuilder<SharedLink> builder)
        {
        }
    }
}
