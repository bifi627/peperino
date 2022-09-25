import { NextRouter } from "next/router";
import { ApplicationState } from "./ApplicationState";

interface Options {
    state: ApplicationState;
    router: NextRouter,
}

export type ApplicationInitOptions = Partial<Options>;

export class BaseState {
    public key = "Base";
    protected router?: NextRouter | undefined;
    protected baseState?: ApplicationState | undefined;

    /**
     * applicationInit will be called when application is first mounted
     */
    public async applicationInit(applicationStateOptions: ApplicationInitOptions) {
        this.router = applicationStateOptions.router;
        this.baseState = applicationStateOptions.state;
        return Promise.resolve();
    }

    /**
     * user init will be called when the user is first logged in or changed
     */
    public async userInit() {
        return Promise.resolve();
    }

    public updateRouter(router: NextRouter) {
        this.router = router;
    }
}