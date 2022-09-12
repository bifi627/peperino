using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Dtos.Auth;
using Peperino.Infrastructure.Sessions.Commands.CreateSession;
using Peperino.Infrastructure.Sessions.Commands.DeleteSession;
using Peperino.Infrastructure.Sessions.Queries.GetSession;

namespace Peperino.Controllers
{
    public class AuthController : ApiControllerBase
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly FirebaseAuth _firebaseAuth;
        private readonly ISessionDbContext _sessionDbContext;
        private readonly IUsersDbContext _usersDbContext;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ICurrentUserService currentUserService, FirebaseAuth firebaseAuth, ISessionDbContext sessionDbContext, IUsersDbContext usersDbContext, ILogger<AuthController> logger)
        {
            _currentUserService = currentUserService;
            _firebaseAuth = firebaseAuth;
            _sessionDbContext = sessionDbContext;
            _usersDbContext = usersDbContext;
            _logger = logger;
        }

        [Authorize]
        [HttpPost("create", Name = "CreateSession")]
        public async Task<ActionResult<string>> CreateSession([FromBody] string idToken)
        {
            var expiresIn = 60 * 60 * 1000;

            var token = await _firebaseAuth.VerifyIdTokenAsync(idToken, true);
            var user = await _firebaseAuth.GetUserAsync(_currentUserService.UserId);

            _logger.LogInformation("Creating Session for User {user}", _currentUserService.UserId);

            if (token.Uid == user.Uid)
            {
                var sessionCookie = await _firebaseAuth.CreateSessionCookieAsync(idToken, new SessionCookieOptions() { ExpiresIn = TimeSpan.FromMilliseconds(expiresIn) });

                await Mediator.Send(new CreateSessionCommand(_currentUserService.UserId, sessionCookie, idToken, "WebSession"));

                _logger.LogInformation("Created Session for User {user}", _currentUserService.UserId);

                return Ok(sessionCookie);
            }

            _logger.LogError("Failed creating session for User {user}, user token does not match user id", _currentUserService.UserId);

            return BadRequest();
        }

        [HttpPost("delete", Name = "DeleteSession")]
        public async Task<ActionResult<string>> DeleteSession([FromBody] string sessionCookie)
        {
            await Mediator.Send(new DeleteSessionCommand(sessionCookie));

            return Ok();

        }

        [HttpPost("get", Name = "GetSession")]
        public async Task<ActionResult<SessionResponseDto>> GetSession([FromBody] string sessionCookie)
        {
            var response = new SessionResponseDto();

            try
            {
                var sessionTokenResponse = await _firebaseAuth.VerifySessionCookieAsync(sessionCookie, true);

                var session = await Mediator.Send(new GetSessionQuery(sessionCookie));

                if (session is not null)
                {
                    response.IdToken = session.Token;
                    response.Claims = sessionTokenResponse.Claims;
                    response.UserName = (await _usersDbContext.Users.FindAsync(sessionTokenResponse.Uid))?.UserName ?? "";
                    return response;
                }
            }
            catch (FirebaseAuthException ex)
            {
                _logger.LogError(ex, "VerifyIdToken failed");

                if (ex.AuthErrorCode == AuthErrorCode.ExpiredSessionCookie)
                {
                    response.Expired = true;
                    return response;
                }

                throw;
            }
            catch (Exception ex)
            {
                await Mediator.Send(new DeleteSessionCommand(sessionCookie));
                _logger.LogError(ex, "Failed retrieving session");
            }
            return BadRequest();
        }

        [HttpPost("info", Name = "GetTokenInfo")]
        public async Task<ActionResult<SessionResponseDto>> GetTokenInfo([FromBody] string idToken)
        {
            var response = new SessionResponseDto
            {
                IdToken = idToken,
            };

            try
            {
                var verifiedIdToken = await _firebaseAuth.VerifyIdTokenAsync(idToken);
                response.Claims = verifiedIdToken.Claims;
                response.UserName = (await _usersDbContext.Users.FindAsync(verifiedIdToken.Uid))?.UserName ?? "";
            }
            catch (FirebaseAuthException ex)
            {
                _logger.LogError(ex, "VerifyIdToken failed");

                if (ex.AuthErrorCode == AuthErrorCode.ExpiredIdToken)
                {
                    response.Expired = true;
                    return response;
                }

                throw;
            }

            return response;
        }
    }
}
