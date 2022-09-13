import { getAuth } from "firebase/auth";
import { isObservable, makeAutoObservable, makeObservable, observable } from "mobx";
import { CheckListOutDto } from "../../api";
import { ClientApi } from "../../auth/client/apiClient";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class CheckListPageState extends BasePageState {
    private _checkList?: CheckListOutDto = undefined;

    public get checkList() {
        return this._checkList!;
    }

    public set checkList(value: CheckListOutDto) {
        if (!isObservable(value)) {
            makeAutoObservable(value);
        }
        this._checkList = value;
    }

    constructor() {
        super();

        makeObservable(this as CheckListPageState & { _checkList: CheckListOutDto }, {
            _checkList: observable,
        });
    }

    public override async init(applicationState: ApplicationState) {

        if (!getAuth().currentUser) {
            return Promise.resolve();
        }

        this.appFrameConfig.toolbarText = "Check List Page";
    }

    public async reloadList() {
        const list = await ClientApi.checkList.getCheckListBySlug(this.checkList.slug);
        this.checkList = list;
    }

    public async addItem(text: string) {
        await ClientApi.checkList.addCheckListItem(this.checkList.slug, text);
    }

    public async deleteItem(id: number) {
        await ClientApi.checkList.deleteCheckListItem(this.checkList.slug, id);
    }
}