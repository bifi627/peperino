import { Share } from "@mui/icons-material";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class GroupPageState extends BasePageState {

    constructor() {
        super();
    }

    public override init(applicationState: ApplicationState) {
        this.appFrameConfig = {
            toolbarText: "Group Page",
            contextMenuActions: [
                {
                    id: "share",
                    action: () => Promise.resolve(),
                    icon: <Share />,
                    text: "share",
                }
            ]
        }

        return Promise.resolve();
    }
}