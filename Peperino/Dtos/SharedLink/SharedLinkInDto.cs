using Peperino.Domain.Base;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.SharedLink
{
    public class SharedLinkInDto
    {
        [Required]
        public AccessLevel GrantAccessLevel { get; set; } = AccessLevel.Read;
        [Required]
        public string EntityType { get; set; } = string.Empty;
        [Required]
        public string Slug { get; set; } = string.Empty;
    }
}
