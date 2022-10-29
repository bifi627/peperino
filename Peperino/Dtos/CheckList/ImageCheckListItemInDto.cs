using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class ImageCheckListItemInDto
    {
        [Required]
        public string ImageBase64 { get; set; } = string.Empty;

        [Required]
        public string Title { get; set; } = string.Empty;
    }
}
