import { observer } from "mobx-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { AppFrame } from "../../components/appFrame/AppFrame";
import { ClientApi } from "../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../lib/auth/client/useClientAuthGuard";
import { useApplicationState } from "../../lib/state/ApplicationState";

const InventoryListPage = observer(() => {
    useClientAuthGuard();

    const router = useRouter();

    const theme = useTheme();

    const checklistState = useApplicationState().getChecklistState();
    const appFrame = useApplicationState().getAppFrame();

    const slug = router.query["slug"] as string ?? "";

    const deleteInventory = async () => {
        await ClientApi.inventory.deleteInventory({ inventorySlug: slug });
        router.back();
    };

    return (
        <AppFrame toolbarText={slug}>
            <>Inventory</>
            <button onClick={deleteInventory}>Delete</button>
        </AppFrame>
    );
});

export default InventoryListPage;