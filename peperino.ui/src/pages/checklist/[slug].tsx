import { AttachFile, Link, MoveUp, Photo, Send } from "@mui/icons-material";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Popover, TextField, useTheme } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { AppFrame } from "../../components/appFrame/AppFrame";
import { CheckListItem } from "../../components/checklist/CheckListItem";
import { SortableList } from "../../components/sortables/SortableList";
import { CheckListQueries } from "../../hooks/queries/checklistQueries";
import { useWebSocketObserver } from "../../hooks/signalr/webSocketObserver";
import { BaseCheckListItemOutDto, TextCheckListItemOutDto } from "../../lib/api";
import { isInventoryItem, isTextItem } from "../../lib/apiHelper/checkListItemGuards";
import { ClientApi } from "../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../lib/auth/client/useClientAuthGuard";
import { arrayMoveMutable, selectFile, toBase64 } from "../../lib/helper/common";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    slug: string;
}

const CheckListPage = observer((props: Props) => {
    useClientAuthGuard();

    const theme = useTheme();

    const checklistState = useApplicationState().getChecklistState();
    const appFrame = useApplicationState().getAppFrame();

    const router = useRouter();
    const slug = router.query["slug"] as string ?? props.slug;

    const queryClient = useQueryClient();
    const checkListQuery = CheckListQueries.useGetCheckListQuery(slug);
    const checkList = checkListQuery.data;
    const loading = checkListQuery.isLoading;

    const addLinkItemMutation = CheckListQueries.useAddLinkItemMutation(slug);
    const addTextItemMutation = CheckListQueries.useAddTextItemMutation(slug);
    const arrangeItemsMutation = CheckListQueries.useArrangeItemsMutation(slug);
    const deleteItemMutation = CheckListQueries.useDeleteItemMutation(slug);
    const updateItemMutation = CheckListQueries.useUpdateItemMutation(slug);
    const toggleArrangeMutation = CheckListQueries.useToggleArrangeMutation(slug);

    const { connectionState } = useWebSocketObserver(
        KnownRoutes.SignalR.CheckList(),
        {
            afterConnecting: async c => await c.send("JoinList", checkList?.slug ?? ""),
            beforeDisconnecting: async c => await c.send("LeaveList", checkList?.slug ?? ""),
        },
        [
            {
                event: "Update",
                action: async () => await checkListQuery.refetch()
            },
        ]
    );

    if (!checkList || loading) {
        return <>{"Loading..."}</>;
    }

    const checkedItems = checkList.entities.filter(e => e.checked).sort((a, b) => a.sortIndex - b.sortIndex);
    const uncheckedItems = checkList.entities.filter(e => !e.checked).sort((a, b) => a.sortIndex - b.sortIndex);

    const moveItems = async (sourceArray: BaseCheckListItemOutDto[], from: number, to: number) => {
        const tempList = [...sourceArray];
        arrayMoveMutable(tempList, from, to);
        tempList.forEach((item, i) => {
            item.sortIndex = i;
        });

        await arrangeItemsMutation.mutateAsync({ items: checkList.entities });
    }

    const onUncheckedDragEnd = (result: DropResult) => {
        if (result.destination) {
            moveItems(uncheckedItems, result.source.index, result.destination.index)
        }
    }

    const onCheckedDragEnd = (result: DropResult) => {
        if (result.destination) {
            moveItems(checkedItems, result.source.index, result.destination.index)
        }
    }

    const getAutoCompleteOptions = () => {
        if (checklistState.inputValue.length < 3) {
            return [];
        }

        const uniqueItems = new Set(checkList.entities.filter(e => isTextItem(e) || isInventoryItem(e)).map(e => isTextItem(e) || isInventoryItem(e) ? e.text : ""));
        const result = [...uniqueItems.values()];
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
        queryClient.setDefaultOptions({ queries: { refetchOnWindowFocus: false } });

        checklistState.attachmentOptionsOpened = false;
        const files = await selectFile("image/*");

        await appFrame.withLoadingScreen(async () => {
            if (files.length > 0) {
                var file = files[0];
                var fileContent = await toBase64(file);
                await ClientApi.checkListItem.addImageItem(slug, { title: "TEST", imageBase64: fileContent });

                await queryClient.invalidateQueries(CheckListQueries.computeQueryKey(slug));
            }
        });
    }

    const addTextItem = async (text: string) => {
        const existing = checkList.entities.find(e => isTextItem(e) && e.text === text) as TextCheckListItemOutDto;
        // If this text already exists, we want to move it to the latest unchecked element
        if (existing && existing.text.length >= 3) {
            if (existing.checked === true) {
                await onCheck(existing);
            }
            else {
                const sorted = uncheckedItems.sort(i => i.sortIndex);
                const from = sorted.indexOf(existing);
                const to = sorted.length + 1;
                existing.sortIndex = uncheckedItems.length + 1;

                await moveItems(sorted, from, to);
            }
        }
        else {
            await addTextItemMutation.mutateAsync({ text: text });
        }
    };

    const onDeleteItem = async (item: BaseCheckListItemOutDto) => {
        await deleteItemMutation.mutateAsync(item.id);
    }

    const onUpdateItem = async (item: BaseCheckListItemOutDto) => {
        await updateItemMutation.mutateAsync(item);
    }

    const onCheck = async (item: BaseCheckListItemOutDto) => {
        if (item.checked === false) {
            if (checkedItems.length === 0) {
                item.sortIndex = 0;
            }
            else {
                item.sortIndex = Math.min(...checkedItems.map(i => i.sortIndex));
                checkedItems.forEach(item => {
                    item.sortIndex++;
                });
            }
        }
        else {
            if (uncheckedItems.length === 0) {
                item.sortIndex = 0;
            }
            else {
                item.sortIndex = Math.max(...uncheckedItems.map(i => i.sortIndex)) + 1;
            }
        }

        item.checked = !item.checked;
        await toggleArrangeMutation.mutateAsync({ arrangeRequest: { items: checkList.entities }, updateRequest: item });
    };

    return (
        <AppFrame toolbarText={checkList.name}>
            <Box sx={{ minHeight: "100%" }} display="flex" flexDirection="column" gap={1}>
                <SortableList
                    data={uncheckedItems}
                    onDragEnd={onUncheckedDragEnd}
                    renderData={item => <CheckListItem onCheck={onCheck} onUpdate={onUpdateItem} onDelete={onDeleteItem} key={item.id} checkListSlug={checkList.slug} item={item} />}
                />

                <form style={{ display: "flex", flexDirection: "row", gap: "6px" }} onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (checklistState.inputValue !== "") {
                        const text = checklistState.inputValue.trim();
                        checklistState.inputValue = "";

                        await addTextItem(text);
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
                        {checkList.entities.filter(e => isTextItem(e) || isInventoryItem(e)).find(e => (isTextItem(e) || isInventoryItem(e)) && e.text === checklistState.inputValue) === undefined ? <Send color="primary" /> : <MoveUp color="primary" />}
                    </IconButton>
                </form>

                <SortableList
                    data={checkedItems}
                    onDragEnd={onCheckedDragEnd}
                    renderData={item => <CheckListItem onCheck={onCheck} onUpdate={onUpdateItem} onDelete={onDeleteItem} key={item.id} checkListSlug={checkList.slug} item={item} />}
                />
            </Box>
            <Box sx={{
                position: "sticky",
                bottom: "8px",
                width: "100%"
            }}>
                {connectionState !== "Connected" && (
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

                        checklistState.linkDialogOpened = false;
                        await addLinkItemMutation.mutateAsync({ link: checklistState.linkValue, title: checklistState.inputValue })
                    }}>Hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </AppFrame>
    );
});

export default CheckListPage;

