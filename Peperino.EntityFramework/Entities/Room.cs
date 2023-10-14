using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities
{
    public class Room : BaseOwnableEntity
    {
        public string RoomName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;

        public virtual ICollection<CheckList.CheckList> CheckLists { get; set; } = new List<CheckList.CheckList>();
        public virtual ICollection<CheckList.CheckList> Inventories { get; set; } = new List<CheckList.CheckList>();
    }
}
