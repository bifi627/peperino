import { DeleteForever } from "@mui/icons-material";
import { useRouter } from "next/router";
import { CardAction } from "../../../components/Common/Cards/CardAction";
import { EditTextCardAction } from "../../../components/Common/Cards/EditTextCardAction";
import { AppFrame } from "../../../components/appFrame/AppFrame";
import { FullLoadingPage } from "../../../components/loadingScreen/FullLoadingPage";
import { InventoryQueries } from "../../../hooks/queries/inventoryQueries";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../../lib/auth/client/useClientAuthGuard";
import { checkAccessLevel } from "../../../lib/helper/common";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";

const InventorySettingsPage = () => {
    useClientAuthGuard();

    const router = useRouter();

    const inventorySlug = router.query["slug"] as string ?? "";

    const inventoryQuery = InventoryQueries.useGetInventoryQuery(inventorySlug);
    const inventory = inventoryQuery.data;
    const loading = inventoryQuery.isLoading;

    if (loading) {
        return (
            <AppFrame toolbarText="Einstellungen">
                <FullLoadingPage />
            </AppFrame>
        )
    }

    const canDelete = checkAccessLevel("Delete", inventory?.accessLevel) || checkAccessLevel("Owner", inventory?.room_Inventory?.accessLevel)
    const canWrite = checkAccessLevel("Write", inventory?.accessLevel) || checkAccessLevel("Owner", inventory?.room_Inventory?.accessLevel)

    const deleteInventory = async () => {
        await ClientApi.checkList.deleteList({ checkListSlug: inventorySlug });
        await router.replace(KnownRoutes.Room(inventory?.room_Inventory.slug));
    }

    const renameInventory = async (newName: string) => {
        if (inventory) {
            await ClientApi.inventory.renameInventory(inventory.slug, { slug: inventory.slug, newName: newName });
            await inventoryQuery.refetch();
        }
    }

    return (
        <AppFrame style="OnlyBack" toolbarText="Einstellungen">
            {!canWrite && <CardAction mainText={`${inventory?.room_Inventory.roomName} / ${inventory?.name}`} />}
            {canWrite && <EditTextCardAction mainText={inventory?.name ?? ""} onTextChanged={renameInventory} />}
            {canDelete &&
                <CardAction mainText={"Löschen"} subTexts={["Die Liste und alle Elemente werden unwiderruflich gelöscht und können nicht wiederherrgestellt werden."]} actions={[
                    {
                        id: "delete",
                        destructive: true,
                        icon: <DeleteForever color="error" />,
                        action: async () => {
                            if (confirm(`${inventory?.entities.length} Einträge werden gelöscht`)) {
                                await deleteInventory();
                            }
                        },
                    }
                ]} />
            }
        </AppFrame>
    )
}

export default InventorySettingsPage;