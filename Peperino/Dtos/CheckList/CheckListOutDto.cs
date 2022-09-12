using Peperino.Dtos.UserGroup;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class CheckListOutDto
    {
        [Required]
        public RoomOutDto Room { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Slug { get; set; } = string.Empty;

        [Required]
        public List<CheckListItemOutDto> Entities { get; set; } = new List<CheckListItemOutDto>();
    }
}
