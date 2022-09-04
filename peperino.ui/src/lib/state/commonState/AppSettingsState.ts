import { makeObservable, observable } from "mobx";
import { BaseState } from "../BaseState";

export class AppSettingsState extends BaseState {
    public theme = "";

    constructor() {
        super();
        makeObservable(this, {
            theme: observable
        });
    }
}