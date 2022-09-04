using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.UserGroup
{
    public class UserGroupOutDto
    {
        [Required]
        public string GroupName { get; set; } = string.Empty;

        [Required]
        public string GroupNameSlug { get; set; } = string.Empty;
    }
}
