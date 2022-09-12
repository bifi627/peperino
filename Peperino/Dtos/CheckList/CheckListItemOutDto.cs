using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class CheckListItemOutDto
    {
        [Required]
        public int SortIndex { get; set; }

        [Required]
        public bool Checked { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;
    }
}
