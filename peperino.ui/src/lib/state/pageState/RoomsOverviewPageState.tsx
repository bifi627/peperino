import { Add } from "@mui/icons-material";
import { isObservableArray, makeObservable, observable } from "mobx";
import { RoomOutDto, RoomService } from "../../api";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

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

    public override init(applicationState: ApplicationState) {
        this.appFrameConfig = {
            toolbarText: "Rooms Overview",
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
        if (isObservableArray(this.rooms)) {
            this.rooms.replace(await RoomService.getAll());
        }
    }

    public async createGroup(name: string) {
        await RoomService.createRoom({ roomName: name });
    }
}