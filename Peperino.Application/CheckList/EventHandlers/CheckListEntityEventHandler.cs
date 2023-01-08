using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Peperino.Contracts.Services.CheckList;
using Peperino.Core.Contracts;
using Peperino.Core.Contracts.EventManagement;
using Peperino.Core.EntityFramework.Interceptors;
using Peperino.EntityFramework;
using Peperino.EntityFramework.Entities.CheckList;

namespace Peperino.Application.CheckList.EventHandlers
{
    public class CheckListEntityEventHandler : BaseEntityEventHandler
    {
        private readonly ILogger<CheckListEntityEventHandler> _logger;
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;
        private readonly ICheckListNotificationService<Core.EntityFramework.Entities.User> _checkListNotificationService;

        public CheckListEntityEventHandler(
            ILogger<CheckListEntityEventHandler> logger,
            IApplicationDbContext dbContext,
            ICurrentUserService currentUserService,
            ICheckListNotificationService<Core.EntityFramework.Entities.User> checkListNotificationService)
        {
            _logger = logger;
            _dbContext = dbContext;
            _currentUserService = currentUserService;
            _checkListNotificationService = checkListNotificationService;
        }

        public override Task<bool> CanHandle(IEventable eventable)
        {
            return Task.FromResult(eventable is BaseCheckListItem);
        }

        public override async Task OnUpdated(IEventable entity)
        {
            await base.OnUpdated(entity);

            if (entity is BaseCheckListItem checkListItem)
            {
                await NotifyDirect(checkListItem);
            }
        }

        public override async Task OnCreated(IEventable entity)
        {
            await base.OnCreated(entity);

            if (entity is BaseCheckListItem checkListItem)
            {
                await NotifyDirect(checkListItem);
            }
        }

        private async Task NotifyDirect(BaseCheckListItem entity)
        {
            var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId);
            var slug = entity.CheckList.Slug;

            if (currentUser is null)
            {
                throw new Exception("CurrentUser is null");
            }

            await _checkListNotificationService.SendCheckListUpdatedNotification(slug, currentUser);
        }

        public override async Task OnDeleted(IEventable entity)
        {
            await base.OnDeleted(entity);

            if (entity is BaseCheckListItem checkListItem)
            {
                var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId);

                if (currentUser is null)
                {
                    throw new Exception("CurrentUser is null");
                }

                // Deleted entities are already removed from the list and must be manually found
                var checkListsToNotify = new List<EntityFramework.Entities.CheckList.CheckList>();

                checkListsToNotify.AddRange(_dbContext.CheckLists.Include(c => c.Entities).Where(e => e.Entities.Any(i => i.Id == checkListItem.Id)));

                foreach (var checkList in checkListsToNotify)
                {
                    await _checkListNotificationService.SendCheckListUpdatedNotification(checkList.Slug, currentUser);
                }
            }
        }
    }
}
