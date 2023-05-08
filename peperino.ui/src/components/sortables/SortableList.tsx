import { Box, SxProps } from "@mui/material";
import { DragDropContext, Draggable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { SortableItem } from "./SortableItem";
import { StrictModeDroppable } from "./StrictModeDroppable";

interface Data {
    id: string | number;
}

interface Props<T> {
    onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
    data: T[];
    renderData: (item: T) => React.ReactNode;
    listBoxStyle?: SxProps;
    itemBoxStyle?: SxProps;
}

export function SortableList<T extends Data>(props: Props<T>) {

    return (
        <DragDropContext onDragEnd={props.onDragEnd}>
            <StrictModeDroppable direction="vertical" droppableId="droppable">
                {(provided, snapshot) => (
                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: "8px", padding: "8px", ...props.listBoxStyle }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {props.data.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <Box
                                        sx={{ ...props.itemBoxStyle }}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <SortableItem key={item.id} dragHandleProps={provided.dragHandleProps}>
                                            {props.renderData(item)}
                                        </SortableItem>
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
}