import { Add, GroupAdd, Person, Public } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { CardAction } from "../../components/Common/Cards/CardAction";
import { AppFrame } from "../../components/appFrame/AppFrame";
import { RoomCardAction } from "../../components/pages/room/RoomCardAction";
import { RoomCreateDialog } from "../../components/pages/room/dialogs/RoomCreateDialog";
import { RoomQueries } from "../../hooks/queries/roomQueries";
import { useClientAuthGuard } from "../../lib/auth/client/useClientAuthGuard";
import { useAppFrameConfig } from "../../lib/hooks/useAppFrameConfig";
import { useApplicationState } from "../../lib/state/ApplicationState";

const RoomsPage = observer(() => {
    useClientAuthGuard();

    const appFrame = useApplicationState().getAppFrame();
    const appFrameConfig = useAppFrameConfig();

    const [dialogOpened, setDialogOpened] = useState(false);

    const queryClient = useQueryClient();
    const getAllRoomsQuery = RoomQueries.useGetAllRoomsQuery();
    const createRoomMutation = RoomQueries.useCreateRoomMutation(queryClient, () => setDialogOpened(false));

    const rooms = getAllRoomsQuery.data;

    useEffect(() => {
        console.log(appFrameConfig.toolbarText);
        appFrameConfig.toolbarText = "Raumübersicht";
        appFrameConfig.contextMenuActions = [
            {
                id: "add",
                action: () => {
                    setDialogOpened(true);
                    return Promise.resolve();
                },
                icon: <Add />,
                text: "add",
            }
        ];
    }, [appFrameConfig]);

    return (
        <AppFrame
            toolbarText="Räume"
            menuActions={[
                {
                    id: "add",
                    action: () => {
                        setDialogOpened(true);
                        return Promise.resolve();
                    },
                    icon: <Add />,
                    text: "add",
                }
            ]}
        >
            {/* Placeholder */}
            {rooms?.length === 0 &&
                <CardAction key={"new"} leftIcon={<GroupAdd />} mainText={"Neuen Raum erstellen"} subTexts={[""]} actions={[{
                    id: "new",
                    action: () => setDialogOpened(true),
                }]} />
            }
            {/* Room Cards */}
            <Box>
                {rooms?.map(room => {
                    const icon = room.accessLevel === "Owner" ? <Person /> : <Public />;
                    return (
                        <RoomCardAction
                            key={room.slug}
                            slug={room.slug}
                            leftIcon={icon}
                            mainText={room.roomName}
                            subTexts={[room.createdBy?.userName ?? ""]}
                        />
                    )
                })}
            </Box>
            {/* Add Button */}
            <Fab
                size={"medium"}
                color={"primary"}
                sx={{ position: "fixed", bottom: "24px", right: "24px" }}
                onClick={() => {
                    setDialogOpened(true);
                }}>
                <Add />
            </Fab>
            {/* Dialog */}
            <RoomCreateDialog
                dialogOpened={dialogOpened}
                handleClose={() => setDialogOpened(false)}
                handleSubmit={async (roomName) => {
                    await appFrame.withLoadingScreen(async () => {
                        await createRoomMutation.mutateAsync(roomName);
                    });
                }}
            />
        </AppFrame>
    )
});

export default RoomsPage;