import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { observer } from "mobx-react"; // Or "mobx-react".
import { GetServerSideProps } from "next";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserStoreService } from "../../lib/api";
import { AppFrameConfig } from "../../lib/appFrame/AppFrameConfig";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";
import { useUserStore } from "../../lib/hooks/useUserStore";
import { CommonApplicationObject, useCommonApplicationState } from "../../lib/state/ApplicationState";

interface Props {
    index: number;
}

const COUNTER_STORE_INDEX = "COUNTER";


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) === false) {
        return await redirectLogin<Props>(context.resolvedUrl);
    }

    const userStore = await UserStoreService.getApiUserStore();

    return {
        props: {
            index: Number.parseInt(JSON.parse(userStore.keyValueStorage[COUNTER_STORE_INDEX]))
        }
    };
}

let updater: Dispatch<SetStateAction<number>>;
let themeUpdater: (theme: string) => void;
let currentTheme: string | undefined;

const SecretPage = observer((p: Props) => {
    const [index, setIndex] = useState(p.index);
    updater = setIndex;

    const { setTheme, resolvedTheme } = useTheme();
    themeUpdater = setTheme;
    currentTheme = resolvedTheme;

    const userStore = useUserStore();

    useEffect(() => {
        if (userStore) {
            const newValue = JSON.stringify(index)
            if (userStore.keyValueStorage[COUNTER_STORE_INDEX] !== newValue) {
                userStore.keyValueStorage[COUNTER_STORE_INDEX] = newValue;
                UserStoreService.postApiUserStore(userStore);
            }
        }
    }, [index, userStore])

    const applicationState = useCommonApplicationState();
    const health = applicationState.healthCheckState.backendConnection;

    return (
        <>
            <p>Secret {health ? "ALIVE" : "DEAD"}</p>
            {index}
            <Button onClick={() => setIndex(p => p + 1)}>Increment</Button>
        </>
    );
});

export const DemoPageAppFrameConifg: AppFrameConfig = {
    toolbarText: "Demo Page",
    contextMenuActions: [
        {
            action: () => {
                updater(p => p + 1);
                return Promise.resolve();
            },
            text: "TEST2",
            keepMenuOpen: true,
            icon: <Add />
        },
        {
            action: () => {
                updater(p => p + 1);
                return Promise.resolve();
            },
            text: "TEST",
            icon: <Add />
        },
        {
            action: () => {
                themeUpdater(currentTheme === "dark" ? "light" : "dark");
                return Promise.resolve();
            },
            text: currentTheme ?? "THEME?",
            icon: <Add />
        },
        {
            action: () => {
                CommonApplicationObject.healthCheckState.checkConnection();
                return Promise.resolve();
            },
            text: "TOGGLE HEALTH",
            icon: <Add />
        }
    ],
}


export default SecretPage;