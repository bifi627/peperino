namespace Peperino.Application.CheckList.Hubs
{
    public interface ICheckListHub
    {
        IEnumerable<string> GetConnectionsForUserId(string userId);
    }
}
