import { Login, Logout, MoreVert } from "@mui/icons-material";
import { Avatar, Switch } from "@mui/material";
import { getAuth, signOut, User } from "firebase/auth";
import type { NextPage } from 'next';
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { ApiError, UserService, WeatherForecastService } from "../lib/api";
import { handleError } from "../lib/apiConfig";
import { AppFrameConfig } from "../lib/appFrame/AppFrameConfig";
import { KnownRoutes } from "../lib/routing/knownRoutes";

const Home: NextPage = () => {

    const router = useRouter();

    const DemoRequests = () => {
        return (
            <>
                <button onClick={async () => {
                    router.push(KnownRoutes.Demo());
                }}>Demo Request</button>
                <button onClick={async () => {
                    const result = await WeatherForecastService.getWeatherForecast()
                    console.log(result);
                }}>Weather Request</button>
                <button onClick={async () => {
                    try {
                        const result = await WeatherForecastService.getWeatherForecastAuth();
                        console.log(result);
                    } catch (error) {
                        console.error(error);
                    }
                }}>Weather with Auth Request</button>
                <button onClick={async () => {
                    try {
                        const result = await UserService.postApiUser({ userName: "TESTAAAAAAA" });
                        console.log(result);
                    } catch (error) {
                        const e = error as ApiError;
                        const m = handleError(e);
                        console.log(m);
                    }
                }}>Create User</button>
                <br />
                <Switch defaultChecked />
                <Switch />
                <Switch disabled defaultChecked />
            </>
        );
    }

    const [user, loading, error] = useAuthState(getAuth());

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <>
            {user && <>
                Signed in with {user?.displayName ?? user?.email}<br />
                <button onClick={() => signOut(getAuth())}>Sign out</button>
                <DemoRequests></DemoRequests>
            </>}
            {!user && <>
                Not signed in <br />
                <Link href={KnownRoutes.Login()} passHref>
                    <button>Login</button>
                </Link>
                <DemoRequests></DemoRequests>
            </>}
        </>
    );
}

export const DefaultAppFrameConifg = (user: User): AppFrameConfig => {
    return {
        contextMenuIcon: <MoreVert />,
        userAvatarIcon: <Avatar src={user.photoURL ?? ""} />,
        userAvatarActions: [{
            text: "Logout",
            action: async () => {
                await signOut(getAuth())
                router.push(KnownRoutes.Root());
            },
            icon: <Logout />
        }]
    }
}

export const AnonymousAppFrameConifg: AppFrameConfig = {
    contextMenuIcon: <MoreVert />,
    userAvatarIcon: <Avatar />,
    userAvatarActions: [{
        text: "Login",
        action: async () => {
            router.push(KnownRoutes.Login(router.asPath));
        },
        icon: <Login />
    }]
}

export default Home