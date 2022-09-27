using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace Peperino.Controllers
{
    [Authorize]
    public class EnvironmentController : ApiControllerBase
    {
        public EnvironmentController()
        {
        }

        [HttpGet]
        public ActionResult<IDictionary> GetEnvironment()
        {
            var variables = Environment.GetEnvironmentVariables();
            return Ok(variables);
        }
    }
}
