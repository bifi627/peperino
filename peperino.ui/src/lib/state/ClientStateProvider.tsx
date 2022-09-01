import { CommonApplicationContext, CommonApplicationObject } from "./ApplicationState";

interface Props {
    children: React.ReactNode;
}

export const ClientStateProvider = (props: Props) => {
    return (
        <CommonApplicationContext.Provider value={CommonApplicationObject}>
            {props.children}
        </CommonApplicationContext.Provider>
    );
}