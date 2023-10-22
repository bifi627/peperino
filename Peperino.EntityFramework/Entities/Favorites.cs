using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities
{
    public class Favorites : BaseEntity<int>
    {
        public virtual User User { get; set; }
        public virtual IList<CheckList.CheckList> CheckLists { get; set; } = new List<CheckList.CheckList>();
    }
}
