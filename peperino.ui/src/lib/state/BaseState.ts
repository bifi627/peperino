import { ApplicationState } from "./ApplicationState";

export class BaseState {
    public key = "Base";

    /**
     * applicationInit will be called when application is first mounted
     */
    public async applicationInit(applicationState: ApplicationState) {
        return Promise.resolve();
    }

    /**
     * user init will be called when the user is first logged in or changed
     */
    public async userInit() {
        return Promise.resolve();
    }
}