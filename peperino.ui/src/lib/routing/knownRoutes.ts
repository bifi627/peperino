export module KnownRoutes {
    export const Root = () => "/";
    export const Login = (redirect = "") => {
        if (redirect !== "") {
            return `/login?redirect=${redirect}`;
        }
        return `/login`;
    };
    export const Demo = () => `/demo`;
    export const Room = (slug?: string) => slug ? `/room/${slug}` : "/room";
    export const RoomSettings = (slug: string) => `/room/${slug}/settings`;
}
