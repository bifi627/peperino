import { Box, TextField } from "@mui/material";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable, resetServerContext } from "react-beautiful-dnd";
import { CheckListItem } from "../../components/checklist/CheckListItem";
import { CheckListItemOutDto, CheckListOutDto } from "../../lib/api";
import { ClientApi } from "../../lib/auth/client/apiClient";
import { withAuth } from "../../lib/auth/server/authPage";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    checkList: CheckListOutDto;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    return withAuth(context, [], async (result) => {
        const slug = context.query["slug"] as string;

        try {
            const checkList = await result.api.checkList.getCheckListBySlug(slug)
            return {
                props: {
                    checkList: checkList,
                }
            };
        } catch (error: any) {
            console.error(error);
            return {
                props: {
                },
                notFound: true,
                redirect: {
                    destination: KnownRoutes.Root(),
                }
            }
        }
    });
}

resetServerContext();

const CheckListPage = observer((props: Props) => {

    const checklistState = useApplicationState().getChecklistState();
    const appFrame = useApplicationState().getAppFrame();

    useEffect(() => {
        checklistState.checkList = props.checkList;
    }, [])

    const inputRef = useRef<HTMLInputElement>();

    const checkedItems = checklistState.checkList?.entities.slice().filter(e => e.checked === true).sort((a, b) => a.sortIndex - b.sortIndex);
    const unCheckedItems = checklistState.checkList?.entities.slice().filter(e => e.checked === false).sort((a, b) => a.sortIndex - b.sortIndex);

    if (!checkedItems || !unCheckedItems) {
        return <></>;
    }

    const moveItems = async (sourceArray: CheckListItemOutDto[], from: number, to: number) => {
        const tempList = [...sourceArray];
        arrayMoveMutable(tempList, from, to);
        tempList.forEach((item, i) => {
            item.sortIndex = i;
        });
        await appFrame.withLoadingScreen(async () => {
            await ClientApi.checkList.arrangeSortIndex(props.checkList.slug, checklistState.checkList.entities);
        });
    }

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <DragDropContext onDragEnd={(result) => {
                if (result.destination) {
                    moveItems(unCheckedItems, result.source.index, result.destination.index)
                }
            }}>
                <Droppable direction="vertical" droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {unCheckedItems.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            style={{ backgroundColor: "rebeccapurple", width: "50px", height: "50px" }}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <div {...provided.dragHandleProps}>DragHandle</div>
                                            <CheckListItem checkList={checklistState.checkList} item={item}></CheckListItem>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <TextField inputRef={inputRef} fullWidth onKeyDown={(e) => {
                if (inputRef.current && e.key === "Enter") {
                    const text = inputRef.current.value;
                    const ref = inputRef.current;
                    appFrame.withLoadingScreen(async () => {
                        await checklistState.addItem(text);
                        await checklistState.reloadList();
                        ref.value = "";
                    });
                }
            }} size="small" />
            <DragDropContext onDragEnd={(result) => {
                if (result.destination) {
                    moveItems(checkedItems, result.source.index, result.destination.index)
                }
            }}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {checkedItems.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            style={{ backgroundColor: "rebeccapurple", width: "50px", height: "50px" }}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <div {...provided.dragHandleProps}>DragHandle</div>
                                            <CheckListItem checkList={checklistState.checkList} item={item}></CheckListItem>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
});

export default CheckListPage;

function arrayMoveMutable(array: any[], fromIndex: number, toIndex: number) {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

        const [item] = array.splice(fromIndex, 1);
        array.splice(endIndex, 0, item);
    }
}