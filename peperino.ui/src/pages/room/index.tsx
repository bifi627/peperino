import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { isObservableArray } from "mobx";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { GroupListItem as RoomListItem } from "../../components/group/RoomListItem";
import { RoomOutDto, RoomService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    rooms: RoomOutDto[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) !== "VALID") {
        return await redirectLogin<Props>(context.resolvedUrl);
    }

    const rooms = await RoomService.getAll();

    return {
        props: {
            rooms: rooms
        }
    };
}

const GroupsPage = observer((props: Props) => {
    const roomOverviewState = useApplicationState().getRoomsOverviewState();

    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        if (isObservableArray(roomOverviewState.rooms)) {
            roomOverviewState.rooms.replace(props.rooms);
        }
    }, [])

    return (
        <>
            <>You have access to {roomOverviewState.rooms?.length} groups.</>
            <div>
                {roomOverviewState.rooms.map(room => {
                    return (
                        <RoomListItem key={room.slug} room={room}></RoomListItem>
                    )
                })}
            </div>
            <Dialog open={roomOverviewState.dialogOpened} onClose={() => roomOverviewState.dialogOpened = false}>
                <DialogTitle>Neue Gruppe erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        value={groupName}
                        onChange={(s) => { setGroupName(s.target.value) }}
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
                        await roomOverviewState.createGroup(groupName)
                        await roomOverviewState.reloadGroups();
                        roomOverviewState.dialogOpened = false;
                    }}>Erstellen</Button>
                </DialogActions>
            </Dialog>
        </>
    )
});

export default GroupsPage;