using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Configurations
{
    public class BaseOwnableEntityConfiguration : IEntityTypeConfiguration<BaseOwnableEntity>
    {
        public void Configure(EntityTypeBuilder<BaseOwnableEntity> builder)
        {
        }
    }
}
