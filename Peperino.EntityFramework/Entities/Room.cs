using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities
{
    public class Room : BaseOwnableEntity
    {
        public string RoomName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;

        public virtual IList<CheckList.CheckList> CheckLists { get; set; } = new List<CheckList.CheckList>();
    }
}
