using Mapster;
using Peperino.Dtos.CheckList;
using Peperino.EntityFramework.Entities.CheckList;

namespace Peperino.Mapping.CheckList
{
    public class BaseCheckListItemMapping : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<BaseCheckListItem, BaseCheckListItemOutDto>()
                  .Include<TextCheckListItem, TextCheckListItemOutDto>()
                  .Include<ImageCheckListItem, ImageCheckListItemOutDto>()
                  .Include<LinkCheckListItem, LinkCheckListItemOutDto>()
                  .Include<InventoryCheckListItem, InventoryCheckListItemOutDto>();
        }
    }
}
