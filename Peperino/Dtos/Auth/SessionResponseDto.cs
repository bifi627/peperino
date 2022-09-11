namespace Peperino.Dtos.Auth
{
    public class SessionResponseDto
    {
        public string IdToken { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public IReadOnlyDictionary<string, object> Claims { get; set; } = new Dictionary<string, object>();
    }
}
