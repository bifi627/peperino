import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { RoomOutDto, RoomService } from "../../../lib/api";
import { authPage, redirectLogin } from "../../../lib/auth/server/authPage";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";
import { useApplicationState } from "../../../lib/state/ApplicationState";

interface Props {
    room: RoomOutDto;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) === false) {
        return await redirectLogin<Props>(context.resolvedUrl);
    }

    const slug = context.query["slug"] as string;

    try {
        const group = await RoomService.getBySlug(slug);
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
}

const GroupPage = (props: Props) => {

    const groupPageState = useApplicationState().getRoomState();

    useEffect(() => {
        groupPageState.room = props.room;
    }, [])

    return (
        <>Group Page {props.room?.roomName} </>
    );
}

export default GroupPage;