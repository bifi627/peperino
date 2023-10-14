import { Delete } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { observer } from "mobx-react";
import { useRef, useState } from "react";
import { TextCheckListItemOutDto } from "../../lib/api";

interface Props {
    item: TextCheckListItemOutDto;
    checkListSlug: string;
    onDelete: (item: TextCheckListItemOutDto) => void;
    onUpdate: (item: TextCheckListItemOutDto) => void;
}

export const TextCheckListItem = observer((props: Props) => {
    const inputRef = useRef<HTMLInputElement>();

    const onInputBlur = async () => {
        // Put focus off after delay so the click on delete can register
        setTimeout(() => {
            setInputFocused(false);
        }, 200)
        await saveInput();
    }

    const saveInput = async () => {
        if (inputRef.current) {
            const newValue = inputRef.current.value;
            if (newValue && newValue !== props.item.text) {
                props.item.text = newValue;
                props.onUpdate(props.item);
            }
            inputRef.current.value = props.item.text;
        }
    }

    const onDeleteClick = async () => {
        props.onDelete(props.item);
    }

    const [isInputFocused, setInputFocused] = useState(false);

    return (
        <>
            <form style={{ width: "100%" }} onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                saveInput();
                setInputFocused(false);
                inputRef.current?.blur();
            }}>
                <TextField
                    defaultValue={props.item.text}
                    onFocus={() => setInputFocused(true)}
                    inputRef={inputRef}
                    fullWidth
                    onBlur={onInputBlur}
                    size="small">
                </TextField>
            </form>
            {isInputFocused && <Delete onClick={onDeleteClick} />}
        </>
    );
});
