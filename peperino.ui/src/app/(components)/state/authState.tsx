import { User } from "firebase/auth";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthStore {
    isUserLoggedIn: boolean;
    user?: User;
    setLogin: (user?: User) => void;
}

export const useAuthStore = create<AuthStore>()(
    immer((set) => ({
        isUserLoggedIn: false,
        user: undefined,
        setLogin: (user) => set({ isUserLoggedIn: Boolean(user), user }),
    }))
);
