using Peperino.Domain.Base;

namespace Peperino.EntityFramework.Entities
{
    public class Demo : BaseAuditableEntity
    {
        public string Value { get; set; } = "";
    }
}
