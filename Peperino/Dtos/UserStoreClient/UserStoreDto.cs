using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.UserStoreClient
{
    public class UserStoreDto
    {
        [Required]
        public Dictionary<string, string> KeyValueStorage { get; set; } = new();
    }
}
