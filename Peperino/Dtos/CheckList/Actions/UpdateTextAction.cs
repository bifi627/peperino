using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList.Actions
{
    public class UpdateTextAction
    {
        [Required]
        public string Text { get; set; } = string.Empty;
    }
}
