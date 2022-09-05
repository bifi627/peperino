import { Add } from "@mui/icons-material";
import { isObservableArray, makeObservable, observable } from "mobx";
import { UserGroupOutDto, UserGroupService } from "../../api";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class GroupsPageState extends BasePageState {
    public dialogOpened = false;
    public groups: UserGroupOutDto[] = [];

    constructor() {
        super();

        makeObservable(this, {
            dialogOpened: observable,
            groups: observable,
        })
    }

    public override init(applicationState: ApplicationState) {
        this.appFrameConfig = {
            toolbarText: "Groups Page",
            contextMenuActions: [
                {
                    id: "add",
                    action: () => {
                        this.dialogOpened = true;
                        return Promise.resolve();
                    },
                    icon: <Add />,
                    text: "add",
                }
            ]
        }

        return Promise.resolve();
    }

    public async reloadGroups() {
        if (isObservableArray(this.groups)) {
            this.groups.replace(await UserGroupService.getAll());
        }
    }

    public async createGroup(name: string) {
        await UserGroupService.create({ groupName: name });
    }
}
