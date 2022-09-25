import { Add } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { computed, makeObservable, observable, reaction } from "mobx";
import Router from "next/router";

import { ClientApi } from "../../auth/client/apiClient";
import { KnownRoutes } from "../../routing/knownRoutes";
import { BasePageState } from "../BasePageState";
import { ApplicationInitOptions } from "../BaseState";

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
        const store = await ClientApi.userStore.getApiUserStore();
        store.keyValueStorage[COUNTER_STORE_INDEX] = JSON.stringify(this.counter);
        await ClientApi.userStore.postApiUserStore(store);
    }

    public override async applicationInit(options: ApplicationInitOptions) {
        super.applicationInit(options);

        if (!getAuth().currentUser) {
            return Promise.resolve();
        }

        const store = await ClientApi.userStore.getApiUserStore();
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
                    await options.state?.getAppFrame().withLoadingScreen(async () => {
                    });
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
