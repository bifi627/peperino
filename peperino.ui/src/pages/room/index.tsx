import { Add, Person, Public } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import { isObservableArray } from "mobx";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { GroupListItem as RoomListItem } from "../../components/room/overview/RoomListItem";
import { RoomOverviewHeader } from "../../components/room/overview/RoomOverviewHeader";
import { AccessLevel, RoomOutDto, RoomService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    rooms: RoomOutDto[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    return withAuth(context, [], async (result) => {
        const rooms = await result.api.room.getAll();

        return {
            props: {
                rooms: rooms
            }
        };
    });
}

const GroupsPage = observer((props: Props) => {
    const router = useRouter();
    const roomOverviewState = useApplicationState().getRoomsOverviewState();
    const appFrame = useApplicationState().getAppFrame();

    // Set the server sided loaded room to current state
    useEffect(() => {
        if (isObservableArray(roomOverviewState.rooms)) {
            roomOverviewState.rooms.replace(props.rooms);
        }
    }, [props.rooms, roomOverviewState.rooms]);

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
            <RoomOverviewHeader count={roomOverviewState.rooms.length} />
            <Box>
                {roomOverviewState.rooms.map(room => {

                    const icon = room.accessLevel === AccessLevel.OWNER ? <Person /> : <Public />;

                    return (
                        <RoomListItem key={room.slug} leftIcon={icon} mainText={room.roomName} subTexts={[room.createdBy.userName ?? ""]} onSelect={() => {
                            appFrame.withLoadingScreen(async () => {
                                await router.push(KnownRoutes.Room(room.slug));
                            });
                        }}></RoomListItem>
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
                            await roomOverviewState.createGroup(roomName);
                            await roomOverviewState.reloadGroups();
                            roomOverviewState.dialogOpened = false;
                            setRoomName("");
                        });
                    }}>Erstellen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
});

export default GroupsPage;