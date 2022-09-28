import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FullLoadingPage } from "../../../components/loadingScreen/FullLoadingPage";
import { ApplicationStateContext, GlobalApplicationStateObject } from "../ApplicationState";

interface Props {
    children: React.ReactNode;
}

export const ClientStateProvider = observer((props: Props) => {

    const router = useRouter();

    useEffect(() => {
        GlobalApplicationStateObject.initClientState();
    }, []);

    useEffect(() => {
        GlobalApplicationStateObject.updateRouter(router);
    }, [router])

    return (
        <ApplicationStateContext.Provider value={GlobalApplicationStateObject}>
            {GlobalApplicationStateObject.stateLoading ? <div style={{ height: "100vh" }}><FullLoadingPage text="Applikation wird geladen..." /></div> : <>{props.children}</>}
        </ApplicationStateContext.Provider>
    );
});
