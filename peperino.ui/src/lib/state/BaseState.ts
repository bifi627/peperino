import { ApplicationState } from "./ApplicationState";

export class BaseState {
    public key = "Base";
    public async init(applicationState: ApplicationState) {
        return Promise.resolve();
    }
}