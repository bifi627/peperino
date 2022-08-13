using Peperino.Contracts.Services;

namespace Peperino.Infrastructure.Services
{
    public class CustomClaimService : ICustomClaimService
    {
        private readonly FirebaseAdmin.Auth.FirebaseAuth _firebaseAuth;

        public CustomClaimService(FirebaseAdmin.Auth.FirebaseAuth firebaseAuth)
        {
            _firebaseAuth = firebaseAuth;
        }

        public async Task AddClaim(string firebaseUserId, string claimsType, string value)
        {
            var claims = new Dictionary<string, object>()
            {
                { claimsType, value },
            };
            await _firebaseAuth.SetCustomUserClaimsAsync(firebaseUserId, claims);
        }

        public async Task<bool> CheckClaim(string idToken, string claimsType, string value)
        {
            var token = await _firebaseAuth.VerifyIdTokenAsync(idToken);

            if (token.Claims.TryGetValue(claimsType, out object? v) && v is string actualValue)
            {
                return actualValue.Equals(value);
            }

            return false;
        }
    }
}
