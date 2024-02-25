import { Person, Public } from "@mui/icons-material";
import { Box } from "@mui/material";
import { getServerApiClientV2 } from "../../../lib/auth/server/apiClient";
import { RoomCardAction } from "./(components)/RoomCardAction";

export default async function Page() {
    const rooms = await getServerApiClientV2().room.getAll();

    return (
        <>
            <Box>
                {rooms?.map((room) => {
                    const icon = room.accessLevel === "Owner" ? <Person /> : <Public />;
                    return (
                        <RoomCardAction
                            key={room.slug}
                            slug={room.slug}
                            leftIcon={icon}
                            mainText={room.roomName}
                            subTexts={[room.createdBy?.userName ?? ""]}
                        />
                    );
                })}
            </Box>
        </>
    );
}
