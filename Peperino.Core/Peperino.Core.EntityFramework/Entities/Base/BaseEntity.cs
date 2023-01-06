using MediatR;
using Peperino.Core.Contracts.EventManagement;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Peperino.Core.EntityFramework.Entities
{
    public class BaseEntity : BaseEntity<int> { }
    public class BaseEntity<KeyType> : IEventable
    {
        [Key]
        public KeyType Id { get; set; }

        private readonly List<INotification> _events = new();

        [NotMapped]
        public IReadOnlyCollection<INotification> Events => _events.AsReadOnly();

        public void AddEvent(INotification notification)
        {
            _events.Add(notification);
        }

        public void RemoveDomainEvent(BaseEvent domainEvent)
        {
            _events.Remove(domainEvent);
        }

        public void ClearEvents()
        {
            _events.Clear();
        }
    }
}
