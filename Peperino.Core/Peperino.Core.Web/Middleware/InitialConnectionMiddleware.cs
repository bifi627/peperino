using Microsoft.AspNetCore.Http;
using Peperino.Core.Contracts;
using Peperino.Core.Contracts.ConnectionManagement;

namespace Peperino.Core.Web.Middleware
{
    public sealed class InitialConnectionMiddleware : IMiddleware
    {
        private static readonly HashSet<string> _checkedConnections = new();
        private readonly ICurrentUserService _currentUserService;
        private readonly IInitialConnectionService _initialConnectionService;

        public InitialConnectionMiddleware(ICurrentUserService currentUserService, IInitialConnectionService initialConnectionService)
        {
            _currentUserService = currentUserService;
            _initialConnectionService = initialConnectionService;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (_currentUserService.UserId != "0" && !_checkedConnections.Contains(_currentUserService.UserId))
            {
                await _initialConnectionService.HandleInitialConnection();

                _checkedConnections.Add(_currentUserService.UserId);
            }

            await next(context);
        }
    }
}
