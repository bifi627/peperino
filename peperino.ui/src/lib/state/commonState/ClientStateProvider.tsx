import { observer } from "mobx-react";
import { useEffect } from "react";
import { FullLoadingPage } from "../../../components/loadingScreen/FullLoadingPage";
import { ApplicationStateContext, GlobalApplicationStateObject } from "../ApplicationState";

interface Props {
    children: React.ReactNode;
}

export const ClientStateProvider = observer((props: Props) => {

    useEffect(() => {
        GlobalApplicationStateObject.applicationInit();
    }, [])

    return (
        <ApplicationStateContext.Provider value={GlobalApplicationStateObject}>
            {GlobalApplicationStateObject.stateLoading ? <div style={{ height: "100vh" }}><FullLoadingPage /></div> : <>{props.children}</>}
        </ApplicationStateContext.Provider>
    );
});
