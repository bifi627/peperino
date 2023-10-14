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
    const [connection, setConnection] = useState<HubConnection>();
    const [connectionState, setConnectionState] = useState<HubConnectionState>(HubConnectionState.Disconnected);

    useEffect(() => {
        const hubConnection = new HubConnectionBuilder().withUrl(url,
            {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
                accessTokenFactory: () => getAuth().currentUser?.getIdToken() ?? "",
            }).withAutomaticReconnect().build();

        setConnection(hubConnection);

        const refreshConnectionState = () => {
            setConnectionState(hubConnection.state);
        }

        const setupConnectionMonitoring = () => {
            hubConnection.onclose(() => {
                refreshConnectionState();
            });
            hubConnection.onreconnected(() => {
                refreshConnectionState();
            });
            hubConnection.onreconnecting(() => {
                refreshConnectionState();
            });
            hubConnection.on("connected", () => {
                refreshConnectionState();
            });
        }

        const stopConnectionMonitoring = () => {
            hubConnection.off("connected");
        }

        (async () => {
            if (hubConnection && hubConnection.state !== HubConnectionState.Connected) {
                callbacks?.forEach(cb => {
                    cb.event && hubConnection.on(cb.event, async () => {
                        refreshConnectionState();
                        await cb.action(hubConnection)
                    });
                });

                setupConnectionMonitoring();

                await hubConnection?.start();
                await setupActions?.afterConnecting?.(hubConnection);
                refreshConnectionState();
            }
        })();
        return () => {
            if (connection) {
                callbacks?.forEach(cb => cb.event && connection.off(cb.event));
                if (connection.state === HubConnectionState.Connected) {
                    setupActions?.beforeDisconnecting?.(connection);
                }
                stopConnectionMonitoring();
                connection?.stop().then(() => {
                    refreshConnectionState();
                });
                setConnection(undefined);
            }
        }
    }, []);

    return { connection, connectionState };
}