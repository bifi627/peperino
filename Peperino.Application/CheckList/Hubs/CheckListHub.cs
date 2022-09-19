using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Peperino.Application.CheckList.Hubs;

namespace Peperino.Application.CheckList
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CheckListHub : Hub, ICheckListHub
    {
        private readonly static Dictionary<string, List<string>> _userConnections = new();

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();

            if (Context.UserIdentifier is null)
            {
                throw new Exception("UserIdentifier is null");
            }

            if (_userConnections.TryGetValue(Context.UserIdentifier, out List<string>? connections))
            {
                connections.Add(Context.ConnectionId);
            }
            else
            {
                _userConnections.Add(Context.UserIdentifier, new List<string> { Context.ConnectionId });
            }

            await Clients.Client(Context.ConnectionId).SendAsync("connected");
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (Context.UserIdentifier is not null)
            {
                _userConnections.Remove(Context.UserIdentifier);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public Task JoinList(string listSlug)
        {
            var task = Groups.AddToGroupAsync(Context.ConnectionId, listSlug);
            Clients.Client(Context.ConnectionId).SendAsync("ListJoined");
            return task;
        }

        public Task LeaveList(string listSlug)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, listSlug);
        }

        public IEnumerable<string> GetConnectionsForUserId(string userId)
        {
            if (_userConnections.TryGetValue(userId, out List<string>? connections))
            {
                return connections;
            }

            return new List<string>();
        }
    }
}
