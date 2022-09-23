using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Peperino.Contracts.DbContexts;
using Peperino.Domain.Base;
using Peperino.EntityFramework.Entities;
using Peperino.EntityFramework.Entities.CheckList;

namespace Peperino.EntityFramework
{
    public interface IApplicationDbContext : IUsersDbContext, IBaseDbContext
    {
        DatabaseFacade Database { get; }
        DbSet<BaseOwnableEntity> BaseOwnableEntity { get; }
        DbSet<Demo> Demos { get; }
        DbSet<UserStoreClient> UserStores { get; }
        DbSet<Room> Rooms { get; }
        DbSet<SharedLink> SharedLinks { get; }
        DbSet<CheckList> CheckLists { get; }
    }
}
