namespace Peperino.EntityFramework.Entities.CheckList
{
    public class LinkCheckListItem : BaseCheckListItem
    {
        public override ItemType ItemType => ItemType.Link;
        public string Link { get; set; } = string.Empty;
    }
}
