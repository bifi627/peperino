import { makeObservable, observable } from "mobx";
import { AppFrameConfig } from "../appFrame/AppFrameConfig";
import { BaseState } from "./BaseState";

export class BasePageState extends BaseState {
    public appFrameConfig = new AppFrameConfig();

    constructor() {
        super();
        makeObservable(this, {
            appFrameConfig: observable,
        });
    }
}