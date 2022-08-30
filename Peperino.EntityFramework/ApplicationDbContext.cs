using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Domain.Base;
using Peperino.Domain.Session;
using Peperino.EntityFramework.Entities;
using Peperino.Infrastructure.Persistence.Interceptors;
using System.Reflection;

namespace Peperino.EntityFramework
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        private readonly IMediator _mediator;
        private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;
        private readonly OwnableEntityCreatedInterceptor _ownableEntityCreatedInterceptor;

        public ApplicationDbContext(DbContextOptions options,
                                    IMediator mediator,
                                    AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor,
                                    OwnableEntityCreatedInterceptor ownableEntityCreatedInterceptor)
            : base(options)
        {
            _mediator = mediator;
            _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
            _ownableEntityCreatedInterceptor = ownableEntityCreatedInterceptor;
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<UserGroup> UserGroups => Set<UserGroup>();

        public DbSet<Demo> Demos => Set<Demo>();

        public DbSet<Session> Sessions => Set<Session>();

        public DbSet<UserStore> UserStores => Set<UserStore>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql();

            optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor, _ownableEntityCreatedInterceptor);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(builder);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.DispatchDomainEvents(this);

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
