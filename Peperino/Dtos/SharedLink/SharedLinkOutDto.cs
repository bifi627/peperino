using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.SharedLink
{
    public class SharedLinkOutDto
    {
        [Required]
        public string Slug { get; set; } = string.Empty;
    }
}
