using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities.CheckList
{
    public class CheckList : BaseEntityList<BaseCheckListItem>
    {
        public virtual Room Room { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
    }
}
