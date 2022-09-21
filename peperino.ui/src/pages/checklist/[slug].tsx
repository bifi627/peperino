import { MoveUp, Send } from "@mui/icons-material";
import { Autocomplete, Box, Button, TextField, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { DropResult } from "react-beautiful-dnd";
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

const CheckListPage = observer((props: Props) => {

    const theme = useTheme();

    const checklistState = useApplicationState().getChecklistState();
    const appFrame = useApplicationState().getAppFrame();

    useEffect(() => {
        checklistState.checkList = props.checkList;
        checklistState.connectSignalR();
        return () => {
            checklistState.disconnectSignalR();
        }
    }, []);

    if (!checklistState.checkList) {
        return <></>;
    }

    const moveItems = async (sourceArray: CheckListItemOutDto[], from: number, to: number) => {
        await appFrame.withLoadingScreen(async () => {
            await checklistState.moveItems(sourceArray, from, to);
        });
    }

    const onUncheckedDragEnd = (result: DropResult) => {
        if (result.destination) {
            moveItems(checklistState.uncheckedItems, result.source.index, result.destination.index)
        }
    }

    const onCheckedDragEnd = (result: DropResult) => {
        if (result.destination) {
            moveItems(checklistState.checkedItems, result.source.index, result.destination.index)
        }
    }

    const getAutoCompleteOptions = () => {
        if (checklistState.inputValue.length < 3) {
            return [];
        }

        const uniqueItems = new Set(checklistState.checkList?.entities.map(e => e.text));
        const result = [...uniqueItems.values()]
        return result;
    }

    return (
        <>
            <Box sx={{ minHeight: "100%" }} display="flex" flexDirection="column" gap={1}>
                <SortableList
                    data={checklistState.uncheckedItems}
                    onDragEnd={onUncheckedDragEnd}
                    renderData={item => <CheckListItem checkList={checklistState.checkList} item={item} />}
                />

                <form style={{ display: "flex", flexDirection: "row", gap: "6px" }} onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (checklistState.inputValue !== "") {
                        appFrame.withLoadingScreen(async () => {
                            await checklistState.addItem(checklistState.inputValue);
                            await checklistState.reloadList();
                            checklistState.inputValue = "";
                        });
                    }
                }}>
                    <Autocomplete inputValue={checklistState.inputValue} onInputChange={(_, value) => checklistState.inputValue = value} inputMode="search" options={getAutoCompleteOptions()} freeSolo fullWidth renderInput={params =>
                        <TextField {...params} sx={{ paddingLeft: 2 }} fullWidth size="small" />
                    }></Autocomplete>
                    <Button type="submit">
                        {checklistState.checkList.entities.find(e => e.text === checklistState.inputValue) === undefined ? <Send /> : <MoveUp />}
                    </Button>
                </form>

                <SortableList
                    data={checklistState.checkedItems}
                    onDragEnd={onCheckedDragEnd}
                    renderData={item => <CheckListItem checkList={checklistState.checkList} item={item} />}
                />
            </Box>
            <Box sx={{
                position: "sticky",
                bottom: "8px",
                width: "100%"
            }}>
                {checklistState.ConnectionState !== "Connected" && (
                    <Box color="error" sx={{ width: "12px", height: "12px", margin: 2, backgroundColor: theme.palette.error.main, borderRadius: "22px" }} />
                )}
            </Box>
        </>

    );
});

export default CheckListPage;

