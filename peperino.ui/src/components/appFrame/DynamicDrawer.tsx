import { Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { observer } from "mobx-react";
import { useApplicationState } from "../../lib/state/ApplicationState";

export interface DrawerItemProps {
    text: string;
    icon: React.ReactNode;
    action?: () => Promise<unknown>;
    isSelected?: () => boolean;
    childItems?: DrawerItemProps[];
}

interface DynamicDrawerProps {
    items?: DrawerItemProps[];
}

export const DynamicDrawer = observer((props: DynamicDrawerProps) => {

    const appFrame = useApplicationState().getAppFrame();

    const onItemClicked = async (item: DrawerItemProps) => {
        appFrame.drawerOpened = false;
        await appFrame.withLoadingScreen(async () => {
            await item.action?.();
        });
    };

    return (
        <Drawer PaperProps={{ style: { top: "64px" } }} open={appFrame.drawerOpened} anchor={"left"} onClose={() => appFrame.drawerOpened = false}>
            <div style={{ width: 250 }}>
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
