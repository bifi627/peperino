namespace Peperino.Core.Contracts
{
    public interface IDateTimeProvider
    {
        DateTime UtcNow { get; }
    }
}
