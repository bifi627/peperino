using Microsoft.EntityFrameworkCore;
using Peperino.Domain.Base;
using Peperino.EntityFramework.Entities;
using Peperino.Infrastructure.Persistence;
using Peperino.Infrastructure.Persistence.Interceptors;
using System.Reflection;

namespace Peperino.EntityFramework
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext, IUsersDbContext
    {
        private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;

        public ApplicationDbContext(DbContextOptions options, AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor)
            : base(options)
        {
            this._auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
        }

        public DbSet<User> Users => Set<User>();

        public DbSet<Demo> Demos => Set<Demo>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql();
            optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
            //// PostgreSQL uses the public schema by default - not dbo.
            //modelBuilder.HasDefaultSchema("public");

            //base.OnModelCreating(modelBuilder);

            ////Rename Identity tables to lowercase
            //foreach (var entity in modelBuilder.Model.GetEntityTypes())
            //{
            //    var currentTableName = modelBuilder.Entity(entity.Name).Metadata.GetDefaultTableName();
            //    modelBuilder.Entity(entity.Name).ToTable(currentTableName.ToLower());
            //}
        }
    }
}
