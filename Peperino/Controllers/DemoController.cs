using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;
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
        private readonly ICurrentUserService _currentUserService;

        public DemoController(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        // GET: api/<DemoController>
        [HttpGet]
        public IEnumerable<Demo> Get()
        {
            var demos = _dbContext.Demos.WithOwnable().WithAuditable();

            return demos.FilterRequireRead(CurrentUser);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Demo>> GetById(int id)
        {
            var demo = await _dbContext.Demos.Include(f => f.CreatedBy).Include(f => f.LastModifiedBy).Include(f => f.Access.UserAccess).Include(f => f.Access.GroupAccess).FirstOrDefaultAsync(demo => demo.Id == id);
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
