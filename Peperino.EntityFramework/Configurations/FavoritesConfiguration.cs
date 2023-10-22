using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework.Configurations
{
    internal class FavoritesConfiguration : IEntityTypeConfiguration<Favorites>
    {
        public void Configure(EntityTypeBuilder<Favorites> builder)
        {
            builder.HasMany(f => f.CheckLists).WithMany(c => c.Favorites);
        }
    }
}
