import { makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import { HealthCheckState } from "./HealthCheckState";

type LoadingScope = "Full" | "Page" | "None";

export class ApplicationState {
    public healthCheckState!: HealthCheckState;

    public showLoading: LoadingScope = "None";

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

export const CommonApplicationObject = new ApplicationState();
export const CommonApplicationContext = React.createContext(CommonApplicationObject);

export const useCommonApplicationState = () => {
    return useContext(CommonApplicationContext);
}