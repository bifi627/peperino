using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class TextCheckListItemInDto
    {
        [Required]
        public string Text { get; set; } = string.Empty;
    }
}
