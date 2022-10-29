import { Box, Checkbox } from "@mui/material";
import { observer } from "mobx-react";
import React, { useRef } from "react";
import { BaseCheckListItemOutDto, CheckListOutDto } from "../../lib/api";
import { isImageItem, isLinkItem, isTextItem } from "../../lib/apiHelper/checkListItemGuards";
import { useApplicationState } from "../../lib/state/ApplicationState";
import { ImageCheckListItem } from "./ImageCheckListItem";
import { LinkCheckListItem } from "./LinkCheckListItem";
import { TextCheckListItem } from "./TextCheckListItem";

interface Props {
    item: BaseCheckListItemOutDto;
    checkList: CheckListOutDto;
}

export const CheckListItem = observer((props: Props) => {
    const inputRef = useRef<HTMLInputElement>();

    const appFrame = useApplicationState().getAppFrame();
    const checkListPageState = useApplicationState().getChecklistState();

    const onCheckChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await checkListPageState.toggleItemCheck(props.item);
    }

    return (
        <Box display="flex" flexDirection="row" width={"100vw"} alignItems="center" gap="6px" textOverflow="ellipsis" overflow="hidden">
            <Checkbox onChange={onCheckChange} checked={props.item.checked === true} size="small"></Checkbox>
            <>
                {isTextItem(props.item) && <TextCheckListItem item={props.item} />}
                {isLinkItem(props.item) && <LinkCheckListItem item={props.item} />}
                {isImageItem(props.item) && <ImageCheckListItem contextId={checkListPageState.checkList?.id ?? 0} item={props.item} />}
            </>
        </Box>
    );
});
