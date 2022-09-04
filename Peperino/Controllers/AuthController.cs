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

        public AuthController(ICurrentUserService currentUserService, FirebaseAuth firebaseAuth, ISessionDbContext sessionDbContext, IUsersDbContext usersDbContext)
        {
            _currentUserService = currentUserService;
            _firebaseAuth = firebaseAuth;
            _sessionDbContext = sessionDbContext;
            _usersDbContext = usersDbContext;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<string>> CreateSession([FromBody] string idToken)
        {
            var expiresIn = 5 * 60 * 1000;

            var token = await _firebaseAuth.VerifyIdTokenAsync(idToken, true);
            var user = await _firebaseAuth.GetUserAsync(_currentUserService.UserId);

            if (token.Uid == user.Uid)
            {
                var sessionCookie = await _firebaseAuth.CreateSessionCookieAsync(idToken, new SessionCookieOptions() { ExpiresIn = TimeSpan.FromMilliseconds(expiresIn) });

                await Mediator.Send(new CreateSessionCommand(_currentUserService.UserId, sessionCookie, idToken, "WebSession"));

                return Ok(sessionCookie);
            }

            return BadRequest();
        }

        [HttpPost("delete")]
        public async Task<ActionResult<string>> DeleteSession([FromBody] string sessionCookie)
        {
            await Mediator.Send(new DeleteSessionCommand(sessionCookie));

            return Ok();

        }

        [HttpPost("get")]
        public async Task<ActionResult<SessionResponseDto>> GetSession([FromBody] string sessionCookie)
        {
            try
            {
                var sessionTokenResponse = await _firebaseAuth.VerifySessionCookieAsync(sessionCookie, true);

                var session = await Mediator.Send(new GetSessionQuery(sessionCookie));

                if (session is not null)
                {
                    var response = new SessionResponseDto
                    {
                        IdToken = session.Token,
                        Claims = sessionTokenResponse.Claims,
                        UserName = (await _usersDbContext.Users.FindAsync(sessionTokenResponse.Uid))?.UserName ?? "",
                    };
                    return response;
                }
            }
            catch (Exception ex)
            {
                await Mediator.Send(new DeleteSessionCommand(sessionCookie));
            }
            return BadRequest();
        }
    }
}
