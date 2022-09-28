using Microsoft.AspNetCore.Mvc;
using Peperino.Dtos.Environment;

namespace Peperino.Controllers
{
    public class EnvironmentController : ApiControllerBase
    {
        public EnvironmentController()
        {
        }

        [HttpGet(Name = nameof(GetEnvironment))]
        public ActionResult<EnvironmentOutDto> GetEnvironment()
        {
            var variables = Environment.GetEnvironmentVariables();

            if (variables is null)
            {
                return NotFound();
            }

            var dto = new EnvironmentOutDto()
            {
                RAILWAY_ENVIRONMENT = variables["RAILWAY_ENVIRONMENT"]?.ToString() ?? "localhost",
                RAILWAY_GIT_COMMIT_SHA = variables["RAILWAY_GIT_COMMIT_SHA"]?.ToString() ?? Guid.NewGuid().ToString(),
                RAILWAY_GIT_COMMIT_MESSAGE = variables["RAILWAY_GIT_COMMIT_MESSAGE"]?.ToString() ?? "Random commit message",
                RAILWAY_GIT_AUTHOR = variables["RAILWAY_GIT_AUTHOR"]?.ToString() ?? "me",
            };

            return dto;
        }
    }
}
