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

    public class UserAccess : BaseEntity<int>
    {
        public virtual User User { get; set; }
        public AccessLevel AccessLevel { get; set; }
        public virtual List<BaseOwnableEntity> Entities { get; set; } = new List<BaseOwnableEntity>();
    }

    public class GroupAccess : BaseEntity<int>
    {
        public virtual UserGroup UserGroup { get; set; } = new UserGroup();
        public AccessLevel AccessLevel { get; set; }
        public virtual List<BaseOwnableEntity> Entities { get; set; } = new List<BaseOwnableEntity>();
    }
}
