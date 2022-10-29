namespace Peperino.EntityFramework.Entities.CheckList
{
    public class ImageCheckListItem : BaseCheckListItem
    {
        public string Title { get; set; } = string.Empty;
        public Guid ImageReference { get; set; }
    }
}
