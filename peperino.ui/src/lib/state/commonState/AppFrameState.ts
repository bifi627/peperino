import { makeAutoObservable } from "mobx";
import { BaseState } from "../BaseState";

export class AppFrameState implements BaseState {
    public key = "AppFrameState";
    public showLoading = true;
    public drawerOpened = false;

    constructor() {
        makeAutoObservable(this);
    }

    public init() {
        this.showLoading = false;
        return Promise.resolve();
    }

    public async withLoadingScreen(action: () => Promise<unknown>) {
        const t = setTimeout(() => {
            this.showLoading = true;
        }, 200);
        try {
            await action();
        }
        finally {
            clearTimeout(t);
            this.showLoading = false;
        }
    }
}