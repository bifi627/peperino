using Peperino.Domain.Base;

namespace Peperino.Application.User.Events
{
    public class UserCreatedEvent : BaseEvent
    {
        public Domain.Base.User User { get; }
        public UserCreatedEvent(Domain.Base.User user)
        {
            User = user;
        }
    }
}
