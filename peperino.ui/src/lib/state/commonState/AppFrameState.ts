import { makeObservable, observable } from "mobx";
import { BaseState } from "../BaseState";

export class AppFrameState extends BaseState {
    public key = "AppFrameState";
    public showLoading = true;
    public drawerOpened = false;

    constructor() {
        super();

        makeObservable(this, {
            showLoading: observable,
            drawerOpened: observable,
        });
    }

    public applicationInit() {
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