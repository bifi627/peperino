import { AppFrameConfig } from "../appFrame/AppFrameConfig";
import { BaseState } from "./BaseState";

export class BasePageState extends BaseState {
    public appFrameConfig?: AppFrameConfig;
}