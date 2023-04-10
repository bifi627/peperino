using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Peperino.Core.EntityFramework;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework.Entities;
using Peperino.EntityFramework.Entities.CheckList;
using Peperino.EntityFramework.Entities.Inventory;

namespace Peperino.EntityFramework
{
    public interface IApplicationDbContext : ICoreDbContext
    {
        DatabaseFacade Database { get; }
        DbSet<BaseOwnableEntity> BaseOwnableEntity { get; }
        DbSet<Demo> Demos { get; }
        DbSet<UserStoreClient> UserStores { get; }
        DbSet<Room> Rooms { get; }
        DbSet<SharedLink> SharedLinks { get; }
        DbSet<CheckList> CheckLists { get; }
        DbSet<CheckListItemType> CheckListItemTypes { get; }
        DbSet<InventoryQuantityType> InventoryQuantityTypes { get; }
        DbSet<Inventory> Inventories { get; }
    }
}
