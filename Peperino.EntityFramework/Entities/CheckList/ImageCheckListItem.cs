namespace Peperino.EntityFramework.Entities.CheckList
{
    public class ImageCheckListItem : BaseCheckListItem
    {
        public override ItemType ItemType => ItemType.Image;
        public string Reference { get; set; } = string.Empty;
    }
}
