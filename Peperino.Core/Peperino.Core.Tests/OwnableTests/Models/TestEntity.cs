using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Core.Tests.AccessControl.Models
{
    internal class TestEntity : BaseOwnableEntity
    {
        public int Value { get; set; }
    }
}
