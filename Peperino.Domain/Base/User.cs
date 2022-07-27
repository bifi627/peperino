namespace Peperino.Domain.Base
{
    public class User : BaseEntity
    {
        public string ExternalId { get; set; } = "";
        public string UserName { get; set; } = "";
    }
}
