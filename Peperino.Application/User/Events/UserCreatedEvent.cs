using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Application.User.Events
{
    public class UserCreatedEvent : BaseEvent
    {
        public Core.EntityFramework.Entities.User User { get; }
        public UserCreatedEvent(Core.EntityFramework.Entities.User user)
        {
            User = user;
        }
    }
}
