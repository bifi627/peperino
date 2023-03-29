using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.EntityFramework;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework.Entities;
using Peperino.EntityFramework.Entities.CheckList;
using System.Reflection;

namespace Peperino.EntityFramework
{
    public class ApplicationDbContext : BaseDbContext, IApplicationDbContext
    {
        private readonly IMediator _mediator;

        public ApplicationDbContext(
            DbContextOptions options,
            IMediator mediator,
            IServiceProvider serviceProvider) : base(options, serviceProvider)
        {
            _mediator = mediator;
        }

        public override DbSet<User> Users => Set<User>();
        public override DbSet<UserGroup> UserGroups => Set<UserGroup>();
        public override DbSet<GroupAccess> GroupAccess => Set<GroupAccess>();
        public override DbSet<UserAccess> UserAccess => Set<UserAccess>();

        public DbSet<BaseOwnableEntity> BaseOwnableEntity => Set<BaseOwnableEntity>();
        public DbSet<Demo> Demos => Set<Demo>();
        public DbSet<UserStoreClient> UserStores => Set<UserStoreClient>();
        public DbSet<Room> Rooms => Set<Room>();
        public DbSet<SharedLink> SharedLinks => Set<SharedLink>();
        public DbSet<CheckList> CheckLists => Set<CheckList>();
        public DbSet<CheckListItemType> CheckListItemTypes => Set<CheckListItemType>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseNpgsql();

            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            builder.ApplyConfigurationsFromAssembly(typeof(ICoreDbContext).Assembly);

            base.OnModelCreating(builder);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.DispatchEntityNotifications(this);
            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
