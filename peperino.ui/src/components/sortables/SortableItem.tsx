import { DragHandle } from "@mui/icons-material";
import { Box, Icon } from "@mui/material";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface Props {
    dragHandleProps?: DraggableProvidedDragHandleProps;
    children: React.ReactNode;
}

export const SortableItem = (props: Props) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="baseline" >
            <Icon {...props.dragHandleProps}>
                <DragHandle />
            </Icon>
            {props.children}
        </Box >
    );
}