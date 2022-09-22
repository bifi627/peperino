

using Microsoft.AspNetCore.Mvc;

namespace Peperino.Controllers
{
    public class HealthCheckController : ApiControllerBase
    {
        [HttpGet]
        public ActionResult<int> Get()
        {
            return DbContext.Users.Count();
        }
    }
}
