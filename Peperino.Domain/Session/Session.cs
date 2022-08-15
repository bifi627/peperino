using Peperino.Domain.Base;

namespace Peperino.Domain.Session
{
    public class Session : BaseEntity<int>
    {
        public string SessionCookie { get; set; } = "";
        public string SessionName { get; set; } = "";
        public string Token { get; set; } = "";
        public User User { get; set; }

        public Session()
        {
        }

        public Session(User user)
        {
            User = user;
        }

        public Session(User user, string sessionCookie, string token, string sessionName)
        {
            User = user;
            SessionCookie = sessionCookie;
            Token = token;
            SessionName = sessionName;
        }
    }
}
