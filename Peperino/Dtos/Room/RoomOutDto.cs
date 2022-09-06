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
        public string RoomName { get; set; } = string.Empty;

        [Required]
        public string Slug { get; set; } = string.Empty;

        [Required]
        public UserOutDto CreatedBy { get; set; }
    }
}
