using Microsoft.AspNetCore.SignalR;
using Peperino.Application.CheckList.Hubs;
using Peperino.Contracts.Services.CheckList;

namespace Peperino.Application.CheckList.Services
{
    public class CheckListNotificationService : ICheckListNotificationService
    {
        private readonly IHubContext<CheckListHub> _checkListHub;
        private readonly ICheckListHub _checkListHub2;

        public CheckListNotificationService(IHubContext<CheckListHub> checkListHub, ICheckListHub checkListHub2)
        {
            _checkListHub = checkListHub;
            _checkListHub2 = checkListHub2;
        }
        public Task SendCheckListUpdatedNotification(string checkListSlug, Domain.Base.User sender)
        {
            var connectionId = _checkListHub2.GetConnectionsForUserId(sender.Id);
            return _checkListHub.Clients.GroupExcept(checkListSlug, connectionId).SendAsync("Update");
        }
    }
}
