namespace Peperino.Infrastructure.Options
{
    internal class FirebaseSettings
    {
        public const string SECTION_NAME = "FirebaseSettings";
        public string ValidIssuer { get; set; } = "";
        public string ValidAudience { get; set; } = "";
        public string AccessJson { get; set; } = "";
    }
}
