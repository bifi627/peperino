import { getAuth } from "firebase/auth";
import { observer } from "mobx-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FullLoadingPage } from "../../loadingScreen/FullLoadingPage";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = observer((props: AuthProviderProps) => {

    const [user, authLoading, authError] = useAuthState(getAuth());

    if (authLoading) {
        return (
            <FullLoadingPage></FullLoadingPage>
        );
    }

    if (authError) {
        return (
            <>
                {authError.name}
                <br />
                {authError.message}
            </>
        );
    }

    return (
        <>
            {props.children}
        </>
    );
});
