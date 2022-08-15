using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;

namespace Peperino.Infrastructure.Persistence.Interceptors
{
    public class OwnableEntityCreatedInterceptor : SaveChangesInterceptor
    {
        private readonly ICurrentUserService _currentUserService;

        public OwnableEntityCreatedInterceptor(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
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
            if (context is null)
            {
                return;
            }

            if (context is IUsersDbContext usersDbContext)
            {
                var user = usersDbContext.Users.FirstOrDefault(user => user.Id == _currentUserService.UserId);

                foreach (var entry in context.ChangeTracker.Entries<BaseOwnableEntity>())
                {
                    if (entry.State == EntityState.Added && user is not null && entry.Entity.Access.UserAccess.FirstOrDefault(a => a.User.Id == user.Id) is null)
                    {
                        entry.Entity.Access.UserAccess.Add(new UserAccess() { User = user, AccessLevel = AccessLevel.Owner });
                    }
                }
            }
            else
            {
                throw new Exception("Unknown db context");
            }
        }
    }
}
