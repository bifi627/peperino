import { MoveUp, Send } from "@mui/icons-material";
import { Autocomplete, Box, Button, TextField, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { CheckListItem } from "../../components/checklist/CheckListItem";
import { SortableList } from "../../components/sortables/SortableList";
import { BaseCheckListItemOutDto, CheckListOutDto } from "../../lib/api";
import { isTextItem } from "../../lib/apiHelper/checkListItemGuards";
import { useAuthGuard } from "../../lib/auth/client/useAuthGuard";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    checkList: CheckListOutDto;
}

const CheckListPage = observer((props: Props) => {
    useAuthGuard();

    const router = useRouter();

    const theme = useTheme();

    const checklistState = useApplicationState().getChecklistState();
    const appFrame = useApplicationState().getAppFrame();

    const initCheckList = async () => {
        try {
            const slug = router.query["slug"] as string ?? "";
            await checklistState.pageInit(slug);
            await checklistState.connectSignalR();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { autoClose: 1000 });
                setTimeout(() => {
                    router.push(KnownRoutes.Root());
                }, 1000);
            }
        }
    }

    useEffect(() => {
        initCheckList();
        return () => {
            checklistState.disconnectSignalR();
        }
    }, []);

    if (!checklistState.checkList) {
        return <></>;
    }

    const moveItems = async (sourceArray: BaseCheckListItemOutDto[], from: number, to: number) => {
        await checklistState.moveItems(sourceArray, from, to);
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

        const uniqueItems = new Set(checklistState.checkList?.entities.filter(e => isTextItem(e)).map(e => isTextItem(e) ? e.text : ""));
        const result = [...uniqueItems.values()]
        return result;
    }

    return (
        <>
            {checklistState.checkList &&
                <>
                    <Box sx={{ minHeight: "100%" }} display="flex" flexDirection="column" gap={1}>
                        <SortableList
                            data={checklistState.uncheckedItems}
                            onDragEnd={onUncheckedDragEnd}
                            renderData={item => {
                                if (isTextItem(item)) {
                                    return <CheckListItem checkList={checklistState.checkList!} item={item} />;
                                }
                                return <div>unknown item...</div>;
                            }}
                        />

                        <form style={{ display: "flex", flexDirection: "row", gap: "6px" }} onSubmit={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (checklistState.inputValue !== "") {
                                const text = checklistState.inputValue;
                                checklistState.inputValue = "";
                                await checklistState.addTextItem(text);
                                await checklistState.reloadList();
                            }
                        }}>
                            <Autocomplete inputValue={checklistState.inputValue} onInputChange={(_, value) => checklistState.inputValue = value} inputMode="search" options={getAutoCompleteOptions()} freeSolo fullWidth renderInput={params =>
                                <TextField autoFocus {...params} sx={{ paddingLeft: 2 }} fullWidth size="small" />
                            }></Autocomplete>
                            <Button type="submit">
                                {checklistState.checkList.entities.filter(e => isTextItem(e)).find(e => isTextItem(e) && e.text === checklistState.inputValue) === undefined ? <Send /> : <MoveUp />}
                            </Button>
                        </form>

                        <SortableList
                            data={checklistState.checkedItems}
                            onDragEnd={onCheckedDragEnd}
                            renderData={item => {
                                if (isTextItem(item)) {
                                    return <CheckListItem checkList={checklistState.checkList!} item={item} />;
                                }
                                return <div>unknown item...</div>;
                            }}
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
            }
        </>
    );
});

export default CheckListPage;

