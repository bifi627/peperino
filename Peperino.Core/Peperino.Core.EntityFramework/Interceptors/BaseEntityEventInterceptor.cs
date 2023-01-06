using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Peperino.Core.Contracts.EventManagement;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Core.EntityFramework.Entities.Events;

namespace Peperino.Core.EntityFramework.Interceptors
{
    public class BaseEntityEventInterceptor<T> : SaveChangesInterceptor where T : BaseEntity, new()
    {
        private readonly IMediator _mediator;

        public BaseEntityEventInterceptor(IMediator mediator)
        {
            _mediator = mediator;
        }

        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            _ = FireEvents(eventData.Context);
            return base.SavingChanges(eventData, result);
        }

        public async override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            await FireEvents(eventData.Context);
            return await base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        public async Task FireEvents(DbContext? context)
        {
            if (context == null)
            {
                return;
            }

            var changedEntities = context.ChangeTracker.Entries().Where(x => x.State != EntityState.Unchanged).ToList();

            foreach (var entry in changedEntities)
            {
                if (entry.Entity is IEventable eventable)
                {
                    BaseEvent? @event = null;
                    if (entry.State == EntityState.Added)
                    {
                        @event = new BaseEntityEvent(eventable, EntityEventType.Created);
                    }
                    else if (entry.State == EntityState.Deleted)
                    {
                        @event = new BaseEntityEvent(eventable, EntityEventType.Deleted);
                    }
                    else if (entry.State == EntityState.Modified)
                    {
                        @event = new BaseEntityEvent(eventable, EntityEventType.Updated);
                    }

                    if (@event is not null)
                    {
                        eventable.AddEvent(@event);
                        await _mediator.DispatchEntityNotifications(eventable);
                    }
                }
            }
        }
    }
}
