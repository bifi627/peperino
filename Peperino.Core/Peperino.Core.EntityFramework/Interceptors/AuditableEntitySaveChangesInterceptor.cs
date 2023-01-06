using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Core.EntityFramework.Interceptors
{
    public class AuditableEntitySaveChangesInterceptor : SaveChangesInterceptor
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IDateTimeProvider _dateTime;

        public AuditableEntitySaveChangesInterceptor(
            ICurrentUserService currentUserService,
            IDateTimeProvider dateTimeProvider)
        {
            _currentUserService = currentUserService;
            _dateTime = dateTimeProvider;
        }

        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            UpdateEntities(eventData.Context);

            return base.SavingChanges(eventData, result);
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            UpdateEntities(eventData.Context);

            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        public void UpdateEntities(DbContext? context)
        {
            if (context == null)
            {
                return;
            }

            if (context is ICoreDbContext usersDbContext)
            {
                var user = usersDbContext.Users.FirstOrDefault(user => user.Id == _currentUserService.UserId);

                foreach (var entry in context.ChangeTracker.Entries<BaseAuditableEntity>())
                {
                    if (entry.State == EntityState.Added)
                    {
                        entry.Entity.CreatedBy = user;
                        entry.Entity.Created = _dateTime.UtcNow;
                    }

                    if (entry.State == EntityState.Added || entry.State == EntityState.Modified || entry.HasChangedOwnedEntities())
                    {
                        entry.Entity.LastModifiedBy = user;
                        entry.Entity.LastModified = _dateTime.UtcNow;
                    }
                }
            }
            else
            {
                throw new Exception("Unknown db context");
            }
        }
    }

    public static class Extensions
    {
        public static bool HasChangedOwnedEntities(this EntityEntry entry)
        {
            return entry.References.Any(r =>
                r.TargetEntry != null &&
                r.TargetEntry.Metadata.IsOwned() &&
                (r.TargetEntry.State == EntityState.Added || r.TargetEntry.State == EntityState.Modified));
        }
    }
}
