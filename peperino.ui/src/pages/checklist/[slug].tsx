import { AttachFile, Link, MoveUp, Photo, Send } from "@mui/icons-material";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Popover, TextField, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { CheckListItem } from "../../components/checklist/CheckListItem";
import { SortableList } from "../../components/sortables/SortableList";
import { BaseCheckListItemOutDto, CheckListOutDto } from "../../lib/api";
import { isTextItem } from "../../lib/apiHelper/checkListItemGuards";
import { ClientApi } from "../../lib/auth/client/apiClient";
import { useAuthGuard } from "../../lib/auth/client/useAuthGuard";
import { selectFile, toBase64 } from "../../lib/helper/common";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    checkList: CheckListOutDto;
}

const CheckListPage = observer((props: Props) => {
    useAuthGuard();

    const router = useRouter();

    const theme = useTheme();

    const checklistState = useApplicationState().getChecklistState();
    const appFrame = useApplicationState().getAppFrame();

    const initCheckList = async () => {
        try {
            const slug = router.query["slug"] as string ?? "";
            await checklistState.pageInit(slug);
            await checklistState.connectSignalR();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { autoClose: 1000 });
                setTimeout(() => {
                    router.push(KnownRoutes.Root());
                }, 1000);
            }
        }
    }

    useEffect(() => {
        initCheckList();
        return () => {
            checklistState.disconnectSignalR();
        }
    }, []);

    if (!checklistState.checkList) {
        return <></>;
    }

    const moveItems = async (sourceArray: BaseCheckListItemOutDto[], from: number, to: number) => {
        await checklistState.moveItems(sourceArray, from, to);
    }

    const onUncheckedDragEnd = (result: DropResult) => {
        if (result.destination) {
            moveItems(checklistState.uncheckedItems, result.source.index, result.destination.index)
        }
    }

    const onCheckedDragEnd = (result: DropResult) => {
        if (result.destination) {
            moveItems(checklistState.checkedItems, result.source.index, result.destination.index)
        }
    }

    const getAutoCompleteOptions = () => {
        if (checklistState.inputValue.length < 3) {
            return [];
        }

        const uniqueItems = new Set(checklistState.checkList?.entities.filter(e => isTextItem(e)).map(e => isTextItem(e) ? e.text : ""));
        const result = [...uniqueItems.values()]
        return result;
    }

    const createAttachment = () => {
        checklistState.attachmentOptionsOpened = true;
    }

    const openLinkDialog = () => {
        checklistState.attachmentOptionsOpened = false;
        checklistState.linkDialogOpened = true;
    }

    const openImageDialog = async () => {

        checklistState.attachmentOptionsOpened = false;
        const files = await selectFile("image/*");

        await appFrame.withLoadingScreen(async () => {
            if (!checklistState.checkList) {
                return;
            }

            if (files.length > 0) {
                var file = files[0];
                var fileContent = await toBase64(file);
                await ClientApi.checkListItem.addImageItem(checklistState.checkList?.slug, { title: "TEST", imageBase64: fileContent });
                await checklistState.reloadList();
            }
        });
    }

    return (
        <>
            {checklistState.checkList &&
                <>
                    <Box sx={{ minHeight: "100%" }} display="flex" flexDirection="column" gap={1}>
                        <SortableList
                            data={checklistState.uncheckedItems}
                            onDragEnd={onUncheckedDragEnd}
                            renderData={item => {
                                return <CheckListItem checkList={checklistState.checkList!} item={item} />;
                            }}
                        />

                        <form style={{ display: "flex", flexDirection: "row", gap: "6px" }} onSubmit={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (checklistState.inputValue !== "") {
                                const text = checklistState.inputValue.trim();
                                checklistState.inputValue = "";
                                await checklistState.addTextItem(text);
                            }
                        }}>
                            <Autocomplete inputValue={checklistState.inputValue} onInputChange={(_, value) => checklistState.inputValue = value} inputMode="search" options={getAutoCompleteOptions()} freeSolo fullWidth renderInput={params =>
                                <TextField autoFocus {...params} sx={{ paddingLeft: 2 }} fullWidth size="small" />
                            }></Autocomplete>
                            <IconButton ref={ref => {
                                if (!checklistState.attachmentOptionsAnchor) {
                                    checklistState.attachmentOptionsAnchor = ref;
                                }
                            }} size="small" onClick={createAttachment}>
                                <AttachFile color="primary" />
                            </IconButton>
                            <Popover
                                open={checklistState.attachmentOptionsOpened}
                                anchorEl={checklistState.attachmentOptionsAnchor}
                                onClose={() => checklistState.attachmentOptionsOpened = false}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Box display="flex" flexDirection="row" gap="6px" onClick={openLinkDialog}>
                                    <IconButton>
                                        <Link />
                                    </IconButton>
                                    <p>Link</p>
                                </Box>
                                <Box display="flex" flexDirection="row" gap="6px" onClick={openImageDialog} sx={{ paddingRight: "20px" }}>
                                    <IconButton>
                                        <Photo />
                                    </IconButton>
                                    <p>Bild / Foto</p>
                                </Box>
                            </Popover>
                            <IconButton size="small" type="submit" sx={{ paddingRight: "20px", paddingLeft: "20px" }}>
                                {checklistState.checkList.entities.filter(e => isTextItem(e)).find(e => isTextItem(e) && e.text === checklistState.inputValue) === undefined ? <Send color="primary" /> : <MoveUp color="primary" />}
                            </IconButton>
                        </form>

                        <SortableList
                            data={checklistState.checkedItems}
                            onDragEnd={onCheckedDragEnd}
                            renderData={item => {
                                return <CheckListItem checkList={checklistState.checkList!} item={item} />;
                            }}
                        />
                    </Box>
                    <Box sx={{
                        position: "sticky",
                        bottom: "8px",
                        width: "100%"
                    }}>
                        {checklistState.ConnectionState !== "Connected" && (
                            <Box color="error" sx={{ width: "12px", height: "12px", margin: 2, backgroundColor: theme.palette.error.main, borderRadius: "22px" }} />
                        )}
                    </Box>
                    <Dialog open={checklistState.linkDialogOpened} onClose={() => checklistState.linkDialogOpened = false}>
                        <DialogTitle>{"Neuen Link hinzufügen"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                inputMode="text"
                                value={checklistState.inputValue}
                                onChange={(s) => { checklistState.inputValue = s.target.value }}
                                autoComplete="off"
                                margin="dense"
                                id="name"
                                label="Titel"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                inputMode="url"
                                value={checklistState.linkValue}
                                onChange={(s) => { checklistState.linkValue = s.target.value }}
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
                            <Button onClick={() => checklistState.linkDialogOpened = false}>Abbrechen</Button>
                            <Button onClick={async () => {
                                if (!checklistState.isValidHttpUrl(checklistState.linkValue)) {
                                    toast.error("Ungültiger Link");
                                    return;
                                }

                                await appFrame.withLoadingScreen(async () => {
                                    checklistState.linkDialogOpened = false;
                                    await checklistState.addLinkItem(checklistState.inputValue, checklistState.linkValue);
                                });
                            }}>Hinzufügen</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </>
    );
});

export default CheckListPage;

