using MediatR;

namespace Peperino.Core.Contracts.EventManagement
{
    public interface IEventable
    {
        public IReadOnlyCollection<INotification> Events { get; }
        void AddEvent(INotification notification);
        void ClearEvents();
    }
}
