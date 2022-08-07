using MediatR;
using Peperino.Contracts.DbContexts;

namespace Peperino.Infrastructure.Sessions.Commands.DeleteSession
{
    public record DeleteSessionCommand(string SessionCookie) : IRequest<Unit>;

    public class DeleteSessionCommandHandler : IRequestHandler<DeleteSessionCommand, Unit>
    {
        private readonly ISessionDbContext _sessionDbContext;

        public DeleteSessionCommandHandler(ISessionDbContext sessionDbContext)
        {
            _sessionDbContext = sessionDbContext;
        }

        public async Task<Unit> Handle(DeleteSessionCommand request, CancellationToken cancellationToken)
        {
            request.Deconstruct(out string sessionCookie);

            var session = _sessionDbContext.Sessions.FirstOrDefault(session => session.SessionCookie == sessionCookie);

            if (session is not null)
            {
                _sessionDbContext.Sessions.Remove(session);
                await _sessionDbContext.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}
