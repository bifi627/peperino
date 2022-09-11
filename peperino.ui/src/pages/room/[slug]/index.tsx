import { GetServerSideProps } from "next";
import { useEffect } from "react";
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

const GroupPage = (props: Props) => {

    const groupPageState = useApplicationState().getRoomState();

    useEffect(() => {
        groupPageState.room = props.room;
        groupPageState.updateToolbar();
    }, [])

    return (
        <>Group Page {props.room?.roomName} </>
    );
}

export default GroupPage;