import { makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import { HealthCheckState } from "./HealthCheckState";

type LoadingScope = "Full" | "Page" | "None";

export class ApplicationState {
    public healthCheckState!: HealthCheckState;

    public showLoading: LoadingScope = "None";

    public drawerOpened = false;

    constructor() {
        makeAutoObservable(this);
        this.healthCheckState = new HealthCheckState();
    }

    public async withLoadingScreen(action: () => Promise<unknown>, loadingScope: LoadingScope = "Page") {
        this.showLoading = loadingScope;
        try {
            await action();
        }
        finally {
            this.showLoading = "None";
        }
    }
}

export const ApplicationStateObject = new ApplicationState();
export const ApplicationStateContext = React.createContext(ApplicationStateObject);

export const useApplicationState = () => {
    return useContext(ApplicationStateContext);
}