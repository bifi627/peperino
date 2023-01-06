using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Core.EntityFramework.Interceptors;

namespace Peperino.Core.EntityFramework
{
    public abstract class BaseDbContext : DbContext, ICoreDbContext
    {
        private readonly IServiceProvider _serviceProvider;

        public BaseDbContext(
            DbContextOptions options,
            IServiceProvider serviceProvider) : base(options)
        {
            _serviceProvider = serviceProvider;
        }

        public abstract DbSet<User> Users { get; }
        public abstract DbSet<UserGroup> UserGroups { get; }
        public abstract DbSet<GroupAccess> GroupAccess { get; }
        public abstract DbSet<UserAccess> UserAccess { get; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var entityEventInterceptor = _serviceProvider.GetRequiredService<BaseEntityEventInterceptor<BaseEntity>>();

            var auditableEntitySaveChangesInterceptor = _serviceProvider.GetRequiredService<AuditableEntitySaveChangesInterceptor>();
            var ownableEntityCreatedInterceptor = _serviceProvider.GetRequiredService<OwnableEntityCreatedInterceptor>();

            optionsBuilder.AddInterceptors(entityEventInterceptor, auditableEntitySaveChangesInterceptor, ownableEntityCreatedInterceptor);
            base.OnConfiguring(optionsBuilder);
        }
    }
}
