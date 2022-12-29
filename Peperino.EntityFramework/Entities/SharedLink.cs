using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities
{
    public enum LinkType
    {
        Permanent,
        Single,
    }

    public class SharedLink : BaseAuditableEntity
    {
        public LinkType LinkType { get; set; }
        public TimeSpan Duration { get; set; } = TimeSpan.Zero;
        public AccessLevel GrantAccessLevel { get; set; }
        public virtual BaseOwnableEntity Entity { get; set; }
        public string Slug { get; set; }
    }
}
