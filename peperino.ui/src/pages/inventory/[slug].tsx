import { Autocomplete, Box, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AppFrame } from "../../components/appFrame/AppFrame";
import { SortableList } from "../../components/sortables/SortableList";
import { InventoryQueries } from "../../hooks/state/inventoryQueries";
import { isInventoryItem } from "../../lib/apiHelper/checkListItemGuards";
import { ClientApi } from "../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../lib/auth/client/useClientAuthGuard";

interface Props {
    slug: string;
}

const InventoryListPage = observer((props: Props) => {
    useClientAuthGuard();

    const queryClient = useQueryClient();

    const router = useRouter();
    const slug = router.query["slug"] as string ?? props.slug;

    const deleteInventory = async () => {
        await ClientApi.inventory.deleteInventory({ inventorySlug: slug });
        router.back();
    };

    const inventoryQuery = InventoryQueries.useGetInventoryQuery(slug);
    const inventory = inventoryQuery.data;
    const loading = inventoryQuery.isLoading;

    const addInventoryItemMutation = InventoryQueries.useAddIventoryItemMutation();

    const [inputValue, setInputValue] = useState("");

    if (!inventory || loading) {
        return <>{"Loading..."}</>;
    }

    return (
        <AppFrame toolbarText={inventory.name}>
            <>Inventory</>
            <button onClick={deleteInventory}>Delete</button>
            <Box sx={{ minHeight: "100%" }} display="flex" flexDirection="column" gap={1}>
                <SortableList
                    data={inventory.entities}
                    onDragEnd={() => { }}
                    renderData={item => {
                        if (isInventoryItem(item)) {
                            return <>{item.text}</>
                        }
                        return <>Unknown item...</>;
                    }}
                />
                <form style={{ display: "flex", flexDirection: "row", gap: "6px" }} onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (inputValue !== "") {
                        const text = inputValue.trim();
                        setInputValue("");
                        await addInventoryItemMutation.mutateAsync({ text: text, unit: "Unit", quantity: 1, inventorySlug: inventory.slug });
                    }
                }}>
                    <Autocomplete inputValue={inputValue} onInputChange={(_, value) => setInputValue(value)} inputMode="search" options={[]} freeSolo fullWidth renderInput={params =>
                        <TextField autoFocus {...params} sx={{ paddingLeft: 2 }} fullWidth size="small" />
                    }></Autocomplete>
                </form>
            </Box>
        </AppFrame>
    );
});

export default InventoryListPage;