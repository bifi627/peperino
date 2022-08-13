namespace Peperino.Contracts.Services
{
    public interface ICustomClaimService
    {
        Task AddClaim(string firebaseUserId, string claimsType, string value);
        Task<bool> CheckClaim(string idToken, string claimsType, string value);
    }
}