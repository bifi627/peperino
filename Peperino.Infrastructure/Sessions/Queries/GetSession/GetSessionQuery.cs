using MediatR;
using Peperino.Contracts.DbContexts;
using Peperino.Domain.Session;

namespace Peperino.Infrastructure.Sessions.Queries.GetSession
{
    public record GetSessionQuery(string SessionCookie) : IRequest<Session?>;
    public class GetSessionQueryHandler : IRequestHandler<GetSessionQuery, Session?>
    {
        private readonly ISessionDbContext _sessionDbContext;

        public GetSessionQueryHandler(ISessionDbContext sessionDbContext)
        {
            _sessionDbContext = sessionDbContext;
        }

        public Task<Session?> Handle(GetSessionQuery request, CancellationToken cancellationToken)
        {
            var session = _sessionDbContext.Sessions.FirstOrDefault(session => session.SessionCookie == request.SessionCookie);

            return Task.FromResult(session);
        }
    }
}
