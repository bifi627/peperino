import { makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import { BaseState } from "./BaseState";
import { AppFrameState } from "./commonState/AppFrameState";
import { HealthCheckState } from "./commonState/HealthCheckState";
import { DemoPageState } from "./pageState/DemoPageState";
import { RoomPageState } from "./pageState/RoomPageState";
import { RoomSettingsPageState } from "./pageState/RoomSettingsPageState";
import { RoomsOverviewPageState } from "./pageState/RoomsOverviewPageState";

export class ApplicationState implements BaseState {
    public key = "ApplicationState";
    private healthCheck: HealthCheckState;
    private appFrame: AppFrameState;
    private demoState: DemoPageState;
    private roomsOverviewState: RoomsOverviewPageState;
    private roomState: RoomPageState;
    private roomSettingsState: RoomSettingsPageState;

    private dynamicState: Map<string, BaseState> = new Map();

    private get all() {
        return [
            this.healthCheck,
            this.appFrame,
            this.demoState,
            this.roomsOverviewState,
            this.roomState,
            this.roomSettingsState,
            ...this.dynamicState.values()
        ];
    }

    public stateLoading = true;

    constructor() {
        makeAutoObservable(this);

        this.healthCheck = new HealthCheckState();
        this.appFrame = new AppFrameState();
        this.demoState = new DemoPageState();
        this.roomsOverviewState = new RoomsOverviewPageState();
        this.roomState = new RoomPageState();
        this.roomSettingsState = new RoomSettingsPageState();
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

    public getRoomsOverviewState() {
        return this.roomsOverviewState;
    }

    public getRoomState() {
        return this.roomState;
    }

    public getRoomSettingsState() {
        return this.roomSettingsState;
    }
}

export const GlobalApplicationStateObject = new ApplicationState();
export const ApplicationStateContext = React.createContext(GlobalApplicationStateObject);

export const useApplicationState = () => {
    return useContext(ApplicationStateContext);
}
