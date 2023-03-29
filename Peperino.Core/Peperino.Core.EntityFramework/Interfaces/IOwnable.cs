using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Core.EntityFramework.Interfaces
{
    public interface IOwnable : IAuditable
    {
        // Must be strongly typed as list because this is used by entity framework
        List<UserAccess> UserAccess { get; set; }
        List<GroupAccess> GroupAccess { get; set; }
    }
}
