using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities.CheckList
{
    public abstract class BaseCheckListItem : BaseAuditableEntity
    {
        public virtual CheckListItemType ItemType { get; set; }
        public int SortIndex { get; set; }
        public bool Checked { get; set; }
        public virtual CheckList CheckList { get; set; }
    }

    public class CheckListItemBuilder
    {
        public static void UpdateStringItem(BaseCheckListItem item, string value)
        {
            switch (item)
            {
                case TextCheckListItem textItem:
                    textItem.Text = value;
                    break;
                case LinkCheckListItem linkItem:
                    linkItem.Link = value;
                    break;
                case ImageCheckListItem imageItem:
                    imageItem.ImageLink = value;
                    break;
                default:
                    throw new ArgumentException($"Unknown item type {item.GetType()}");
            }
        }

        public static BaseCheckListItem CreateStringItem(string value, CheckListItemType itemType)
        {
            BaseCheckListItem baseCheckListItem;

            switch (itemType.Variant)
            {
                case ItemVariant.Text:
                    var textCheckListItem = new TextCheckListItem
                    {
                        Text = value
                    };
                    baseCheckListItem = textCheckListItem;
                    break;
                case ItemVariant.Link:
                    var linkCheckListItem = new LinkCheckListItem
                    {
                        Link = value
                    };
                    baseCheckListItem = linkCheckListItem;
                    break;
                case ItemVariant.Image:
                    var imageCheckListItem = new ImageCheckListItem
                    {
                        ImageLink = value
                    };
                    baseCheckListItem = imageCheckListItem;
                    break;
                default:
                    throw new ArgumentException($"Unknown item variant {itemType.Variant}");
            }

            baseCheckListItem.SortIndex = 0;
            baseCheckListItem.ItemType = itemType;
            return baseCheckListItem;
        }
    }
}
