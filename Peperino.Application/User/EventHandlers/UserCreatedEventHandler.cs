using MediatR;
using Microsoft.Extensions.Logging;
using Peperino.Application.User.Events;
using Peperino.Contracts.Services;

namespace Peperino.Application.User.EventHandlers
{
    public class UserCreatedEventHandler : INotificationHandler<UserCreatedEvent>
    {
        private readonly ILogger<UserCreatedEventHandler> _logger;
        private readonly ICustomClaimService _customClaimService;

        public UserCreatedEventHandler(ILogger<UserCreatedEventHandler> logger, ICustomClaimService customClaimService)
        {
            _logger = logger;
            _customClaimService = customClaimService;
        }

        public async Task Handle(UserCreatedEvent notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Sample Domain Event: {DomainEvent}", notification.GetType().Name);

            //await _customClaimService.AddClaim(notification.User.Id, CustomClaimsTypes.IS_PEPERINO_USER, "true");
        }
    }
}
