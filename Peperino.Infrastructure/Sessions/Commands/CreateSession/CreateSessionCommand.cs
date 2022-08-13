﻿using MediatR;
using Peperino.Contracts.DbContexts;
using Peperino.Domain.Session;

namespace Peperino.Infrastructure.Sessions.Commands.CreateSession
{
    public record CreateSessionCommand(string FirebaseUserId, string SessionCookie, string Token, string SessionName) : IRequest<Unit>;
    public class CreateSessionCommandHandler : IRequestHandler<CreateSessionCommand, Unit>
    {
        private readonly ISessionDbContext _sessionDbContext;
        private readonly IUsersDbContext _usersDbContext;

        public CreateSessionCommandHandler(ISessionDbContext sessionDbContext, IUsersDbContext usersDbContext)
        {
            _sessionDbContext = sessionDbContext;
            _usersDbContext = usersDbContext;
        }

        public async Task<Unit> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
        {
            request.Deconstruct(out string externalId, out string sessionCookie, out string token, out string sessionName);

            // Get first existing session
            var existingSession = _sessionDbContext.Sessions.FirstOrDefault(session => session.User.ExternalId == externalId && session.SessionName == sessionName);

            if (existingSession is not null)
            {
                // Update first existing session
                existingSession.SessionCookie = sessionCookie;
                existingSession.SessionName = sessionName;
                existingSession.Token = token;
                _sessionDbContext.Sessions.Update(existingSession);

                // Remove other duplicate sessions
                _sessionDbContext.Sessions.RemoveRange(_sessionDbContext.Sessions.Where(session => session.User.ExternalId == externalId && session.SessionName == sessionName && session.Id != existingSession.Id));
            }
            else
            {
                var user = _usersDbContext.Users.FirstOrDefault(user => user.ExternalId == externalId);

                // Create new session for user if user exists
                if (user is not null)
                {
                    var newSession = new Session(user, token, sessionCookie, sessionName);
                    await _sessionDbContext.Sessions.AddAsync(newSession, cancellationToken);
                }
            }

            await _sessionDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}