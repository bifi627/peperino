import { DeleteForever, Person } from "@mui/icons-material";
import { Box, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { UserOutDto } from "../../../lib/api";
import { CardAction } from "./CardAction";

interface Props {
    users: UserOutDto[];
    onDelete: (user: UserOutDto) => void | Promise<void>;
}

export const UserCardAction = (props: Props) => {
    const [search, setSearch] = useState("");
    return (
        <Stack padding={1.5} width="100%">
            <Paper elevation={2}>
                <p style={{ paddingLeft: "16px" }}>Andere Benutzer in diesem Raum:</p>
                <TextField type="search" size="small" sx={{ padding: 2 }} fullWidth value={search} onChange={e => setSearch(e.currentTarget.value)} />
                <Box
                    overflow={"scroll"}
                    maxHeight={"300px"}
                    padding={.3}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems="center">
                    {props.users.filter(u => u.id.toLowerCase().includes(search.toLowerCase()) || u.userName.toLowerCase().includes(search.toLowerCase())).map(user => {
                        return (
                            <div style={{ width: "100%" }} key={user.id}>
                                <CardAction
                                    leftIcon={<Person />}
                                    mainText={user.userName}
                                    subTexts={[user.id]}
                                    actions={[{
                                        id: "delete",
                                        destructive: true,
                                        icon: <DeleteForever />,
                                        action: () => props.onDelete(user),
                                    }]}
                                />
                            </div>
                        );
                    })}
                </Box>
            </Paper>
        </Stack >
    );
}