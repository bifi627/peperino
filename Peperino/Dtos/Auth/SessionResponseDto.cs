using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.Auth
{
    public class SessionResponseDto
    {
        [Required]
        public string IdToken { get; set; } = string.Empty;

        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public bool Expired { get; set; } = false;

        [Required]
        public IReadOnlyDictionary<string, object> Claims { get; set; } = new Dictionary<string, object>();
    }
}
