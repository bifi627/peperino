import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
    dialogOpened: boolean;
    handleClose: () => void;
    handleSubmit: (value: string) => void;
}

export const RoomCreateDialog = (props: Props) => {
    const { dialogOpened, handleClose, handleSubmit } = props;
    const [roomName, setRoomName] = useState("");

    const innerClose = () => {
        setRoomName("");
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
        <Dialog open={dialogOpened} onClose={innerClose}>
            <DialogTitle>{"Neuen Raum erstellen"}</DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={inputRef}
                    inputMode="text"
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
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
                    handleSubmit(roomName);
                    setRoomName("");
                }}>Erstellen</Button>
            </DialogActions>
        </Dialog>
    );
}