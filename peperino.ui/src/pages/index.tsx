import { Switch } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import type { NextPage } from 'next';
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { WeatherForecastService } from "../lib/api";
import { manageSessionForUser } from "../lib/auth/client/firebase";
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
                    const newToken = await user?.getIdToken(true);
                    if (newToken) {
                        await manageSessionForUser(newToken);
                    }
                }}>Update session</button>
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

export default Home