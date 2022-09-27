import { Add, GroupAdd, Person, Public } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CardAction } from "../../components/Common/Cards/CardAction";
import { ClientApi } from "../../lib/auth/client/apiClient";
import { useAuthGuard } from "../../lib/auth/client/useAuthGuard";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
}

const RoomsPage = observer((props: Props) => {
    useAuthGuard();
    const router = useRouter();
    const roomOverviewState = useApplicationState().getRoomsOverviewState();
    const appFrame = useApplicationState().getAppFrame();

    const initRooms = async () => {
        await appFrame.withLoadingScreen(async () => {
            roomOverviewState.rooms = await ClientApi.room.getAll()
        }, 0);
    }

    // Set the server sided loaded room to current state
    useEffect(() => {
        initRooms();
    }, []);

    // GroupName for input in dialog
    const [roomName, setRoomName] = useState("");

    // Set focus after opening dialog with delay
    const inputRef = useRef<HTMLInputElement>();
    useEffect(() => {
        if (roomOverviewState.dialogOpened === true) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 222)
        }
    }, [roomOverviewState.dialogOpened]);

    return (
        <>
            {roomOverviewState.rooms.length === 0 &&
                <CardAction key={"new"} leftIcon={<GroupAdd />} mainText={"Neuen Raum erstellen"} subTexts={[""]} actions={[{
                    id: "new",
                    action: () => roomOverviewState.dialogOpened = true,
                }]} />
            }
            <Box>
                {roomOverviewState.rooms.map(room => {

                    const icon = room.accessLevel === "Owner" ? <Person /> : <Public />;

                    return (
                        <CardAction key={room.slug} leftIcon={icon} mainText={room.roomName} subTexts={[room.createdBy.userName ?? ""]} actions={[{
                            id: room.slug,
                            action: async () => {
                                await appFrame.withLoadingScreen(async () => {
                                    await router.push(KnownRoutes.Room(room.slug));
                                });
                            },
                        }]} />
                    )
                })}
            </Box>
            <Fab size={"medium"} color={"primary"} sx={{ position: "fixed", bottom: "24px", right: "24px" }} onClick={() => {
                roomOverviewState.dialogOpened = true;
            }}>
                <Add />
            </Fab>
            <Dialog open={roomOverviewState.dialogOpened} onClose={() => roomOverviewState.dialogOpened = false}>
                <DialogTitle>Neue Gruppe erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        inputMode="text"
                        inputRef={inputRef}
                        value={roomName}
                        onChange={(s) => { setRoomName(s.target.value) }}
                        autoComplete="off"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => roomOverviewState.dialogOpened = false}>Abbrechen</Button>
                    <Button onClick={async () => {
                        await appFrame.withLoadingScreen(async () => {
                            roomOverviewState.dialogOpened = false;
                            await roomOverviewState.createGroup(roomName);
                            await roomOverviewState.reloadGroups();
                            setRoomName("");
                        });
                    }}>Erstellen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
});

export default RoomsPage;