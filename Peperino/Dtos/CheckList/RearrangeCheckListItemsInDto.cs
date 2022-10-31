using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class RearrangeCheckListItemsInDto
    {
        [Required]
        public List<ArrangeItemInDto> Items { get; set; } = new List<ArrangeItemInDto>();
    }

    public class ArrangeItemInDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int SortIndex { get; set; }
    }
}
