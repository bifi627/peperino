using Peperino.Core.Contracts.EventManagement;

namespace Peperino.Core.EntityFramework.Entities.Events
{
    public class BaseEntityEvent : BaseEvent
    {
        public IEventable Entity { get; }
        public EntityEventType Event { get; }

        public BaseEntityEvent(IEventable entity, EntityEventType eventType)
        {
            Entity = entity;
            Event = eventType;
        }
    }
}
