import { Add, List, LocalActivity, Settings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Fab } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AppFrame } from "../../../components/appFrame/AppFrame";
import { CheckListCardAction } from "../../../components/pages/room/CheckListCardAction";
import { RoomCreateChecklistDialog } from "../../../components/pages/room/dialogs/RoomCreateChecklistDialog";
import { RoomQueries } from "../../../hooks/state/roomQueries";
import { useClientAuthGuard } from "../../../lib/auth/client/useClientAuthGuard";
import { useAppFrameConfig } from "../../../lib/hooks/useAppFrameConfig";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";
import { useApplicationState } from "../../../lib/state/ApplicationState";

interface Props {
}

const GroupPage = observer((props: Props) => {
    useClientAuthGuard();

    const router = useRouter();
    const appFrame = useApplicationState().getAppFrame();
    const appFrameConfig = useAppFrameConfig();

    const [dialogOpened, setDialogOpened] = useState(false);

    const queryClient = useQueryClient();
    const roomBySlugQuery = RoomQueries.useGetRoomBySlugQuery(router.query["slug"] as string ?? "")
    const room = roomBySlugQuery.data;
    const checkLists = room?.checkLists;

    const settingsAction = {
        id: "settings",
        action: async () => {
            if (room) {
                await router.push(KnownRoutes.RoomSettings(room.slug));
            }
        },
        icon: <Settings />,
        text: "Einstellungen",
    }

    const createCheckListMutation = RoomQueries.useCreateCheckListMutation(queryClient, () => setDialogOpened(false));

    const [bottomNavigation, setBottomNavigation] = useState(0);
    const fabButtonOffset = 64;

    return (
        <AppFrame
            toolbarText={room?.roomName}
            menuActions={room?.accessLevel === "Owner" ? [settingsAction] : []}
        >
            <Box style={{ minHeight: `calc(100% - ${(fabButtonOffset - 4) * 2}px)`, paddingBottom: `${fabButtonOffset - 4}px` }}>
                {/* CheckListCards */}
                <Box>
                    {checkLists?.map(list => {
                        return (
                            <CheckListCardAction
                                key={list.slug}
                                mainText={list.name}
                                subTexts={[`${list.entities.length} Einträge`]}
                                slug={list.slug}
                            />
                        )
                    })}
                </Box>
                {/* Add Button */}
                <Fab size={"medium"} color={"primary"} sx={{ position: "fixed", bottom: `${fabButtonOffset}px`, right: "24px" }} onClick={() => {
                    setDialogOpened(true);
                }}>
                    <Add />
                </Fab>
            </Box>
            <BottomNavigation
                sx={{
                    position: "sticky",
                    bottom: "0px",
                    width: "100%"
                }}
                showLabels
                value={bottomNavigation}
                onChange={(event, newValue) => {
                    setBottomNavigation(newValue);
                }}
            >
                <BottomNavigationAction label="Listen" icon={<List />} />
                <BottomNavigationAction label="Placeholder" icon={<LocalActivity />} />
                <BottomNavigationAction label="Placeholder" icon={<LocalActivity />} />
            </BottomNavigation>
            <RoomCreateChecklistDialog
                dialogOpened={dialogOpened}
                handleClose={() => setDialogOpened(false)}
                handleSubmit={async (listName) => {
                    await appFrame.withLoadingScreen(async () => {
                        if (room?.slug) {
                            await createCheckListMutation.mutateAsync({
                                name: listName,
                                roomSlug: room?.slug,
                            });
                        }
                    });
                }}
            />
        </AppFrame>
    );
});

export default GroupPage;