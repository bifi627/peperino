using Peperino.EntityFramework.Entities.CheckList;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList.Actions
{
    public class UpdateCheckListItemAction<T>
    {
        [Required]
        public ItemVariant Variant { get; set; }

        [Required]
        public T Value { get; set; }
    }
}
