import { Delete } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import { TextCheckListItemOutDto } from "../../lib/api";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    item: TextCheckListItemOutDto;
}

export const TextCheckListItem = observer((props: Props) => {
    const inputRef = useRef<HTMLInputElement>();

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
            await checkListPageState.updateTextCheckItem(props.item, props.item.text);
        }
    }

    const onDeleteClick = async () => {
        await checkListPageState.deleteItem(props.item);
    }

    const [isInputFocused, setInputFocused] = useState(false);
    const [isInputChanged, setInputChanged] = useState(false);

    return (
        <>
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
        </>
    );
});
