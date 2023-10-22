import { Settings, Star } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { AppFrame } from "../../../components/appFrame/AppFrame";
import { CheckListItem } from "../../../components/checklist/CheckListItem";
import { EnhancedInputField } from "../../../components/checklist/EnhancedInputField";
import { SortableList } from "../../../components/sortables/SortableList";
import { CheckListQueries } from "../../../hooks/queries/checklistQueries";
import { BaseCheckListItemOutDto, TextCheckListItemOutDto } from "../../../lib/api";
import { isInventoryItem, isTextItem } from "../../../lib/apiHelper/checkListItemGuards";
import { MenuAction } from "../../../lib/appFrame/Action";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../../lib/auth/client/useClientAuthGuard";
import { arrayMoveMutable, selectFile, toBase64 } from "../../../lib/helper/common";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";
import { useApplicationState } from "../../../lib/state/ApplicationState";

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

    const [listJoined, setListJoined] = useState(false);

    // const { connectionState } = useWebSocketObserver(
    //     KnownRoutes.SignalR.CheckList(),
    //     {
    //         afterConnecting: async c => await c.send("JoinList", checkList?.slug ?? ""),
    //         beforeDisconnecting: async c => {
    //             setListJoined(false)
    //             await c.send("LeaveList", checkList?.slug ?? "")
    //         },
    //     },
    //     [
    //         {
    //             event: "ListJoined",
    //             action: async () => setListJoined(true)
    //         },
    //         {
    //             event: "Update",
    //             action: async () => {
    //                 console.log("APP: REFRESH")
    //                 await checkListQuery.refetch()
    //             }
    //         },
    //     ]
    // );

    if (!checkList || loading) {
        return <AppFrame>...loading</AppFrame>;
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

    const getAutoCompleteOptions = (inputValue: string) => {
        if (inputValue.length < 3) {
            return [];
        }
        const uniqueItems = new Set(checkList.entities.filter(e => isTextItem(e) || isInventoryItem(e)).map(e => isTextItem(e) || isInventoryItem(e) ? e.text : ""));
        const result = [...uniqueItems.values()];
        return result;
    }

    const openImageDialog = async () => {
        queryClient.setDefaultOptions({ queries: { refetchOnWindowFocus: false } });

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

    const addLinkItem = async ({ inputValue, linkValue }: { inputValue: string, linkValue: string }) => {
        await addLinkItemMutation.mutateAsync({ link: linkValue, title: inputValue })
    }

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

    const favoritesAction: MenuAction = {
        id: "favorite",
        action: async () => {
            if (checkList) {
                await ClientApi.favorites.updateFavoriteCheckList(checkList.slug, { slug: checkList.slug, favorite: !checkList.isFavorite });
                await checkListQuery.refetch();
            }
        },
        keepMenuOpen: true,
        icon: checkList.isFavorite ? <Star color="primary" /> : <Star />,
        text: "Favorit",
    }

    const settingsAction = {
        id: "settings",
        action: async () => {
            if (checkList) {
                await router.push(KnownRoutes.CheckListSettings(checkList.slug));
            }
        },
        icon: <Settings />,
        text: "Einstellungen",
    }

    return (
        <AppFrame toolbarText={checkList.name} menuActions={[settingsAction, favoritesAction]}>
            <Box sx={{ minHeight: "100%" }} display="flex" flexDirection="column" gap={1}>
                <SortableList
                    data={uncheckedItems}
                    onDragEnd={onUncheckedDragEnd}
                    renderData={item => <CheckListItem onCheck={onCheck} onUpdate={onUpdateItem} onDelete={onDeleteItem} key={item.id} checkListSlug={checkList.slug} item={item} />}
                />

                <EnhancedInputField
                    onOptionsRequested={getAutoCompleteOptions}
                    onAddTextItem={addTextItem}
                    onAddLinkItem={addLinkItem}
                    onOpenImagePicker={openImageDialog}
                    onIsExistingItem={value => {
                        const exists = checkList.entities.filter(e =>
                            isTextItem(e) ||
                            isInventoryItem(e)
                        ).find(e =>
                            (isTextItem(e) || isInventoryItem(e)) &&
                            e.text === value) !== undefined;

                        return exists;
                    }}
                />

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
                {/* {connectionState !== "Connected" && listJoined && (
                    <Box color="error" sx={{ width: "12px", height: "12px", margin: 2, backgroundColor: theme.palette.error.main, borderRadius: "22px" }} />
                )} */}
            </Box>
        </AppFrame>
    );
});

export default CheckListPage;

