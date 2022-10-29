using Mapster;
using Peperino.EntityFramework.Entities.CheckList;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Peperino.Dtos.CheckList
{
    public class FullObjectWriteConverter<TBase> : JsonConverter<TBase> where TBase : class
    {
        public override TBase? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException("This should never be used");
        }

        public override void Write(Utf8JsonWriter writer, TBase value, JsonSerializerOptions options)
        {
            // Cast to object which forces the serializer to use runtime type.
            JsonSerializer.Serialize(writer, value, typeof(object), options);
        }
    }

    [JsonConverter(typeof(FullObjectWriteConverter<BaseCheckListItemOutDto>))]
    public class BaseCheckListItemOutDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int SortIndex { get; set; }

        [Required]
        public bool Checked { get; set; }

        [Required]
        public CheckListItemTypeOutDto ItemType { get; set; }

        public static BaseCheckListItemOutDto AdaptFrom(BaseCheckListItem baseCheckListItem)
        {
            BaseCheckListItemOutDto dto;

            switch (baseCheckListItem)
            {
                case TextCheckListItem:
                    dto = baseCheckListItem.Adapt<TextCheckListItemOutDto>();
                    break;
                case LinkCheckListItem:
                    dto = baseCheckListItem.Adapt<LinkCheckListItemOutDto>();
                    break;
                case ImageCheckListItem:
                    dto = baseCheckListItem.Adapt<ImageCheckListItemOutDto>();
                    break;
                default:
                    throw new ArgumentException($"Unknown item type {baseCheckListItem.GetType()}");
            }

            return dto;
        }
    }

    public class TextCheckListItemOutDto : BaseCheckListItemOutDto
    {
        [Required]
        public string Text { get; set; } = string.Empty;
    }

    public class LinkCheckListItemOutDto : BaseCheckListItemOutDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Link { get; set; } = string.Empty;
    }

    public class ImageCheckListItemOutDto : BaseCheckListItemOutDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string ImageLink { get; set; } = string.Empty;
    }
}
