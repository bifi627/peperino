using Peperino.EntityFramework.Entities.CheckList;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class CheckListItemTypeOutDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public ItemVariant Variant { get; set; } = ItemVariant.Text;
    }
}
