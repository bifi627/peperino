namespace Peperino.EntityFramework.Entities.CheckList
{
    public class TextCheckListItem : BaseCheckListItem
    {
        public override ItemType ItemType => ItemType.Text;
        public string Text { get; set; } = string.Empty;
    }
}
