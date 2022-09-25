import { makeObservable, observable } from "mobx";
import { NextRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ApplicationInitOptions, BaseState } from "./BaseState";
import { AppFrameState } from "./commonState/AppFrameState";
import { CheckListPageState } from "./pageState/CheckListPageState";
import { DemoPageState } from "./pageState/DemoPageState";
import { RoomPageState } from "./pageState/RoomPageState";
import { RoomSettingsPageState } from "./pageState/RoomSettingsPageState";
import { RoomsOverviewPageState } from "./pageState/RoomsOverviewPageState";

export class ApplicationState extends BaseState {
    public key = "ApplicationState";
    private appFrame: AppFrameState;
    private demoState: DemoPageState;
    private roomsOverviewState: RoomsOverviewPageState;
    private roomState: RoomPageState;
    private roomSettingsState: RoomSettingsPageState;
    private checklistState: CheckListPageState;

    private dynamicState: Map<string, BaseState> = new Map();

    private get all() {
        return [
            this.appFrame,
            this.demoState,
            this.roomsOverviewState,
            this.roomState,
            this.roomSettingsState,
            this.checklistState,
            ...this.dynamicState.values()
        ];
    }

    public stateLoading = true;

    constructor() {
        super();

        this.appFrame = new AppFrameState();
        this.demoState = new DemoPageState();
        this.roomsOverviewState = new RoomsOverviewPageState();
        this.roomState = new RoomPageState();
        this.roomSettingsState = new RoomSettingsPageState();
        this.checklistState = new CheckListPageState();

        makeObservable(this, {
            stateLoading: observable,
        });
    }


    public async initState() {
        try {
            GlobalApplicationStateObject.stateLoading = true;
            await GlobalApplicationStateObject.applicationInit({ state: GlobalApplicationStateObject });
            await GlobalApplicationStateObject.userInit();
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
        finally {
            GlobalApplicationStateObject.stateLoading = false;
        }
    }

    public override updateRouter(router: NextRouter) {
        this.all.forEach(state => state.updateRouter(router));
    }

    public override async applicationInit(options: ApplicationInitOptions) {
        await Promise.all(this.all.map(state => state.applicationInit(options)));
    }

    public override async userInit() {
        await Promise.all(this.all.map(state => state.userInit()));
    }

    public register<T extends BaseState>(state: T) {
        console.log("Register State: " + state.key);
        this.dynamicState.set(state.key, state);
    }

    public getByKey<T extends BaseState>(key: string) {
        return this.dynamicState.get(key) as T;
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

    public getChecklistState() {
        return this.checklistState;
    }
}

export const GlobalApplicationStateObject = new ApplicationState();
export const ApplicationStateContext = React.createContext(GlobalApplicationStateObject);

export const useApplicationState = () => {
    return useContext(ApplicationStateContext);
}
