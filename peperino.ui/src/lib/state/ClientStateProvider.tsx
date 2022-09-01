import { ApplicationStateContext, ApplicationStateObject } from "./ApplicationState";

interface Props {
    children: React.ReactNode;
}

export const ClientStateProvider = (props: Props) => {
    return (
        <ApplicationStateContext.Provider value={ApplicationStateObject}>
            {props.children}
        </ApplicationStateContext.Provider>
    );
}