namespace Peperino.Core.Contracts
{
    public interface IUserGroup<IUser>
    {
        string GroupName { get; set; }
        List<IUser> Users { get; set; }
    }
}