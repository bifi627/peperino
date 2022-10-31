using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Peperino.Contracts.Services;
using Peperino.Contracts.Services.CheckList;
using Peperino.EntityFramework;
using Peperino.EntityFramework.Entities.CheckList;
using Peperino.Interceptors.CheckList;

namespace Peperino.Application.CheckList
{
    public class CheckListUpdateNotificationInterceptor : SaveChangesInterceptor, ICheckListItemsChangedInterceptor
    {
        private readonly ICheckListNotificationService _checkListNotificationService;
        private readonly ICurrentUserService _currentUserService;

        public CheckListUpdateNotificationInterceptor(ICheckListNotificationService checkListNotificationService, ICurrentUserService currentUser)
        {
            _checkListNotificationService = checkListNotificationService;
            _currentUserService = currentUser;
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

            var entries = context.ChangeTracker.Entries<TextCheckListItem>();

            if (entries.TryGetNonEnumeratedCount(out int count) && count == 0 || !entries.Any())
            {
                return;
            }

            if (context is IApplicationDbContext dbContext)
            {
                var currentUser = dbContext.Users.FirstOrDefault(u => u.Id == _currentUserService.UserId);

                if (currentUser is null)
                {
                    throw new Exception("CurrentUser is null");
                }

                // Changed entities can notify the parent check list
                var groups = entries.Where(e => e.State != EntityState.Deleted).GroupBy(e => e.Entity.CheckList.Slug);
                foreach (var group in groups)
                {
                    _checkListNotificationService.SendCheckListUpdatedNotification(group.Key, currentUser);
                }

                // Deleted entities are already removed from the list and must be manually found
                var checkListsToNotify = new List<EntityFramework.Entities.CheckList.CheckList>();
                var allDeleted = entries.Where(e => e.State == EntityState.Deleted);
                foreach (var deleted in allDeleted)
                {
                    checkListsToNotify.AddRange(dbContext.CheckLists.Include(c => c.Entities).Where(e => e.Entities.Any(i => i.Id == deleted.Entity.Id)));
                }

                foreach (var checkList in checkListsToNotify)
                {
                    _checkListNotificationService.SendCheckListUpdatedNotification(checkList.Slug, currentUser);
                }
            }
            else
            {
                throw new Exception("Unknown db context");
            }
        }
    }
}
