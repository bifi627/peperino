namespace Peperino.Contracts.Services.CheckList
{
    public interface ICheckListNotificationService
    {
        Task SendCheckListUpdatedNotification(string checkListSlug, Domain.Base.User sender);
    }
}
