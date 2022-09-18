import { Send } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useEffect, useRef } from "react";
import { DropResult, resetServerContext } from "react-beautiful-dnd";
import { CheckListItem } from "../../components/checklist/CheckListItem";
import { SortableList } from "../../components/sortables/SortableList";
import { CheckListItemOutDto, CheckListOutDto } from "../../lib/api";
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
        checklistState.connectSignalR();
        return () => {
            checklistState.disconnectSignalR();
        }
    }, [])

    const inputRef = useRef<HTMLInputElement>();

    const checkedItems = checklistState.checkList?.entities.slice().filter(e => e.checked === true).sort((a, b) => a.sortIndex - b.sortIndex);
    const unCheckedItems = checklistState.checkList?.entities.slice().filter(e => e.checked === false).sort((a, b) => a.sortIndex - b.sortIndex);

    if (!checkedItems || !unCheckedItems) {
        return <></>;
    }

    const moveItems = async (sourceArray: CheckListItemOutDto[], from: number, to: number) => {
        await appFrame.withLoadingScreen(async () => {
            await checklistState.moveItems(sourceArray, from, to);
        });
    }

    const onUncheckedDragEnd = (result: DropResult) => {
        if (result.destination) {
            moveItems(unCheckedItems, result.source.index, result.destination.index)
        }
    }

    const onCheckedDragEnd = (result: DropResult) => {
        if (result.destination) {
            moveItems(checkedItems, result.source.index, result.destination.index)
        }
    }

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <SortableList
                data={unCheckedItems}
                onDragEnd={onUncheckedDragEnd}
                renderData={item => <CheckListItem checkList={checklistState.checkList} item={item} />}
            />

            <form style={{ display: "flex", flexDirection: "row", gap: "6px" }} onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                if (inputRef.current && inputRef.current.value !== "") {
                    const text = inputRef.current.value;
                    const ref = inputRef.current;
                    appFrame.withLoadingScreen(async () => {
                        await checklistState.addItem(text);
                        await checklistState.reloadList();
                        ref.value = "";
                    });
                }
            }}>
                <TextField sx={{ paddingLeft: 2 }} inputRef={inputRef} fullWidth size="small" />
                <Button type="submit">
                    <Send />
                </Button>
            </form>

            <SortableList
                data={checkedItems}
                onDragEnd={onCheckedDragEnd}
                renderData={item => <CheckListItem checkList={checklistState.checkList} item={item} />}
            />
        </Box>
    );
});

export default CheckListPage;

