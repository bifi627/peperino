using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class LinkCheckListItemInDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Link { get; set; } = string.Empty;
    }
}
