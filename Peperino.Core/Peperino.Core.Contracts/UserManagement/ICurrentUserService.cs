namespace Peperino.Core.Contracts
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        bool IsKnownPeperinoUser { get; }
    }
}
