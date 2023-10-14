import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

interface WebSocketCallbackAction {
    event: string;
    action: (connection: HubConnection) => void | Promise<unknown>;
}

interface WebSocketSetupActions {
    afterConnecting?: (connection: HubConnection) => void | Promise<unknown>;
    beforeDisconnecting?: (connection: HubConnection) => void | Promise<unknown>;
}

export const useWebSocketObserver = (url: string, setupActions?: WebSocketSetupActions, callbacks?: WebSocketCallbackAction[]) => {
    const [connectionState, setConnectionState] = useState<HubConnectionState>(HubConnectionState.Disconnected);

    useEffect(() => {
        const hubConnection = new HubConnectionBuilder().withUrl(url,
            {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
                accessTokenFactory: () => getAuth().currentUser?.getIdToken() ?? "",
            }).withAutomaticReconnect().build();

        const refreshConnectionState = () => {
            setConnectionState(hubConnection?.state ?? HubConnectionState.Disconnected);
        }

        hubConnection?.onclose(() => {
            refreshConnectionState();
        });
        hubConnection?.onreconnected(() => {
            refreshConnectionState();
        });
        hubConnection?.onreconnecting(() => {
            refreshConnectionState();
        });
        hubConnection?.on("connected", () => {
            refreshConnectionState();
        });

        const stopConnectionMonitoring = () => {
            hubConnection?.off("connected");
        }

        let timer = 0;

        if (hubConnection && hubConnection.state !== HubConnectionState.Connected) {
            callbacks?.forEach(cb => cb.event && hubConnection.off(cb.event));
            callbacks?.forEach(cb => {
                cb.event && hubConnection.on(cb.event, async () => {
                    console.log("APP: start timeout")
                    clearTimeout(timer);

                    timer = window.setTimeout(() => {
                        console.log("APP: finish timeout")
                        refreshConnectionState();
                        cb.action(hubConnection);
                        timer = 0;
                    }, 500);
                });
            });

            hubConnection?.start().then(async () => {
                setupActions?.afterConnecting?.(hubConnection);
            });
            refreshConnectionState();
        };
        return () => {
            if (hubConnection) {
                callbacks?.forEach(cb => cb.event && hubConnection.off(cb.event));
                if (hubConnection.state === HubConnectionState.Connected) {
                    setupActions?.beforeDisconnecting?.(hubConnection);
                }
                stopConnectionMonitoring();
                hubConnection?.stop().then(() => {
                    refreshConnectionState();
                });
            }
        }
    }, []);

    return { connectionState };
}