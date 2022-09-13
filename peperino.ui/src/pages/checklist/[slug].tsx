import { TextField } from "@mui/material";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useEffect, useRef } from "react";
import { CheckListOutDto } from "../../lib/api";
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

    const checklistState = useApplicationState().getChecklistState();
    const appFrame = useApplicationState().getAppFrame();

    useEffect(() => {
        checklistState.checkList = props.checkList;
    }, [])

    const inputRef = useRef<HTMLInputElement>();

    return (
        <>
            {checklistState.checkList?.entities.slice().sort((a, b) => a.sortIndex - b.sortIndex).map(e => {
                return (
                    <div onClick={() => {
                        appFrame.withLoadingScreen(async () => {
                            await checklistState.deleteItem(e.id);
                            await checklistState.reloadList();
                        });
                    }} key={e.id}>{e.text}</div>
                )
            })}
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
        </>
    );
});

export default CheckListPage;