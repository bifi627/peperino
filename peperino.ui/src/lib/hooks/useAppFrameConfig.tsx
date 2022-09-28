import { User } from "@firebase/auth";
import { Login, Logout } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import Router, { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { AppFrameConfig } from "../appFrame/AppFrameConfig";
import { KnownRoutes } from "../routing/knownRoutes";
import { useCurrentPageState } from "./useCurrentPageState";

export const useAppFrameConfig = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const router = useRouter();

    const appFrameConfig = useCurrentPageState()?.appFrameConfig;

    if (appFrameConfig) {
        if (user) {
            const defaultConfig = getDefaultAppFrameConfig(user);
            appFrameConfig.userAvatarActions = defaultConfig.userAvatarActions;
            appFrameConfig.userAvatarIcon = defaultConfig.userAvatarIcon;
        }
        else {
            const defaultConfig = getAnonymousAppFrameConfig();
            appFrameConfig.userAvatarIcon = defaultConfig.userAvatarIcon;
        }
        return appFrameConfig;
    }

    return user ? getDefaultAppFrameConfig(user) : getAnonymousAppFrameConfig();
}

const getAnonymousAppFrameConfig = () => {
    const appFrameConfig = new AppFrameConfig();
    appFrameConfig.userAvatarIcon = <Avatar />;
    appFrameConfig.userAvatarActions = [{
        id: "Login",
        text: "Einloggen",
        action: async () => {
            await Router.push(KnownRoutes.Login(Router.asPath));
        },
        icon: <Login />
    }];
    return appFrameConfig;
}

const getDefaultAppFrameConfig = (user: User) => {
    const appFrameConfig = new AppFrameConfig();
    appFrameConfig.userAvatarIcon = user.photoURL ? <Avatar src={user.photoURL} /> : <Avatar />;
    appFrameConfig.userAvatarActions = [{
        id: "Logout",
        text: "Abmelden",
        action: async () => {
            await signOut(getAuth())
            await Router.push(KnownRoutes.Root());
        },
        icon: <Logout />
    }];
    return appFrameConfig;
}