using Microsoft.AspNetCore.Mvc;
using Peperino.Contracts.Services;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Controllers
{
    public class ImageStoreController : ApiControllerBase
    {
        private readonly IFirebaseStorageService _firebaseStorageService;

        public ImageStoreController(IFirebaseStorageService firebaseStorageService)
        {
            _firebaseStorageService = firebaseStorageService;
        }

        [HttpGet("{contextId}/{guid}", Name = nameof(Get))]
        public async Task<IActionResult> Get([Required] int contextId, [Required] Guid guid)
        {
            //var entry = await DbContext.BaseOwnableEntity.FirstOrDefaultAsync(i => i.Id == contextId);

            //if (entry == null)
            //{
            //    return NotFound();
            //}

            var response = await _firebaseStorageService.DownloadFile(StorageScope.CheckListStorage, guid);

            response.ResponseStream.Seek(0, SeekOrigin.Begin);

            return File(response.ResponseStream, response.ContentType);
        }
    }
}
