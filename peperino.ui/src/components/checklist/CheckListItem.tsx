import { Box, Button, Checkbox, TextField } from "@mui/material";
import { observer } from "mobx-react";
import React, { useRef } from "react";
import { CheckListItemOutDto, CheckListOutDto } from "../../lib/api";
import { ClientApi } from "../../lib/auth/client/apiClient";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    item: CheckListItemOutDto;
    checkList: CheckListOutDto;
}

export const CheckListItem = observer((props: Props) => {
    const inputRef = useRef<HTMLInputElement>();

    const appFrame = useApplicationState().getAppFrame();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.item.text = e.target.value;
    }

    const onInputBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        await appFrame.withLoadingScreen(async () => {
            await ClientApi.checkList.updateCheckListItem(props.checkList.slug, props.item.id, props.item);
        });
    }

    const onCheckChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        props.item.checked = !props.item.checked;
        await appFrame.withLoadingScreen(async () => {
            await ClientApi.checkList.updateCheckListItem(props.checkList.slug, props.item.id, props.item);
        });
    }

    const onDeleteClick = async () => {
        await appFrame.withLoadingScreen(async () => {
            await ClientApi.checkList.deleteCheckListItem(props.checkList.slug, props.item.id);
            props.checkList.entities.splice(props.checkList.entities.indexOf(props.item), 1);
        });
    }

    return (
        <Box display="flex" flexDirection="row">
            <Checkbox onChange={onCheckChange} checked={props.item.checked === true} size="small"></Checkbox>
            <TextField inputRef={inputRef} fullWidth value={props.item.text} onChange={onInputChange} onBlur={onInputBlur} size="small"></TextField>
            <Button onClick={onDeleteClick}>DELETE</Button>
        </Box>
    );
});
