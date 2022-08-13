namespace Peperino.Contracts.Services
{
    public interface ICurrentUserService
    {
        string FirebaseUserId { get; }
        bool IsKnownPeperinoUser { get; }
    }
}
