using Peperino.Core.EntityFramework.Entities;
using Peperino.Dtos.UserGroup;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.CheckList
{
    public class CheckListOutDto
    {
        [Required]
        public int Id { get; set; }

        public RoomOutDto? Room { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Slug { get; set; } = string.Empty;

        [Required]
        public List<BaseCheckListItemOutDto> Entities { get; set; } = new List<BaseCheckListItemOutDto>();

        [Required]
        public AccessLevel AccessLevel { get; set; }

        [Required]
        public bool IsFavorite { get; set; }
    }
}
