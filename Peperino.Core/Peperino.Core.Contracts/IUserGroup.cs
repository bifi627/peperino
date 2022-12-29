namespace Peperino.Core.Contracts
{
    public interface IUserGroup<IUser>
    {
        string GroupName { get; set; }
        IList<IUser> Users { get; set; }
    }
}