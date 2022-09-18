import { Backdrop, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useApplicationState } from "../../../lib/state/ApplicationState";
import { FullLoadingPage } from "../../loadingScreen/FullLoadingPage";
interface Props {
    loading?: boolean
    children: React.ReactNode;
}

export const LoadingProvider = observer((props: Props) => {
    const theme = useTheme();
    const appFrame = useApplicationState().getAppFrame();

    return (
        <>
            <Backdrop sx={{ zIndex: theme.zIndex.drawer + 2 }} open={appFrame.showLoading}>
                <FullLoadingPage />
            </Backdrop>
            {props.children}
        </>
    );
});
