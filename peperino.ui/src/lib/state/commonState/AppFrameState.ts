import { makeAutoObservable } from "mobx";
import { BaseState } from "../BaseState";

type LoadingScope = "Full" | "Page" | "None";

export class AppFrameState implements BaseState {
    public key = "AppFrameState";
    public showLoading: LoadingScope = "Full";
    public drawerOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    public init() {
        this.showLoading = "None";
        return Promise.resolve();
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