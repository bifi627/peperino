namespace Peperino.Contracts.Services
{
    public enum StorageScope
    {
        CheckListStorage,
    }

    public interface IFirebaseStorageService
    {
        Task DeleteFile(StorageScope scope, Guid guid);
        Task<IFirebaseDownloadResponse> DownloadFile(StorageScope scope, Guid guid);
        Task<Guid> UploadFile(StorageScope scope, Stream stream, string contentType);
    }

    public interface IFirebaseDownloadResponse
    {
        public Stream ResponseStream { get; }
        public string ContentType { get; }
    }
}
