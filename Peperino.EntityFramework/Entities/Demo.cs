using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities
{
    public class Demo : BaseOwnableEntity
    {
        public string Value { get; set; } = "";
    }
}
