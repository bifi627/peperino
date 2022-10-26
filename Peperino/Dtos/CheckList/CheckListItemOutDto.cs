using Peperino.EntityFramework.Entities.CheckList;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Peperino.Dtos.CheckList
{
    public class FullObjectConverter<TBase> : JsonConverter<TBase> where TBase : class
    {
        public override TBase? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web);

            var result = JsonSerializer.Deserialize<BaseCheckListItemOutDto>(ref reader, _jsonOptions);

            return result as TBase;
        }

        public override void Write(Utf8JsonWriter writer, TBase value, JsonSerializerOptions options)
        {
            // Cast to object which forces the serializer to use runtime type.
            JsonSerializer.Serialize(writer, value, typeof(object), options);
        }
    }

    [JsonConverter(typeof(FullObjectConverter<BaseCheckListItemOutDto>))]
    public class BaseCheckListItemOutDto
    {
        [Required]
        public ItemType ItemType { get; }

        [Required]
        public int Id { get; set; }

        [Required]
        public int SortIndex { get; set; }

        [Required]
        public bool Checked { get; set; }
    }

    public class TextCheckListItemOutDto : BaseCheckListItemOutDto
    {
        [Required]
        public new ItemType ItemType => ItemType.Text;

        [Required]
        public string Text { get; set; } = string.Empty;
    }

    public class LinkCheckListItemOutDto : BaseCheckListItemOutDto
    {
        [Required]
        public new ItemType ItemType => ItemType.Link;

        [Required]
        public string Link { get; set; } = string.Empty;
    }

    public class ImageCheckListItemOutDto : BaseCheckListItemOutDto
    {
        [Required]
        public new ItemType ItemType => ItemType.Image;

        [Required]
        public string Reference { get; set; } = string.Empty;
    }
}
