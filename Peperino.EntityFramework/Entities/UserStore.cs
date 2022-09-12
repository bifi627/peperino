using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities
{
    public class UserStoreClient : BaseEntity<string>
    {
        public virtual User User { get; set; }
        public Dictionary<string, string> KeyValueStorage = new();

        public UserStoreClient()
        {
            KeyValueStorage.Add("Theme", "dark");
        }
    }
}
