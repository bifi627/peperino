using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities
{
    public class UserStore : BaseEntity<int>
    {
        public User User { get; set; }
        public string Theme { get; set; } = "Dark";
    }
}
