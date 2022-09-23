import { Add, List, LocalActivity } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CardListItem } from "../../../components/room/overview/CardListItem";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useAuthGuard } from "../../../lib/auth/client/useAuthGuard";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";
import { useApplicationState } from "../../../lib/state/ApplicationState";

interface Props {
}

const GroupPage = observer((props: Props) => {
    useAuthGuard();

    const router = useRouter();

    const initRooms = async () => {
        const slug = router.query["slug"] as string ?? "";
        const room = await ClientApi.room.getBySlug(slug);
        roomPageState.room = room;
        roomPageState.checkLists = room.checkLists;
        roomPageState.updateToolbar();
    }

    const roomPageState = useApplicationState().getRoomState();
    const appFrame = useApplicationState().getAppFrame();

    useEffect(() => {
        initRooms();
    }, [])

    const [bottomNavigation, setBottomNavigation] = useState(0);

    const inputRef = useRef<HTMLInputElement>();

    const [listName, setListName] = useState("");

    const fabButtonOffset = 64;

    return (
        <>
            <div style={{ minHeight: `calc(100% - ${(fabButtonOffset - 4) * 2}px)`, paddingBottom: `${fabButtonOffset - 4}px` }}>
                <Box>
                    {roomPageState.checkLists?.map(list => {
                        return (
                            <CardListItem key={list.slug} mainText={list.name} subTexts={[`${list.entities.length} Einträge`]} onSelect={() => {
                                appFrame.withLoadingScreen(async () => {
                                    await router.push(KnownRoutes.CheckList(list.slug));
                                });
                            }} />
                        )
                    })}
                </Box>
                <Fab size={"medium"} color={"primary"} sx={{ position: "fixed", bottom: `${fabButtonOffset}px`, right: "24px" }} onClick={() => {
                    roomPageState.addCheckListDialogOpened = true;
                }}>
                    <Add />
                </Fab>
            </div>
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
            <Dialog open={roomPageState.addCheckListDialogOpened} onClose={() => roomPageState.addCheckListDialogOpened = false}>
                <DialogTitle>Neue Gruppe erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        inputMode="text"
                        inputRef={inputRef}
                        value={listName}
                        onChange={(s) => { setListName(s.target.value) }}
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
                    <Button onClick={() => roomPageState.addCheckListDialogOpened = false}>Abbrechen</Button>
                    <Button onClick={async () => {
                        await appFrame.withLoadingScreen(async () => {
                            roomPageState.addCheckListDialogOpened = false;
                            await roomPageState.createCheckList(listName);
                            await roomPageState.reloadCheckLists();
                            setListName("");
                        });
                    }}>Erstellen</Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default GroupPage;