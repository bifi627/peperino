using Mapster;
using Peperino.EntityFramework.Entities.CheckList;
using Peperino.EntityFramework.Entities.Inventory;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Peperino.Dtos.CheckList
{
    public class FullObjectWriteConverter<TBase> : JsonConverter<TBase> where TBase : class
    {
        public override TBase? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.Null)
            {
                return null;
            }

            // Use the JsonDocument to parse the JSON data.
            using JsonDocument document = JsonDocument.ParseValue(ref reader);

            // Get the root element of the JSON document.
            JsonElement rootElement = document.RootElement;

            if (rootElement.TryGetProperty("itemType", out var itemTypeElement))
            {
                if (itemTypeElement.TryGetProperty("variant", out var variantElement))
                {
                    if (Enum.TryParse<ItemVariant>(variantElement.ToString(), out var itemType))
                    {
                        TBase? deserializedObject = itemType switch
                        {
                            ItemVariant.Text => JsonSerializer.Deserialize<TextCheckListItemOutDto>(rootElement.GetRawText(), options) as TBase,
                            ItemVariant.Link => JsonSerializer.Deserialize<LinkCheckListItemOutDto>(rootElement.GetRawText(), options) as TBase,
                            ItemVariant.Image => JsonSerializer.Deserialize<ImageCheckListItemOutDto>(rootElement.GetRawText(), options) as TBase,
                            ItemVariant.Inventory => JsonSerializer.Deserialize<InventoryCheckListItemOutDto>(rootElement.GetRawText(), options) as TBase,
                            _ => throw new NotImplementedException(),
                        };
                        return deserializedObject;
                    }
                }
            }
            throw new NotImplementedException();
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
                case ImageCheckListItem imageCheckListItem:
                    dto = imageCheckListItem.Adapt<ImageCheckListItemOutDto>();
                    break;
                case InventoryCheckListItem inventoryCheckListItem:
                    dto = inventoryCheckListItem.Adapt<InventoryCheckListItemOutDto>();
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
        public Guid ImageReference { get; set; } = Guid.Empty;
    }

    public class InventoryCheckListItemOutDto : BaseCheckListItemOutDto
    {
        [Required]
        public string Text { get; set; } = string.Empty;

        [Required]
        public double Quantity { get; set; } = 0.0;

        [Required]
        public QuantityUnit Unit { get; set; }
    }
}
