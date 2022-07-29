using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework
{
    public interface IApplicationDbContext
    {
        DatabaseFacade Database { get; }
        DbSet<Demo> Demos { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
