import { AttachFile, Link, MoveUp, Photo, Send } from "@mui/icons-material";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Popover, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { isValidHttpUrl } from "../../lib/helper/common";

interface Props {
    onOptionsRequested: (inputValue: string) => string[]
    onAddTextItem: (value: string) => unknown;
    onAddLinkItem: ({ inputValue, linkValue }: { inputValue: string, linkValue: string }) => unknown;
    onOpenImagePicker: () => unknown;
    onIsExistingItem: (value: string) => boolean;
}

export const EnhancedInputField = (props: Props) => {
    const [inputValue, setInputValue] = useState("");
    const [attachmentOptionsOpened, setAttachmentOptionsOpened] = useState(false);
    const [attachmentOptionsAnchor, setAttachmentOptionsAnchor] = useState<HTMLElement>();
    const [linkDialogOpened, setLinkDialogOpened] = useState(false);
    const [linkValue, setLinkValue] = useState("");

    return (
        <>
            <form style={{ display: "flex", flexDirection: "row", gap: "6px" }} onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (inputValue !== "") {
                    const text = inputValue.trim();
                    setInputValue("");

                    props.onAddTextItem(text);
                }
            }}>
                <Autocomplete inputValue={inputValue} onInputChange={(_, value) => {
                    setInputValue(value);
                }} inputMode="search" options={props.onOptionsRequested(inputValue)} freeSolo fullWidth renderInput={params =>
                    <TextField autoFocus {...params} sx={{ paddingLeft: 2 }} fullWidth size="small" />
                }></Autocomplete>
                <IconButton ref={ref => {
                    if (!attachmentOptionsAnchor && ref) {
                        setAttachmentOptionsAnchor(ref);
                    }
                }} size="small" onClick={() => setAttachmentOptionsOpened(true)}>
                    <AttachFile color="primary" />
                </IconButton>
                <Popover
                    open={attachmentOptionsOpened}
                    anchorEl={attachmentOptionsAnchor}
                    onClose={() => setAttachmentOptionsOpened(false)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Box display="flex" flexDirection="row" gap="6px" onClick={() => {
                        setAttachmentOptionsOpened(false);
                        setLinkDialogOpened(true);
                    }}>
                        <IconButton>
                            <Link />
                        </IconButton>
                        <p>Link</p>
                    </Box>
                    <Box display="flex" flexDirection="row" gap="6px" onClick={() => {
                        setAttachmentOptionsOpened(false);
                        props.onOpenImagePicker();
                    }} sx={{ paddingRight: "20px" }}>
                        <IconButton>
                            <Photo />
                        </IconButton>
                        <p>Bild / Foto</p>
                    </Box>
                </Popover>
                <IconButton size="small" type="submit" sx={{ paddingRight: "20px", paddingLeft: "20px" }}>
                    {props.onIsExistingItem(inputValue) ? <MoveUp color="primary" /> : <Send color="primary" />}
                </IconButton>
            </form>
            <Dialog open={linkDialogOpened} onClose={() => {
                setLinkDialogOpened(false);
                setLinkValue("");
                setInputValue("");
            }}>
                <DialogTitle>{"Neuen Link hinzufügen"}</DialogTitle>
                <DialogContent>
                    <TextField
                        inputMode="text"
                        value={inputValue}
                        onChange={s => setInputValue(s.target.value)}
                        autoComplete="off"
                        margin="dense"
                        id="name"
                        label="Titel"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputMode="url"
                        value={linkValue}
                        onChange={s => setLinkValue(s.target.value)}
                        autoComplete="off"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Link*"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLinkDialogOpened(false)}>Abbrechen</Button>
                    <Button onClick={async () => {
                        if (!isValidHttpUrl(linkValue)) {
                            toast.error("Ungültiger Link");
                            return;
                        }

                        setLinkDialogOpened(false);
                        setLinkValue("");
                        setInputValue("");
                        props.onAddLinkItem({ inputValue, linkValue })
                    }}>Hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}