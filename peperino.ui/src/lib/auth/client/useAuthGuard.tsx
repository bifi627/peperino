import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { KnownRoutes } from "../../routing/knownRoutes";

export const useAuthGuard = () => {
    const router = useRouter();
    if (!getAuth().currentUser) {
        if (typeof window !== "undefined") {
            router.replace(KnownRoutes.Login(router.asPath));
            throw Error("Not authorized");
        }
    }
}
