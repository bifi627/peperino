import { BACKEND_URL } from "../../shared/constants";

export module KnownRoutes {
    export const Root = () => "/";
    export const Login = (redirect = "") => {
        if (redirect !== "") {
            return `/login?redirect=${redirect}`;
        }
        return `/login`;
    };
    export const Room = (slug?: string) => slug ? `/room/${slug}` : "/room";
    export const RoomSettings = (slug: string) => `/room/${slug}/settings`;
    export const SharedLink = (slug: string) => `/share/${slug}`;
    export const SSO = (redirect: string) => `/login/sso?redirect=${redirect}`;
    export const CheckList = (slug: string) => `/checklist/${slug}`;
    export const SignalR = {
        CheckList: () => `${BACKEND_URL}signalr/checkListHub`,
    }
}
