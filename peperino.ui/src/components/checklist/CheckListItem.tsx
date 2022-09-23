import { Delete } from "@mui/icons-material";
import { Box, Checkbox, TextField } from "@mui/material";
import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import { CheckListItemOutDto, CheckListOutDto } from "../../lib/api";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    item: CheckListItemOutDto;
    checkList: CheckListOutDto;
}

export const CheckListItem = observer((props: Props) => {
    const inputRef = useRef<HTMLInputElement>();

    const appFrame = useApplicationState().getAppFrame();
    const checkListPageState = useApplicationState().getChecklistState();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.item.text = e.target.value;
        setInputChanged(true);
    }

    const onInputBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        // Put focus off after delay so the click on delete can register
        setTimeout(() => {
            setInputFocused(false);
        }, 100)
        await saveInput();
        setInputChanged(false);
    }

    const saveInput = async () => {
        if (isInputChanged) {
            await appFrame.withLoadingScreen(async () => {
                await checkListPageState.updateItem(props.item);
            }, 1000);
        }
    }

    const onCheckChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await appFrame.withLoadingScreen(async () => {
            await checkListPageState.toggleItemCheck(props.item);
        }, 1000);
    }

    const onDeleteClick = async () => {
        await appFrame.withLoadingScreen(async () => {
            await checkListPageState.deleteItem(props.item);
        }, 1000);
    }

    const [isInputFocused, setInputFocused] = useState(false);
    const [isInputChanged, setInputChanged] = useState(false);

    return (
        <Box display="flex" flexDirection="row" width={"100%"} alignItems="center" gap="6px">
            <Checkbox onChange={onCheckChange} checked={props.item.checked === true} size="small"></Checkbox>
            <form style={{ width: "100%" }} onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                saveInput();
                setInputFocused(false);
                inputRef.current?.blur();
            }}>
                <TextField onFocus={() => setInputFocused(true)} inputRef={inputRef} fullWidth value={props.item.text} onChange={onInputChange} onBlur={onInputBlur} size="small"></TextField>
            </form>

            {isInputFocused && <Delete onClick={onDeleteClick} />}
        </Box>
    );
});
