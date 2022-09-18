using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Peperino.EntityFramework.Entities.CheckList;

namespace Peperino.Interceptors.CheckList
{
    public class CheckListUpdateNotificationInterceptor : SaveChangesInterceptor, ICheckListItemsChangedInterceptor
    {
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

            var entries = context.ChangeTracker.Entries<CheckListItem>();
            var groups = entries.GroupBy(e => e.Entity.CheckList.Slug);

            foreach (var group in groups)
            {
                // TODO: Send to all connected clients in Hub
                Console.WriteLine(group.Key);
            }
        }
    }
}
