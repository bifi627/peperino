import { DeleteForever } from "@mui/icons-material";
import { useRouter } from "next/router";
import { CardAction } from "../../../components/Common/Cards/CardAction";
import { EditTextCardAction } from "../../../components/Common/Cards/EditTextCardAction";
import { AppFrame } from "../../../components/appFrame/AppFrame";
import { CheckListQueries } from "../../../hooks/queries/checklistQueries";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../../lib/auth/client/useClientAuthGuard";
import { checkAccessLevel } from "../../../lib/helper/common";
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

    const canDelete = checkAccessLevel("Delete", checkList?.accessLevel) || checkAccessLevel("Owner", checkList?.room?.accessLevel)
    const canWrite = checkAccessLevel("Write", checkList?.accessLevel) || checkAccessLevel("Owner", checkList?.room?.accessLevel)

    const deleteCheckList = async () => {
        await ClientApi.checkList.deleteList({ checkListSlug: listSlug });
        await router.replace(KnownRoutes.Room(checkList?.room.slug));
    }

    const renameCheckList = async (newName: string) => {
        if (checkList) {
            await ClientApi.checkList.renameList(checkList.slug, { slug: checkList.slug, newName: newName });
            await checkListQuery.refetch();
        }
    }

    return (
        <AppFrame style="OnlyBack" toolbarText="Einstellungen">
            {!canWrite && <CardAction mainText={`${checkList?.room.roomName} / ${checkList?.name}`} />}
            {canWrite && <EditTextCardAction mainText={checkList?.name ?? ""} onTextChanged={renameCheckList} />}
            {canDelete &&
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