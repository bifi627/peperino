using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.EntityFramework;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework.Entities;
using Peperino.EntityFramework.Entities.CheckList;
using Peperino.Infrastructure.Persistence.Interceptors;
using Peperino.Interceptors.CheckList;
using System.Reflection;

namespace Peperino.EntityFramework
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        private readonly IMediator _mediator;
        private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;
        private readonly OwnableEntityCreatedInterceptor _ownableEntityCreatedInterceptor;
        private readonly ICheckListItemsChangedInterceptor _checkListItemsChangedInterceptor;

        public ApplicationDbContext(DbContextOptions options,
                                    IMediator mediator,
                                    AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor,
                                    OwnableEntityCreatedInterceptor ownableEntityCreatedInterceptor,
                                    ICheckListItemsChangedInterceptor checkListItemsChangedInterceptor)
            : base(options)
        {
            _mediator = mediator;
            _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
            _ownableEntityCreatedInterceptor = ownableEntityCreatedInterceptor;
            _checkListItemsChangedInterceptor = checkListItemsChangedInterceptor;
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<UserGroup> UserGroups => Set<UserGroup>();
        public DbSet<GroupAccess> GroupAccess => Set<GroupAccess>();
        public DbSet<UserAccess> UserAccess => Set<UserAccess>();

        public DbSet<BaseOwnableEntity> BaseOwnableEntity => Set<BaseOwnableEntity>();

        public DbSet<Demo> Demos => Set<Demo>();

        public DbSet<UserStoreClient> UserStores => Set<UserStoreClient>();

        public DbSet<Room> Rooms => Set<Room>();

        public DbSet<SharedLink> SharedLinks => Set<SharedLink>();

        public DbSet<CheckList> CheckLists => Set<CheckList>();

        public DbSet<CheckListItemType> CheckListItemTypes => Set<CheckListItemType>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql();

            optionsBuilder.UseLazyLoadingProxies();

            optionsBuilder.AddInterceptors(
                _auditableEntitySaveChangesInterceptor,
                _ownableEntityCreatedInterceptor,
                _checkListItemsChangedInterceptor);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            builder.ApplyConfigurationsFromAssembly(typeof(ICoreDbContext).Assembly);

            base.OnModelCreating(builder);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.DispatchDomainEvents(this);

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
