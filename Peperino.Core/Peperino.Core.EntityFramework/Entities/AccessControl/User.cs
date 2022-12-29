using Peperino.Core.Contracts;

namespace Peperino.Core.EntityFramework.Entities
{
    public class User : BaseEntity<string>, IUser<UserGroup>
    {
        public string UserName { get; set; } = string.Empty;
        public virtual IList<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
    }
}
