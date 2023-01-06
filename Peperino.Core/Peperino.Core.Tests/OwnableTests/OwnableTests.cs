using Peperino.Core.EntityFramework.Entities;

namespace Peperino.Core.Tests.AccessControl
{
    public class OwnableTests
    {
        [Fact]
        public void RequireAccess_UserAccess_Success()
        {
            var user1 = new User
            {
                Id = "User1",
                UserName = "Username1"
            };
            var user2 = new User
            {
                Id = "User2",
                UserName = "Username2"
            };

            var entity = new TestEntity();
            entity.OverwriteOwner(user1);

            var level = entity.CalculateAccessLevel(user1);
            Assert.Equal(AccessLevel.Owner, level);

            level = entity.CalculateAccessLevel(user2);
            Assert.Equal(AccessLevel.None, level);

            Assert.False(entity.RequireAccess(user1, AccessLevel.None, false));
            Assert.True(entity.RequireAccess(user2, AccessLevel.None, false));

            Assert.True(entity.RequireAccess(user1, AccessLevel.Owner, false));
            Assert.True(entity.RequireAccess(user1, AccessLevel.Delete, false));
            Assert.True(entity.RequireAccess(user1, AccessLevel.Write, false));
            Assert.True(entity.RequireAccess(user1, AccessLevel.WriteContent, false));
            Assert.True(entity.RequireAccess(user1, AccessLevel.Read, false));

            Assert.False(entity.RequireAccess(user2, AccessLevel.Owner, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.Delete, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.Write, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.WriteContent, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.Read, false));

            entity.AddUserAccess(user2, AccessLevel.Read);

            level = entity.CalculateAccessLevel(user2);
            Assert.Equal(AccessLevel.Read, level);

            Assert.False(entity.RequireAccess(user2, AccessLevel.Owner, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.Delete, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.Write, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.WriteContent, false));
            Assert.True(entity.RequireAccess(user2, AccessLevel.Read, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.None, false));
        }

        [Fact]
        public void RequireAccess_GroupAccess_Success()
        {
            var user1 = new User
            {
                Id = "User1",
                UserName = "Username1"
            };
            var user2 = new User
            {
                Id = "User2",
                UserName = "Username2"
            };

            var entity = new TestEntity();
            entity.OverwriteOwner(user1);

            var level = entity.CalculateAccessLevel(user1);
            Assert.Equal(AccessLevel.Owner, level);

            level = entity.CalculateAccessLevel(user2);
            Assert.Equal(AccessLevel.None, level);

            Assert.True(entity.RequireAccess(user1, AccessLevel.Read, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.Read, false));

            entity.AddAccess("TEST_GROUP_READ", user2, AccessLevel.Read);

            level = entity.CalculateAccessLevel(user2);
            Assert.Equal(AccessLevel.Read, level);

            Assert.True(entity.RequireAccess(user1, AccessLevel.Read, false));
            Assert.True(entity.RequireAccess(user2, AccessLevel.Read, false));

            Assert.True(entity.RequireAccess(user1, AccessLevel.Write, false));
            Assert.False(entity.RequireAccess(user2, AccessLevel.Write, false));

            entity.AddAccess("TEST_GROUP_WRITE", user2, AccessLevel.Write);

            level = entity.CalculateAccessLevel(user2);
            Assert.Equal(AccessLevel.Write, level);

            Assert.True(entity.RequireAccess(user1, AccessLevel.Write, false));
            Assert.True(entity.RequireAccess(user2, AccessLevel.Write, false));

            entity.OverwriteOwner(user2);

            level = entity.CalculateAccessLevel(user1);
            Assert.Equal(AccessLevel.None, level);

            level = entity.CalculateAccessLevel(user2);
            Assert.Equal(AccessLevel.Owner, level);

            Assert.False(entity.RequireAccess(user1, AccessLevel.Write, false));
            Assert.True(entity.RequireAccess(user2, AccessLevel.Delete, false));

            Assert.Throws<ArgumentException>(() => entity.AddAccess("TEST_GROUP_WRITE", user1, AccessLevel.Delete));

            entity.AddAccess("TEST_GROUP_WRITE", user1, AccessLevel.Write);

            level = entity.CalculateAccessLevel(user1);
            Assert.Equal(AccessLevel.Write, level);

            Assert.True(entity.RequireAccess(user1, AccessLevel.Write, false));
            Assert.True(entity.RequireAccess(user2, AccessLevel.Write, false));
        }


        [Fact]
        public void Filter_UserAccess_Success()
        {
            var user1 = new User
            {
                Id = "User1",
                UserName = "Username1"
            };
            var user2 = new User
            {
                Id = "User2",
                UserName = "Username2"
            };

            var entities = new List<TestEntity>();

            for (int i = 0; i < 10; i++)
            {
                var entity = new TestEntity
                {
                    Id = i
                };

                entity.OverwriteOwner(user1);
                entity.AddUserAccess(user2, AccessLevel.Read);

                if (i == 0)
                {
                    entity.AddUserAccess(user2, AccessLevel.Write);
                }

                if (i == 1)
                {
                    entity.AddAccess("TEST", user2, AccessLevel.WriteContent);
                }

                entities.Add(entity);
            }

            Assert.Equal(10, entities.FilterRequireAccessLevel(user1, AccessLevel.Owner).Count());
            Assert.Equal(10, entities.FilterRequireAccessLevel(user1, AccessLevel.Read).Count());

            Assert.Empty(entities.FilterRequireAccessLevel(user2, AccessLevel.Owner));
            Assert.Single(entities.FilterRequireAccessLevel(user2, AccessLevel.Write));
            Assert.Equal(2, entities.FilterRequireAccessLevel(user2, AccessLevel.WriteContent).Count());

            Assert.Equal(10, entities.FilterRequireAccessLevel(user2, AccessLevel.Read).Count());

            entities.First().RemoveAccess(user1);

            Assert.Equal(9, entities.FilterRequireAccessLevel(user1, AccessLevel.Owner).Count());
        }
    }
}
