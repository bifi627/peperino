import { DeleteForever } from "@mui/icons-material";
import { useRouter } from "next/router";
import { CardAction } from "../../../components/Common/Cards/CardAction";
import { AppFrame } from "../../../components/appFrame/AppFrame";
import { CheckListQueries } from "../../../hooks/queries/checklistQueries";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../../lib/auth/client/useClientAuthGuard";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";

const CheckListSettingsPage = () => {
    useClientAuthGuard();

    const router = useRouter();

    const listSlug = router.query["slug"] as string ?? "";

    const checkListQuery = CheckListQueries.useGetCheckListQuery(listSlug);
    const checkList = checkListQuery.data;
    const loading = checkListQuery.isLoading;

    if (loading) {
        return (
            <AppFrame toolbarText="Einstellungen">
                <>Loading...</>
            </AppFrame>
        )
    }

    const deleteCheckList = async () => {
        await ClientApi.checkList.deleteList({ checkListSlug: listSlug });
        await router.replace(KnownRoutes.Room(checkList?.room.slug));
    }

    return (
        <AppFrame style="OnlyBack" toolbarText="Einstellungen">
            <CardAction mainText={`${checkList?.room.roomName} / ${checkList?.name}`} />
            {(checkList?.accessLevel === "Delete" || checkList?.room.accessLevel === "Owner") &&
                <CardAction mainText={"Löschen"} subTexts={["Die Liste und alle Elemente werden unwiderruflich gelöscht und können nicht wiederherrgestellt werden."]} actions={[
                    {
                        id: "delete",
                        destructive: true,
                        icon: <DeleteForever color="error" />,
                        action: async () => {
                            if (confirm(`${checkList?.entities.length} Einträge werden gelöscht`)) {
                                await deleteCheckList();
                            }
                        },
                    }
                ]} />
            }
        </AppFrame>
    )
}

export default CheckListSettingsPage;