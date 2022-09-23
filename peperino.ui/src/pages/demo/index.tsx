import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useAuthGuard } from "../../lib/auth/client/useAuthGuard";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
}

const DemoPage = observer((props: Props) => {
    useAuthGuard();

    const { setTheme, resolvedTheme, theme } = useTheme();

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
            {demoPageState.counter}
            <Button onClick={() => demoPageState.counter++}>Increment</Button>
        </>
    );
});

export default DemoPage;