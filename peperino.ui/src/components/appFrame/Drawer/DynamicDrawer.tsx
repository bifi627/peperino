import { ChevronLeft } from "@mui/icons-material";
import { Divider, Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { observer } from "mobx-react";
import { useApplicationState } from "../../../lib/state/ApplicationState";
import { DrawerItemInterface } from "./DrawerItem";

interface DynamicDrawerProps {
    items?: DrawerItemInterface[];
}

export const DynamicDrawer = observer((props: DynamicDrawerProps) => {

    const appFrame = useApplicationState().getAppFrame();

    const onItemClicked = async (item: DrawerItemInterface) => {
        appFrame.drawerOpened = false;
        await appFrame.withLoadingScreen(async () => {
            await item.action?.();
        });
    };

    return (
        <Drawer open={appFrame.drawerOpened} anchor={"left"} onClose={() => appFrame.drawerOpened = false}>
            <div style={{ width: 250 }}>
                <ListItem button onClick={() => appFrame.drawerOpened = false}>
                    <ListItemIcon><ChevronLeft /></ListItemIcon>
                    <ListItemText primary={"Close Menu"} />
                </ListItem>
                <Divider />
                {props.items?.map((drawerItem, index) => (
                    <div key={index}>
                        <ListItem button onClick={async () => onItemClicked(drawerItem)}>
                            <ListItemIcon>{drawerItem.icon}</ListItemIcon>
                            <ListItemText primary={drawerItem.text} />
                        </ListItem>
                        <>
                            {drawerItem.childItems?.map((childItem, childIndex) => (
                                <ListItem button key={childIndex} onClick={async () => onItemClicked(childItem)}>
                                    <ListItemIcon>{childItem.icon}</ListItemIcon>
                                    <ListItemText primary={childItem.text} />
                                </ListItem>
                            ))}
                        </>
                    </div>
                ))}
            </div>
        </Drawer>
    );
});
