namespace Peperino.Domain.Base
{
    public enum AccessLevel
    {
        None = 0,
        Read,
        WriteContent,
        Write,
        Delete,
        Owner,
    }

    public class AccessList : BaseEntity<int>
    {
        public int? ParentRelation { get; set; }
        public IList<UserAccess> UserAccess { get; set; } = new List<UserAccess>();
        public IList<GroupAccess> GroupAccess { get; set; } = new List<GroupAccess>();
    }

    public class UserAccess : BaseEntity<int>
    {
        public User User { get; set; }
        public AccessLevel AccessLevel { get; set; }
    }

    public class GroupAccess : BaseEntity<int>
    {
        public UserGroup UserGroup { get; set; } = new UserGroup();
        public AccessLevel AccessLevel { get; set; }
    }
}
