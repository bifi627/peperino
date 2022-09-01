import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { HealthCheckService } from "../api";

export class HealthCheckState {

    public backendConnection = true; // Optimistic

    constructor() {
        makeAutoObservable(this);

        if (typeof window !== "undefined") {
            setInterval(() => this.checkConnection(), 10 * 1000);
        }
    }

    public async checkConnection() {
        let newState: boolean;
        try {
            newState = await HealthCheckService.getApiHealthCheck();
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