using Microsoft.EntityFrameworkCore;
using Peperino.Domain.Base;

namespace Peperino.Infrastructure.Persistence
{
    public interface IUsersDbContext
    {
        DbSet<User> Users { get; }
    }
}
