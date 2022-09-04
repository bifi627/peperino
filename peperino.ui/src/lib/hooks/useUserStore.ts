import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserStoreDto, UserStoreService } from "../api";

export const useUserStore = () => {
    const [userStore, setUserStore] = useState<UserStoreDto>();
    const [user, loading, error] = useAuthState(getAuth());

    useEffect(() => {
        if (user) {
            UserStoreService.getApiUserStore().then(userStore => {
                setUserStore(userStore);
            });
        }
        else {
            setUserStore(undefined);
        }
    }, [user])

    return userStore;
}