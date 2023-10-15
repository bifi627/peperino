import { Settings } from "@mui/icons-material";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { AppFrame } from "../../../components/appFrame/AppFrame";
import { CheckListItem } from "../../../components/checklist/CheckListItem";
import { SortableList } from "../../../components/sortables/SortableList";
import { CheckListQueries } from "../../../hooks/queries/checklistQueries";
import { BaseCheckListItemOutDto } from "../../../lib/api";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../../lib/auth/client/useClientAuthGuard";
import { arrayMoveMutable } from "../../../lib/helper/common";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";

interface Props {
    slug: string;
}

const InventoryListPage = (props: Props) => {
    useClientAuthGuard();

    const router = useRouter();
    const slug = router.query["slug"] as string ?? props.slug;

    const deleteInventory = async () => {
        await ClientApi.inventory.deleteInventory({ inventorySlug: slug });
        router.back();
    };

    const checkListQuery = CheckListQueries.useGetCheckListQuery(slug);

    const inventory = checkListQuery.data;
    const loading = checkListQuery.isLoading;

    const addInventoryItemMutation = CheckListQueries.useAddIventoryItemMutation(slug);
    const arrangeItemsMutation = CheckListQueries.useArrangeItemsMutation(slug);
    const deleteItemMigration = CheckListQueries.useDeleteItemMutation(slug);
    const updateItemMigration = CheckListQueries.useUpdateItemMutation(slug);
    const toggleArrangeMutation = CheckListQueries.useToggleArrangeMutation(slug);

    const [inputValue, setInputValue] = useState("");

    if (!inventory || loading) {
        return <AppFrame>...loading</AppFrame>;
    }

    const checkedItems = inventory.entities.filter(e => e.checked).sort((a, b) => a.sortIndex - b.sortIndex);
    const uncheckedItems = inventory.entities.filter(e => !e.checked).sort((a, b) => a.sortIndex - b.sortIndex);

    const moveItems = async (sourceArray: BaseCheckListItemOutDto[], from: number, to: number) => {
        const tempList = [...sourceArray];
        arrayMoveMutable(tempList, from, to);
        tempList.forEach((item, i) => {
            item.sortIndex = i;
        });

        await arrangeItemsMutation.mutateAsync({ items: inventory.entities });
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

    const onDeleteItem = async (item: BaseCheckListItemOutDto) => {
        await deleteItemMigration.mutateAsync(item.id);
    }

    const onUpdateItem = async (item: BaseCheckListItemOutDto) => {
        await updateItemMigration.mutateAsync(item);
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
        await toggleArrangeMutation.mutateAsync({ arrangeRequest: { items: inventory.entities }, updateRequest: item });
    };

    const settingsAction = {
        id: "settings",
        action: async () => {
            if (inventory) {
                await router.push(KnownRoutes.InventorySettings(inventory.slug));
            }
        },
        icon: <Settings />,
        text: "Einstellungen",
    }

    return (
        <AppFrame toolbarText={inventory.name} menuActions={[settingsAction]}>
            <Box sx={{ minHeight: "100%" }} display="flex" flexDirection="column" gap={1}>
                <SortableList
                    data={uncheckedItems}
                    onDragEnd={onUncheckedDragEnd}
                    renderData={item => <CheckListItem onCheck={onCheck} onUpdate={onUpdateItem} onDelete={onDeleteItem} key={item.id} checkListSlug={slug} item={item} />}
                />
                <form style={{ display: "flex", flexDirection: "row", gap: "6px" }} onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (inputValue !== "") {
                        const text = inputValue.trim();
                        setInputValue("");
                        await addInventoryItemMutation.mutateAsync({ text: text, unit: "Unit", quantity: 1 });
                    }
                }}>
                    <Autocomplete inputValue={inputValue} onInputChange={(_, value) => setInputValue(value)} inputMode="search" options={[]} freeSolo fullWidth renderInput={params =>
                        <TextField autoFocus {...params} sx={{ paddingLeft: 2 }} fullWidth size="small" />
                    }></Autocomplete>
                </form>
                <SortableList
                    data={checkedItems}
                    onDragEnd={onCheckedDragEnd}
                    renderData={item => <CheckListItem onCheck={onCheck} onUpdate={onUpdateItem} onDelete={onDeleteItem} key={item.id} checkListSlug={slug} item={item} />}
                />
            </Box>
        </AppFrame>
    );
};

export default InventoryListPage;