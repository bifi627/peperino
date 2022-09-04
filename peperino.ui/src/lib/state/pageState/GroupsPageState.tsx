import { Add } from "@mui/icons-material";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class GroupsPageState extends BasePageState {

    constructor() {
        super();
    }

    public override init(applicationState: ApplicationState) {
        this.appFrameConfig = {
            toolbarText: "Groups Page",
            contextMenuActions: [
                {
                    id: "add",
                    action: () => Promise.resolve(),
                    icon: <Add />,
                    text: "add",
                }
            ]
        }

        return Promise.resolve();
    }
}