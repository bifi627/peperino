using Mapster;

namespace Peperino.Mappings
{
    public class UserStoreRegister : ICodeGenerationRegister
    {
        public void Register(CodeGenerationConfig config)
        {
            //config.AdaptTo("[name]Dto").ForType<UserStoreClient>(cfg => cfg.Ignore(u => u.Id).Ignore(u => u.DomainEvents).Ignore(u => u.User));
            //config.GenerateMapper("[name]Mapper").ForType<UserStoreClient>();
        }
    }
}
