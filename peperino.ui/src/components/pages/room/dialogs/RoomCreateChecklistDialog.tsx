import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
    dialogOpened: boolean;
    handleClose: () => void;
    handleSubmit: (value: string) => void;
}

export const RoomCreateChecklistDialog = (props: Props) => {
    const { dialogOpened, handleClose, handleSubmit } = props;

    const [listName, setListName] = useState("");

    const innerClose = () => {
        setListName("");
        handleClose();
    };

    // Set focus after opening dialog with delay
    const inputRef = useRef<HTMLInputElement>();
    useEffect(() => {
        if (dialogOpened) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 222)
        }
    }, [dialogOpened]);

    return (
        <>
            <Dialog open={dialogOpened} onClose={innerClose}>
                <DialogTitle>{"Neue Liste erstellen"}</DialogTitle>
                <DialogContent>
                    <TextField
                        inputMode="text"
                        inputRef={inputRef}
                        value={listName}
                        onChange={e => setListName(e.target.value)}
                        autoComplete="off"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={innerClose}>Abbrechen</Button>
                    <Button onClick={() => {
                        handleSubmit(listName)
                        setListName("");
                    }}>Erstellen</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}