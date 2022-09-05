export module KnownRoutes {
    export const Root = () => "/";
    export const Login = (redirect = "") => {
        if (redirect !== "") {
            return `/login?redirect=${redirect}`;
        }
        return `/login`;
    };
    export const Demo = () => `/demo`;
    export const Group = (slug?: string) => slug ? `/group/${slug}` : "/group";
    export const GroupSettings = (slug: string) => `/group/${slug}/settings`;
}
