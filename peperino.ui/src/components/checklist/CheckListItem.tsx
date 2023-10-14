import { Box, Checkbox } from "@mui/material";
import { BaseCheckListItemOutDto } from "../../lib/api";
import { isImageItem, isInventoryItem, isLinkItem, isTextItem } from "../../lib/apiHelper/checkListItemGuards";
import { ImageCheckListItem } from "./ImageCheckListItem";
import { InventoryCheckListItem } from "./InventoryCheckListItem";
import { LinkCheckListItem } from "./LinkCheckListItem";
import { TextCheckListItem } from "./TextCheckListItem";

interface Props {
    item: BaseCheckListItemOutDto;
    checkListSlug: string;
    onDelete: (item: BaseCheckListItemOutDto) => void;
    onUpdate: (item: BaseCheckListItemOutDto) => void;
    onCheck: (item: BaseCheckListItemOutDto) => void;
}

export const CheckListItem = (props: Props) => {

    const onCheckChange = async () => {
        props.onCheck(props.item);
    }

    return (
        <Box key={props.item.id} display="flex" flexDirection="row" width={"100vw"} alignItems="center" gap="6px" textOverflow="ellipsis" overflow="hidden">
            <Checkbox onChange={onCheckChange} checked={props.item.checked} size="small"></Checkbox>
            <>
                {isTextItem(props.item) && <TextCheckListItem onUpdate={props.onUpdate} onDelete={props.onDelete} checkListSlug={props.checkListSlug} item={props.item} />}
                {isLinkItem(props.item) && <LinkCheckListItem onUpdate={props.onUpdate} onDelete={props.onDelete} checkListSlug={props.checkListSlug} item={props.item} />}
                {isImageItem(props.item) && <ImageCheckListItem onUpdate={props.onUpdate} onDelete={props.onDelete} checkListSlug={props.checkListSlug} contextId={props.item.id} item={props.item} />}
                {isInventoryItem(props.item) && <InventoryCheckListItem onUpdate={props.onUpdate} onDelete={props.onDelete} checkListSlug={props.checkListSlug} item={props.item} />}
            </>
        </Box>
    );
};
