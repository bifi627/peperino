namespace Peperino.Core.Contracts
{
    public interface IUser<IUserGroup>
    {
        string UserName { get; set; }
        IList<IUserGroup> UserGroups { get; set; }
    }
}