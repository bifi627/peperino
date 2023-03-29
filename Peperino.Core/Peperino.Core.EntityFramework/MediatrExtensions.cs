using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts.EventManagement;

namespace MediatR;

public static class MediatorExtensions
{
    public static async Task DispatchEntityNotifications(this IMediator mediator, DbContext context)
    {
        var entities = context.ChangeTracker
            .Entries<IEventable>()
            .Where(e => e.Entity.Events.Any())
            .Select(e => e.Entity);

        await mediator.DispatchEntityNotifications(entities.ToArray());
    }

    public static async Task DispatchEntityNotifications(this IMediator mediator, params IEventable[] notifiers)
    {
        foreach (var notifier in notifiers)
        {
            var notifications = notifier.Events.ToList();
            notifier.ClearEvents();

            foreach (var notification in notifications)
            {
                await mediator.Publish(notification);
            }
        }
    }
}
