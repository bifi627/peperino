using Peperino.Core.EntityFramework.Entities;

namespace Peperino.EntityFramework.Entities
{
    public class Demo : BaseOwnableEntity
    {
        public string Value { get; set; } = "";
    }
}
