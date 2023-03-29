import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { isClient } from "../../helper/common";
import { KnownRoutes } from "../../routing/knownRoutes";

export const useClientAuthGuard = () => {
    const router = useRouter();
    if (!getAuth().currentUser) {
        if (isClient()) {
            router.replace(KnownRoutes.Login(router.asPath));
            throw Error("Not authorized");
        }
    }
}
