import { Box } from "@mui/material";

interface Props {
    count: number;
}

export const RoomOverviewHeader = (props: Props) => {
    return (
        <>
            {props.count === 0 &&
                <Box display={"flex"} flexDirection={"column"} padding={2} gap={2}>
                    <span>{"Du hast noch keinen Zugriff auf einen Raum :-("}</span>
                    <span>{"Erstelle deinen eigenen Raum über den Button oben rechts."}</span>
                    <span>{"Oder lasse dir einen Link schicken, um einem bestehenden Raum beizutreten."}</span>
                </Box>
            }
        </>
    );
};
