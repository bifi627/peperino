using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;

namespace Peperino.Infrastructure.Persistence.Interceptors
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

            if (context is IUsersDbContext usersDbContext)
            {
                var user = usersDbContext.Users.FirstOrDefault(f => f.ExternalId == _currentUserService.FirebaseUserId);

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
                Console.WriteLine("");
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
