import { Add } from "@mui/icons-material";
import { isObservableArray, makeObservable, observable } from "mobx";
import { RoomOutDto } from "../../api";
import { ClientApi } from "../../auth/client/apiClient";
import { BasePageState } from "../BasePageState";
import { ApplicationInitOptions } from "../BaseState";

export class RoomsOverviewPageState extends BasePageState {
    public dialogOpened = false;
    public rooms: RoomOutDto[] = [];

    constructor() {
        super();

        makeObservable(this, {
            dialogOpened: observable,
            rooms: observable,
        })
    }

    public override applicationInit(options: ApplicationInitOptions) {
        super.applicationInit(options);

        this.appFrameConfig.toolbarText = "Rooms Overview";
        this.appFrameConfig.contextMenuActions = [
            {
                id: "add",
                action: () => {
                    this.dialogOpened = true;
                    return Promise.resolve();
                },
                icon: <Add />,
                text: "add",
            }
        ];

        return Promise.resolve();
    }

    public async reloadGroups() {
        if (isObservableArray(this.rooms)) {
            this.rooms.replace(await ClientApi.room.getAll());
        }
    }

    public async createGroup(name: string) {
        await ClientApi.room.createRoom({ roomName: name });
    }
}
