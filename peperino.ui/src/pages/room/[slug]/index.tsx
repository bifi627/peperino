import { Add, List, LocalActivity } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CardListItem } from "../../../components/room/overview/CardListItem";
import { RoomOutDto } from "../../../lib/api";
import { withAuth } from "../../../lib/auth/server/authPage";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";
import { useApplicationState } from "../../../lib/state/ApplicationState";

interface Props {
    room: RoomOutDto;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    return withAuth(context, [], async (result) => {
        const slug = context.query["slug"] as string;

        try {
            const group = await result.api.room.getBySlug(slug);
            return {
                props: {
                    room: group,
                }
            };
        } catch (error: any) {
            console.error(error);
            return {
                props: {
                },
                notFound: true,
                redirect: {
                    destination: KnownRoutes.Room(),
                }
            }
        }
    });
}

const GroupPage = observer((props: Props) => {

    const router = useRouter();

    const roomPageState = useApplicationState().getRoomState();
    const appFrame = useApplicationState().getAppFrame();

    useEffect(() => {
        roomPageState.room = props.room;
        roomPageState.checkLists = props.room.checkLists;

        roomPageState.updateToolbar();
    }, [])

    const [bottomNavigation, setBottomNavigation] = useState(0);

    const inputRef = useRef<HTMLInputElement>();

    const [listName, setListName] = useState("");

    return (
        <>
            <div style={{ minHeight: "calc(100% - 60px - 56px)", paddingBottom: "60px" }}>
                <>Group Page {props.room?.roomName} </>
                {"TEXT"}
                <>TEXT</>
                <br></br>
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
                <Fab size={"medium"} color={"primary"} sx={{ position: "fixed", bottom: "64px", right: "24px" }} onClick={() => {
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