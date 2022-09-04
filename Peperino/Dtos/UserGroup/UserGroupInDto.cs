using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.UserGroup
{
    public class UserGroupInDto
    {
        [Required]
        public string GroupName { get; set; } = string.Empty;
    }
}
