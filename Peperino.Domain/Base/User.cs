namespace Peperino.Domain.Base
{
    public class User : BaseEntity<string>
    {
        public string UserName { get; set; } = string.Empty;
        public IList<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
    }

    public class UserGroup : BaseAuditableEntity
    {
        public string GroupName { get; set; } = string.Empty;
        public string GroupNameSlug { get; set; } = string.Empty;
        public IList<User> Users { get; set; } = new List<User>();
    }
}
