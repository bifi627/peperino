using System.ComponentModel.DataAnnotations;

namespace Peperino.Dtos.Environment
{
    public class EnvironmentOutDto
    {
        [Required]
        public string RAILWAY_ENVIRONMENT { get; set; } = "";

        [Required]
        public string RAILWAY_GIT_COMMIT_SHA { get; set; } = "";

        [Required]
        public string RAILWAY_GIT_COMMIT_MESSAGE { get; set; } = "";

        [Required]
        public string RAILWAY_GIT_AUTHOR { get; set; } = "";

    }
}
