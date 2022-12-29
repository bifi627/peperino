using Peperino.Core.EntityFramework.Entities;
using Peperino.Dtos.User;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.UserGroup
{
    public enum MemberType
    {
        Admin,
        Member,
    }

    public class RoomOutDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string RoomName { get; set; } = string.Empty;

        [Required]
        public string Slug { get; set; } = string.Empty;

        [Required]
        public UserOutDto CreatedBy { get; set; }

        [Required]
        public AccessLevel AccessLevel { get; set; }

        [Required]
        public List<CheckList.CheckListOutDto> CheckLists { get; set; } = new();
    }
}
