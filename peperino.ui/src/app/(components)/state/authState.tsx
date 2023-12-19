import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthStore {
    isUserLoggedIn: boolean;
    setLogin: (loggedIn: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    immer((set) => ({
        isUserLoggedIn: false,
        setLogin: (loggedIn) => set({ isUserLoggedIn: loggedIn }),
    }))
);
