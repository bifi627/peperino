import { TextSnippetOutlined, TextureSharp } from "@mui/icons-material";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { DrawerItemInterface } from "../../../components/appFrame/Drawer/DrawerItem";
import { useAuthStore } from "./authState";

type LoadingState = "Full" | "Overlay";

type AppFrameStore = {
    title: string;
    setTitle: (title: string) => void;
    //
    loadingState?: LoadingState;
    setLoading: (loading?: LoadingState) => void;
    withLoading: (
        action: () => Promise<unknown> | unknown,
        state?: LoadingState,
        loadingDelay?: number
    ) => Promise<void>;
    //
    menuOpened: boolean;
    setMenuOpened: (open: boolean) => void;
    menuItems: DrawerItemInterface[];
    toggleMenuItemOpened: (index: number) => void;
    loggedIn: () => boolean;
};

export const useAppFrameStore = create<AppFrameStore>()(
    immer((set) => ({
        title: "Peperino",
        setTitle: (title: string) => set({ title }),
        //
        loadingState: undefined,
        setLoading: (loading?: LoadingState) => set({ loadingState: loading }),
        withLoading: async (
            action: () => Promise<unknown> | unknown,
            state: LoadingState = "Overlay",
            loadingDelay = 200
        ) => {
            const timer = setTimeout(() => {
                set({ loadingState: state });
            }, loadingDelay);
            try {
                await action();
            } finally {
                clearTimeout(timer);
                set({ loadingState: undefined });
            }
        },
        //
        menuOpened: false,
        setMenuOpened: (open: boolean) => set({ menuOpened: open }),
        menuItems: [
            {
                text: "Test",
                isSelected: false,
                icon: <TextSnippetOutlined />,
                visible: true,
                childItems: [
                    {
                        text: "child",
                        icon: <TextureSharp />,
                        isSelected: false,
                        visible: true,
                        action: () => {
                            alert("child");
                        },
                    },
                ],
            },
        ],
        toggleMenuItemOpened: (index: number) => {
            set((state) => {
                const menuItem = state.menuItems[index];
                menuItem.childItems?.forEach((c) => {
                    c.visible = !c.visible;
                });
            });
        },
        loggedIn: () => useAuthStore.getState().isUserLoggedIn,
    }))
);
