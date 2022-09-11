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
    if (await authPage(context) !== "VALID") {
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

const GroupSettingsPage = (props: Props) => {
    const groupSettingsState = useApplicationState().getRoomSettingsState();

    useEffect(() => {
        groupSettingsState.room = props.room;
    }, [])

    return (
        <>GroupSettingsPage FOLDER - {props.room.roomName} - {props.room.createdBy.userName}</>
    );
}

export default GroupSettingsPage;