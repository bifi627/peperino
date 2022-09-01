import { Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { observer } from "mobx-react";
import { useApplicationState } from "../../lib/state/ApplicationState";

export interface DrawerItemProps {
    text: string;
    icon: React.ReactNode;
    action: () => Promise<unknown>;
}

interface DynamicDrawerProps {
    items?: DrawerItemProps[];
}

export const DynamicDrawer = observer((props: DynamicDrawerProps) => {

    const appState = useApplicationState();

    const getList = () => (
        <div style={{ width: 250 }} onClick={() => appState.drawerOpened = false}>
            {props.items?.map((item, index) => (
                <ListItem button key={index} onClick={async () => {
                    await item.action();
                    appState.drawerOpened = false;
                }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </div>
    );

    return (
        <Drawer PaperProps={{ style: { top: "64px" } }} open={appState.drawerOpened} anchor={"left"} onClose={() => appState.drawerOpened = false}>
            {getList()}
        </Drawer>
    );
});
