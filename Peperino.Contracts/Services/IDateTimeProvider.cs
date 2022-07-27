namespace Peperino.Contracts.Services
{
    public interface IDateTimeProvider
    {
        DateTime UtcNow { get; }
    }
}
