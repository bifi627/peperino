using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class AddCheckListItem
    {
        [Required]
        public string Text { get; set; } = string.Empty;
    }
}
