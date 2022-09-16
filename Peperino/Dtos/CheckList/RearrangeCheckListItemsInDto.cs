using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class RearrangeCheckListItemsInDto
    {
        [Required]
        public List<CheckListItemOutDto> Items { get; set; } = new List<CheckListItemOutDto>();
    }
}
