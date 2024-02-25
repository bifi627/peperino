import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Divider, Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { DrawerItemInterface } from "../../../../../components/appFrame/Drawer/DrawerItem";
import { wait } from "../../../../../lib/helper/common";

interface Props {
    items?: DrawerItemInterface[];
    opened: boolean;
    onClose: () => void;
    onClick: (item: DrawerItemInterface) => Promise<unknown> | unknown;
}

export const MenuDrawer = (props: Props) => {
    const onItemClicked = async (item: DrawerItemInterface) => {
        if (item.childItems?.length === 0) {
            props.onClose();
        }
        await wait(10);
        await props.onClick(item);
    };

    return (
        <Drawer open={props.opened} anchor={"left"} onClose={props.onClose}>
            <Box sx={{ width: 250 }}>
                <ListItem onClick={props.onClose} sx={{ height: "56px" }}>
                    <ListItemIcon>
                        <ChevronLeft />
                    </ListItemIcon>
                    <ListItemText primary={"Schließen"} />
                </ListItem>
                <Divider />
                {props.items?.map((drawerItem, index) => (
                    <div key={index}>
                        <ListItem onClick={async () => await onItemClicked(drawerItem)}>
                            {/*  */}
                            <ChevronRight
                                sx={{
                                    visibility:
                                        (drawerItem.childItems?.filter((i) => i.visible).length ?? 0) > 0
                                            ? undefined
                                            : "hidden",
                                }}
                            />
                            <ListItemIcon>{drawerItem.icon}</ListItemIcon>
                            <ListItemText primary={drawerItem.text} />
                        </ListItem>
                        {(drawerItem.childItems?.filter((i) => i.visible).length ?? 0) > 0 && (
                            <Box sx={{ paddingLeft: "35px" }}>
                                {drawerItem.childItems?.map((childItem, childIndex) => (
                                    <ListItem key={childIndex} onClick={async () => await onItemClicked(childItem)}>
                                        <ListItemIcon>{childItem.icon}</ListItemIcon>
                                        <ListItemText primary={childItem.text} />
                                    </ListItem>
                                ))}
                            </Box>
                        )}
                    </div>
                ))}
            </Box>
        </Drawer>
    );
};
