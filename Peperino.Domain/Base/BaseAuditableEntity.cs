using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Peperino.Domain.Base
{
    public abstract class BaseAuditableEntity : BaseEntity<int>
    {
        public DateTime Created { get; set; }

        public User? CreatedBy { get; set; }

        public DateTime? LastModified { get; set; }

        public User? LastModifiedBy { get; set; }
    }

    public static class AuditableEntityExtensions
    {
        public static IIncludableQueryable<T, User?> WithAuditable<T>(this IQueryable<T> ownableEntity) where T : BaseAuditableEntity
        {
            return ownableEntity.Include(x => x.CreatedBy).Include(x => x.LastModifiedBy);
        }
    }
}