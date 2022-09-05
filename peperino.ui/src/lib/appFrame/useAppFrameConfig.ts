import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAppFrameConfig } from "./getAppFrameConfig";

export const useAppFrameConfig = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const router = useRouter();

    return getAppFrameConfig(user, router.asPath, router.pathname);
}