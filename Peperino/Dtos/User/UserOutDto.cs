using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.User
{
    public class UserOutDto
    {
        [Required]
        public string Id { get; set; } = string.Empty;

        [Required]
        public string UserName { get; set; } = string.Empty;
    }
}
