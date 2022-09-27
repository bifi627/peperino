using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Peperino.Dtos.Environment;

namespace Peperino.Controllers
{
    [Authorize]
    public class EnvironmentController : ApiControllerBase
    {
        public EnvironmentController()
        {
        }

        [HttpGet]
        public ActionResult<EnvironmentOutDto> GetEnvironment()
        {
            var variables = Environment.GetEnvironmentVariables();

            if (variables is null)
            {
                return NotFound();
            }

            var dto = new EnvironmentOutDto()
            {
                RAILWAY_ENVIRONMENT = variables["RAILWAY_ENVIRONMENT"]?.ToString() ?? "",
                RAILWAY_GIT_COMMIT_SHA = variables["RAILWAY_GIT_COMMIT_SHA"]?.ToString() ?? "",
                RAILWAY_GIT_COMMIT_MESSAGE = variables["RAILWAY_GIT_COMMIT_MESSAGE"]?.ToString() ?? "",
                RAILWAY_GIT_AUTHOR = variables["RAILWAY_GIT_AUTHOR"]?.ToString() ?? "",
            };

            return dto;
        }
    }
}
