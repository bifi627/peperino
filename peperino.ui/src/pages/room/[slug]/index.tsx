import { Favorite, LocalActivity, Restore } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { RoomOutDto, RoomService } from "../../../lib/api";
import { authPage, redirectLogin } from "../../../lib/auth/server/authPage";
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

const GroupPage = (props: Props) => {

    const groupPageState = useApplicationState().getRoomState();

    useEffect(() => {
        groupPageState.room = props.room;
        groupPageState.updateToolbar();
    }, [])

    const [bottomNavigation, setBottomNavigation] = useState(0);

    return (
        <>
            <div style={{ minHeight: "calc(100% - 60px - 56px)", paddingBottom: "60px" }}>
                <>Group Page {props.room?.roomName} </>
                {"TEXT"}
                <>TEXT</>
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
                <BottomNavigationAction label="Recents" icon={<Restore />} />
                <BottomNavigationAction label="Favorites" icon={<Favorite />} />
                <BottomNavigationAction label="Nearby" icon={<LocalActivity />} />
            </BottomNavigation>
        </>
    );
}

export default GroupPage;