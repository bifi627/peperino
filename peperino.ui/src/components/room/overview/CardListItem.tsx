import { ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack } from "@mui/material";

interface Props {
    onSelect?: () => void;
    mainText: string;
    subTexts?: string[];
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const CardListItem = (props: Props) => {
    return (
        <Stack padding={1.5}>
            <Paper elevation={2}>
                <Box padding={2} display={"flex"} justifyContent={"space-between"} gap={2} onClick={() => props.onSelect?.()}>
                    {props.leftIcon && <IconButton>
                        {props.leftIcon}
                    </IconButton>}
                    <Box display={"flex"} flexDirection={"column"}>
                        <span>{props.mainText}</span>
                        {props.subTexts?.map(text => {
                            return <span key={text} style={{ fontSize: "12px" }}>{text}</span>
                        })}
                    </Box>
                    {props.onSelect && <IconButton onClick={() => {
                        props.onSelect?.();
                    }}>
                        <Paper elevation={3} sx={{ borderRadius: 20, padding: 1, display: "flex" }}>
                            {props.rightIcon ?? <ChevronRight />}
                        </Paper>
                    </IconButton>}
                </Box>
            </Paper>
        </Stack>
    );
}
