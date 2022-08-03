import { EmailAuthProvider, getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import type { NextPage } from 'next';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { ApiError, DemoService, UserService, WeatherForecastService } from "../lib/api";
import { handleError } from "../lib/apiConfig";

const Home: NextPage = () => {
    const [user, loading, error] = useAuthState(getAuth());

    if (loading) {
        return null;
    }

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        callbacks: {
            signInSuccessWithAuthResult: (result, redirect) => {
                console.log(result);
                return true;
            },
            signInFailure: (error) => {
                console.error(error);
            }
        },
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            GoogleAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID,
        ],
    };

    const DemoRequests = () => {
        return (
            <>
                <button onClick={async () => {
                    const result = await DemoService.getApiDemo()
                    console.log(result);
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
            </>
        );
    }

    if (!user) {
        return (
            <>
                Not signed in <br />
                <StyledFirebaseAuth firebaseAuth={getAuth()} uiConfig={uiConfig}></StyledFirebaseAuth>
                <DemoRequests></DemoRequests>
            </>
        );
    }
    else {
        return (<>
            Signed in with {user.displayName ?? user.email}<br />
            <button onClick={() => signOut(getAuth())}>Sign out</button>
            <DemoRequests></DemoRequests>
        </>);
    }
}

export default Home