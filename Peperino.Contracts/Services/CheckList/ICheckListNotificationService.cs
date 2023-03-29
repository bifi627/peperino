namespace Peperino.Contracts.Services.CheckList
{
    // TODO: Build basic notification service for base entity without depending on user...
    // Are these domain events???
    public interface ICheckListNotificationService<IUser>
    {
        Task SendCheckListUpdatedNotification(string checkListSlug, IUser sender);
    }
}
