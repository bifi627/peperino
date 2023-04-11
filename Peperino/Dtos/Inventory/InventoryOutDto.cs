using Peperino.Dtos.CheckList;
using Peperino.Dtos.UserGroup;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.Inventory
{
    public class InventoryOutDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public RoomOutDto Room_Inventory { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Slug { get; set; } = string.Empty;

        [Required]
        public List<BaseCheckListItemOutDto> Entities { get; set; } = new List<BaseCheckListItemOutDto>();
    }
}
