namespace Peperino.Infrastructure.Options
{
    public class CorsSettings
    {
        public const string SECTION_NAME = "CorsSettings";
        public string FrontendUrlsJson { get; set; } = string.Empty;
    }
}
