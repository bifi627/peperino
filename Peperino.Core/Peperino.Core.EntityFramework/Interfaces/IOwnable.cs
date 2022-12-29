using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Core.EntityFramework.Interfaces
{
    public interface IOwnable : IAuditable
    {
        IList<UserAccess> UserAccess { get; set; }
        IList<GroupAccess> GroupAccess { get; set; }
    }
}
