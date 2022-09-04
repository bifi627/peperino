import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { UserStoreService } from "../../lib/api";
import { authPage, redirectLogin } from "../../lib/auth/server/authPage";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log(context.resolvedUrl);
    if (await authPage(context) === false) {
        return await redirectLogin<Props>(context.resolvedUrl);
    }

    const userStore = await UserStoreService.getApiUserStore();

    return {
        props: {
        }
    };
}

const DemoPage = observer((props: Props) => {
    const { setTheme, resolvedTheme, theme } = useTheme();

    const healthState = useApplicationState().getHealthCheck();

    const demoPageState = useApplicationState().getDemoState();

    useEffect(() => {
        const themeAction = demoPageState.appFrameConfig?.contextMenuActions?.find(f => f.id === "ToggleTheme");
        if (themeAction) {
            themeAction.action = () => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
                return Promise.resolve();
            }
        }
    }, [demoPageState, resolvedTheme, setTheme])

    return (
        <>
            <p>Secret {healthState.backendConnection ? "ALIVE" : "DEAD"}</p>
            {demoPageState.counter}
            <Button onClick={() => demoPageState.counter++}>Increment</Button>
        </>
    );
});

export default DemoPage;