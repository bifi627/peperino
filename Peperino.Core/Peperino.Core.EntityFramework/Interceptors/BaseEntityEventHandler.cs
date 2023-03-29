using MediatR;
using Peperino.Core.Contracts.EventManagement;
using Peperino.Core.EntityFramework.Entities.Events;

namespace Peperino.Core.EntityFramework.Interceptors
{
    public abstract class BaseEntityEventHandler : INotificationHandler<BaseEntityEvent>
    {
        public virtual Task OnDeleted(IEventable entity)
        {
            return Task.CompletedTask;
        }

        public virtual Task OnCreated(IEventable entity)
        {
            return Task.CompletedTask;
        }

        public virtual Task OnUpdated(IEventable entity)
        {
            return Task.CompletedTask;
        }

        public abstract Task<bool> CanHandle(IEventable eventable);

        public async Task Handle(BaseEntityEvent notification, CancellationToken cancellationToken)
        {
            if (await CanHandle(notification.Entity))
            {
                switch (notification.Event)
                {
                    case EntityEventType.Created:
                        await OnCreated(notification.Entity);
                        break;
                    case EntityEventType.Updated:
                        await OnUpdated(notification.Entity);
                        break;
                    case EntityEventType.Deleted:
                        await OnDeleted(notification.Entity);
                        break;
                    default:
                        throw new NotImplementedException($"Unknown entity event {notification.Event}");
                }
            }
        }
    }
}
