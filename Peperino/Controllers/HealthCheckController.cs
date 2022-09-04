

using Microsoft.AspNetCore.Mvc;

namespace Peperino.Controllers
{
    public class HealthCheckController : ApiControllerBase
    {
        [HttpGet]
        public ActionResult<bool> Get()
        {
            return true;
        }
    }
}
