using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;
using Peperino.EntityFramework.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Peperino.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DemoController : ApiControllerBase
    {
        private readonly IApplicationDbContext _dbContext;

        public DemoController(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/<DemoController>
        [HttpGet]
        public IEnumerable<Demo> Get()
        {
            var demos = _dbContext.Demos;

            return demos.FilterRequireRead(CurrentUser);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Demo>> GetById(int id)
        {
            var demo = await _dbContext.Demos.Include(f => f.CreatedBy).Include(f => f.LastModifiedBy).Include(f => f.UserAccess).Include(f => f.GroupAccess).FirstOrDefaultAsync(demo => demo.Id == id);
            if (demo is not null)
            {
                demo.RequireAccess(CurrentUser, AccessLevel.Read);
                return demo;
            }

            return BadRequest();
        }

        // POST api/<DemoController>
        [HttpPost]
        public async Task Post()
        {
            var demo = new Demo
            {
                Value = "TEST"
            };

            await _dbContext.Demos.AddAsync(demo);
            await _dbContext.SaveChangesAsync(CancellationToken.None);
        }

        [HttpDelete]
        public async Task Delete()
        {
            await _dbContext.Database.ExecuteSqlRawAsync($"DELETE from public.\"Demos\"");
        }
    }
}
