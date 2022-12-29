using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Core.EntityFramework.Interfaces
{
    public interface IAuditable
    {
        DateTime Created { get; set; }

        User? CreatedBy { get; set; }

        DateTime? LastModified { get; set; }

        User? LastModifiedBy { get; set; }
    }
}
