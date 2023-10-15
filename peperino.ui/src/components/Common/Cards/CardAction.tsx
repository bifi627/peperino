import { ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack } from "@mui/material";
import { ButtonAction } from "../../../lib/appFrame/Action";

export interface MyCardActionProps {
    mainText: string;
    subTexts?: string[];
    leftIcon?: React.ReactNode;
    disabled?: boolean;
    actions?: ButtonAction[];
}

export const CardAction = (props: MyCardActionProps) => {
    const actions = props.actions ?? [];
    return (
        <Stack sx={{ opacity: props.disabled ? ".25" : "1" }} padding={1.5} width="100%">
            <Paper elevation={2}>
                <Box padding={2} display={"flex"} justifyContent={"space-between"} alignItems="center" gap={2} onClick={() => actions.length === 1 ? actions[0].action() : {}}>
                    {props.leftIcon && <IconButton>
                        {props.leftIcon}
                    </IconButton>}
                    <Box display={"flex"} flexDirection={"column"}>
                        <span>{props.mainText}</span>
                        {props.subTexts?.map(text => {
                            return <span key={text} style={{ fontSize: "12px" }}>{text}</span>
                        })}
                    </Box>
                    <Box>
                        {actions.map(action => {
                            return (
                                <IconButton key={action.id} onClick={() => {
                                    action.disabled !== true && action.action();
                                }}>
                                    <Paper elevation={3} sx={{ borderRadius: 20, padding: 1, display: "flex" }}>
                                        {action.icon ?? <ChevronRight />}
                                    </Paper>
                                </IconButton>
                            );
                        })}
                    </Box>
                </Box>
            </Paper>
        </Stack>
    );
}
