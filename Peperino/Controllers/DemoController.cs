using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.EntityFramework;
using Peperino.EntityFramework.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Peperino.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemoController : ApiControllerBase
    {
        private readonly IApplicationDbContext dbContext;

        public DemoController(IApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/<DemoController>
        [HttpGet]
        public IEnumerable<Demo> Get()
        {
            return dbContext.Demos.Include(f => f.CreatedBy).Include(f => f.LastModifiedBy);
        }

        // POST api/<DemoController>
        [HttpPost]
        public async Task Post()
        {
            var demo = new Demo
            {
                Value = "TEST"
            };

            await dbContext.Demos.AddAsync(demo);
            await dbContext.SaveChangesAsync(CancellationToken.None);
        }

        [HttpDelete]
        public async Task Delete()
        {
            await dbContext.Database.ExecuteSqlRawAsync($"DELETE from public.\"Demos\"");
        }
    }
}
