using Microsoft.EntityFrameworkCore;
using Peperino.Domain.Session;

namespace Peperino.Contracts.DbContexts
{
    public interface ISessionDbContext : IBaseDbContext
    {
        DbSet<Session> Sessions { get; }
    }
}
