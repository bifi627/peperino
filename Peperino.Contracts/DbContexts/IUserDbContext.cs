using Microsoft.EntityFrameworkCore;
using Peperino.Domain.Base;

namespace Peperino.Contracts.DbContexts
{
    public interface IUsersDbContext : IBaseDbContext
    {
        DbSet<User> Users { get; }
    }
}
