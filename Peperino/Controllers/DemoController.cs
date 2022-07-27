using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.EntityFramework;
using Peperino.EntityFramework.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Peperino.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemoController : ControllerBase
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
            return this.dbContext.Demos.Include(f => f.CreatedBy).Include(f => f.LastModifiedBy);
        }

        // POST api/<DemoController>
        [HttpPost]
        public async Task Post()
        {
            var demo = new Demo();
            demo.Value = "TEST";
            await this.dbContext.Demos.AddAsync(demo);
            await this.dbContext.SaveChangesAsync(CancellationToken.None);
        }
    }
}
