import { Add } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { action, computed, makeObservable, observable, reaction } from "mobx";
import Router from "next/router";

import { UserStoreService } from "../../api";
import { KnownRoutes } from "../../routing/knownRoutes";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export const COUNTER_STORE_INDEX = "COUNTER";

export class DemoPageState extends BasePageState {
    public override key = "DemoState";

    private _counter = 0;

    public get counter() {
        return this._counter;
    }

    public set counter(value: number) {
        this._counter = value;
    }

    constructor() {
        super();
        makeObservable(this as DemoPageState & { _counter: number }, {
            init: action,
            counter: computed,
            _counter: observable,
        });

        reaction(() => this.counter, async (counter, prevCounter) => {
            if (counter > prevCounter) {
                this.saveCounter();
            }
        });
    }

    private async saveCounter() {
        const store = await UserStoreService.getApiUserStore();
        store.keyValueStorage[COUNTER_STORE_INDEX] = JSON.stringify(this.counter);
        await UserStoreService.postApiUserStore(store);
    }

    public override async init(applicationState: ApplicationState) {

        if (!getAuth().currentUser) {
            return Promise.resolve();
        }

        const store = await UserStoreService.getApiUserStore();
        this.counter = Number.parseInt(store.keyValueStorage[COUNTER_STORE_INDEX]);

        this.appFrameConfig.toolbarText = "Demo Page";
        this.appFrameConfig.contextMenuActions = [
            {
                id: "IncrementKeepOpen",
                action: () => {
                    this.counter++;
                    return Promise.resolve();
                },
                text: "TEST2",
                keepMenuOpen: true,
                icon: <Add />
            },
            {
                id: "Increment",
                action: () => {
                    this.counter++;
                    return Promise.resolve();
                },
                text: "TEST",
                icon: <Add />
            },
            {
                id: "ToggleTheme",
                action: async () => {
                    await applicationState.getAppFrame().withLoadingScreen(async () => {
                        await applicationState.getHealthCheck().checkConnection();
                    }, "Full");
                },
                text: "TOGGLE HEALTH",
                icon: <Add />
            },
            {
                id: "PushRoot",
                action: async () => {
                    await Router.push(KnownRoutes.Root());
                },
                text: "HOME",
                icon: <Add />
            }
        ]
    }
}
