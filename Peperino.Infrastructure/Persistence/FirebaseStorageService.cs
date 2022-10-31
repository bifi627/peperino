using Google.Cloud.Storage.V1;
using Peperino.Contracts.Services;

namespace Peperino.Infrastructure.Persistence
{
    public class FirebaseStorageService : IFirebaseStorageService
    {
        private readonly StorageClient _storageClient;
        private const string BUCKET = "peperino-app.appspot.com";
        private const string DIR_PREFIX = "store";

        public FirebaseStorageService()
        {
            _storageClient = StorageClient.Create(FirebaseAdmin.FirebaseApp.DefaultInstance.Options.Credential);
        }

        public async Task<Guid> UploadFile(StorageScope scope, Stream stream, string contentType)
        {
            var guid = Guid.NewGuid();
            var uploadResponse = await _storageClient.UploadObjectAsync(BUCKET, GetPath(scope, guid), contentType, stream);
            return guid;
        }

        public async Task<IFirebaseDownloadResponse> DownloadFile(StorageScope scope, Guid guid)
        {
            var memoryStream = new MemoryStream();
            var result = await _storageClient.DownloadObjectAsync(BUCKET, GetPath(scope, guid), memoryStream);

            var response = new FirebaseDownloadResponse()
            {
                ResponseStream = memoryStream,
                ContentType = result.ContentType,
            };

            return response;
        }

        public async Task DeleteFile(StorageScope scope, Guid guid)
        {
            await _storageClient.DeleteObjectAsync(BUCKET, GetPath(scope, guid));
        }

        private static string GetPath(StorageScope scope, Guid guid)
        {
            return $"{DIR_PREFIX}/{scope}/{guid}";
        }
    }

    public class FirebaseDownloadResponse : IFirebaseDownloadResponse
    {
        public Stream ResponseStream { get; set; }
        public string ContentType { get; set; }
    }
}
