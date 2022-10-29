import { ImageCheckListItemOutDto, LinkCheckListItemOutDto, TextCheckListItemOutDto } from "../api";
import { BaseCheckListItemOutDto } from "../api/models/BaseCheckListItemOutDto";

export const isTextItem = (item?: BaseCheckListItemOutDto): item is TextCheckListItemOutDto => {
    return item?.itemType.variant === "Text";
}
export const isLinkItem = (item?: BaseCheckListItemOutDto): item is LinkCheckListItemOutDto => {
    return item?.itemType.variant === "Link";
}
export const isImageItem = (item?: BaseCheckListItemOutDto): item is ImageCheckListItemOutDto => {
    return item?.itemType.variant === "Image";
}