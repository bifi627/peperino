namespace Peperino.Domain.Base
{
    public abstract class BaseAuditableEntity : BaseEntity<int>
    {
        public DateTime Created { get; set; }

        public virtual User? CreatedBy { get; set; }

        public DateTime? LastModified { get; set; }

        public virtual User? LastModifiedBy { get; set; }
    }

    public static class AuditableEntityExtensions
    {
        //public static IIncludableQueryable<T, User?> WithAuditable<T>(this IQueryable<T> ownableEntity) where T : BaseAuditableEntity
        //{
        //    return ownableEntity.Include(x => x.CreatedBy).Include(x => x.LastModifiedBy);
        //}
    }
}