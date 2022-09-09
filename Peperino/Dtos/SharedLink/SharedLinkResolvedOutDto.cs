using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.SharedLink
{
    public class SharedLinkResolvedOutDto
    {
        [Required]
        public string EntityType { get; set; } = string.Empty;

        [Required]
        public string Slug { get; set; } = string.Empty;
    }
}
