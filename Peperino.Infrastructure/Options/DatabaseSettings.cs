namespace Peperino.Infrastructure.Options
{
    public class DatabaseSettings
    {
        public const string SECTION_NAME = "DatabaseSettings";
        public string ConnectionString { get; set; } = "";
    }
}
