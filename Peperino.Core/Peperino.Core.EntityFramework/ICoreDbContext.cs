using Microsoft.EntityFrameworkCore;
using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Core.EntityFramework
{
    public interface ICoreDbContext
    {
        DbSet<User> Users { get; }
        DbSet<UserGroup> UserGroups { get; }

        DbSet<GroupAccess> GroupAccess { get; }
        DbSet<UserAccess> UserAccess { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
