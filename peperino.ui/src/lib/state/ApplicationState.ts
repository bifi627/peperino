import React, { useContext } from "react";
import { HealthCheckState } from "./HealthCheckState";

export class ApplicationState {
    public healthCheckState!: HealthCheckState;

    constructor() {
        this.healthCheckState = new HealthCheckState();
    }
}

export const CommonApplicationObject = new ApplicationState();
export const CommonApplicationContext = React.createContext(CommonApplicationObject);

export const useCommonApplicationState = () => {
    return useContext(CommonApplicationContext);
}