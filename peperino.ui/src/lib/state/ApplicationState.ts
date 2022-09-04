import { makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import { BaseState } from "./BaseState";
import { AppFrameState } from "./commonState/AppFrameState";
import { HealthCheckState } from "./commonState/HealthCheckState";
import { DemoPageState } from "./pageState/DemoPageState";
import { GroupPageState } from "./pageState/GroupPageState";
import { GroupsPageState } from "./pageState/GroupsPageState";

export class ApplicationState implements BaseState {
    public key = "ApplicationState";
    private healthCheck: HealthCheckState;
    private appFrame: AppFrameState;
    private demoState: DemoPageState;
    private groupsState: GroupsPageState;
    private groupState: GroupPageState;

    private dynamicState: Map<string, BaseState> = new Map();

    private get all() {
        return [
            this.healthCheck,
            this.appFrame,
            this.demoState,
            this.groupsState,
            this.groupState,
            ...this.dynamicState.values()
        ];
    }

    public stateLoading = true;

    constructor() {
        makeAutoObservable(this);

        this.healthCheck = new HealthCheckState();
        this.appFrame = new AppFrameState();
        this.demoState = new DemoPageState();
        this.groupsState = new GroupsPageState();
        this.groupState = new GroupPageState();
    }

    public async init() {
        await Promise.all(this.all.map(state => state.init(this)));
        this.stateLoading = false;
    }

    public register<T extends BaseState>(state: T) {
        console.log("Register State: " + state.key);
        this.dynamicState.set(state.key, state);
    }

    public getByKey<T extends BaseState>(key: string) {
        return this.dynamicState.get(key) as T;
    }

    public getHealthCheck() {
        return this.healthCheck;
    }

    public getAppFrame() {
        return this.appFrame;
    }

    public getDemoState() {
        return this.demoState;
    }

    public getGroupsState() {
        return this.groupsState;
    }

    public getGroupState() {
        return this.groupState;
    }
}

export const GlobalApplicationStateObject = new ApplicationState();
export const ApplicationStateContext = React.createContext(GlobalApplicationStateObject);

export const useApplicationState = () => {
    return useContext(ApplicationStateContext);
}
