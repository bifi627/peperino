using Peperino.Core.Contracts;

namespace Peperino.Core.EntityFramework.Entities
{
    public class UserGroup : BaseAuditableEntity, IUserGroup<User>
    {
        public string GroupName { get; set; } = string.Empty;
        public virtual IList<User> Users { get; set; } = new List<User>();
    }
}
