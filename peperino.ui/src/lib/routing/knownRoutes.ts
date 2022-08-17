export module KnownRoutes {
    export const Root = () => "/";
    export const Login = (redirect = "") => {
        if (redirect !== "") {
            return `/login?redirect=${redirect}`;
        }
        return `/login`;
    };
    export const Secret = () => `/secret`;
}