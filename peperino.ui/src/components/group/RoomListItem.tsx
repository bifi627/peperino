import { useRouter } from "next/router";
import { RoomOutDto } from "../../lib/api";
import { KnownRoutes } from "../../lib/routing/knownRoutes";

interface Props {
    room: RoomOutDto;
}

export const GroupListItem = (props: Props) => {
    const router = useRouter();

    return (
        <>
            <div onClick={() => {
                router.push(KnownRoutes.Room(props.room.slug));
            }}>
                Name: {props.room.roomName}
                <br />
                Slug: {props.room.slug}
            </div>
        </>
    );
}