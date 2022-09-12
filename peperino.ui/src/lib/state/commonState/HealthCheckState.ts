import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { ClientApi } from "../../auth/client/apiClient";
import { BaseState } from "../BaseState";

export class HealthCheckState implements BaseState {
    public key = "HealthCheckState";
    public backendConnection = true; // Optimistic

    constructor() {
        makeAutoObservable(this);
    }

    public init() {
        // Health check is annoying during debug and does nothing of use right now
        // setInterval(() => this.checkConnection(), 60 * 1000);
        return Promise.resolve();
    }

    public async checkConnection() {
        let newState: boolean;
        try {
            newState = await ClientApi.healthCheck.getApiHealthCheck();
        } catch (error) {
            newState = false;

        }

        if (this.backendConnection !== newState) {
            this.backendConnection = newState;
            if (this.backendConnection === true) {
                toast("Connection restored", { type: "success", theme: "dark" });
            }
            else {
                toast("Connection lost", { type: "error", theme: "dark" });
            }
        }
    }
}