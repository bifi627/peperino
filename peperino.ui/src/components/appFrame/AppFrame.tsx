import { AppBar, Toolbar } from "@mui/material";
import { DynamicToolbar } from "./DynamicToolbar";

interface Props {
    children?: React.ReactNode;
}
export const AppFrame = (props: Props) => {

    return (
        <div style={{ height: "100vh" }}>
            <AppBar position="fixed">
                <DynamicToolbar />
            </AppBar>
            <Toolbar />
            {props.children}
        </div>
    );
}