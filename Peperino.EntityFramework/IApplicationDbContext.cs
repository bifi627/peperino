using Microsoft.EntityFrameworkCore;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework
{
    public interface IApplicationDbContext
    {
        DbSet<Demo> Demos { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
