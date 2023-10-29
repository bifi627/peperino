import { create } from 'zustand';

type LoadingState = "Full" | "Overlay";

type AppFrameStore = {
    title: string,
    setTitle: (title: string) => void;
    loadingState?: LoadingState,
    setLoading: (loading?: LoadingState) => void;
    withLoading: (action: () => Promise<unknown> | unknown, state?: LoadingState, loadingDelay?: number) => Promise<void>;
}

export const useAppFrameStore = create<AppFrameStore>((set) => ({
    title: "Peperino",
    setTitle: (title: string) => set({ title }),
    loadingState: undefined,
    setLoading: (loading?: LoadingState) => set({ loadingState: loading }),
    withLoading: async (action: () => Promise<unknown> | unknown, state: LoadingState = "Overlay", loadingDelay = 200) => {
        const timer = setTimeout(() => {
            set({ loadingState: state });
        }, loadingDelay);
        try {
            await action();
        }
        finally {
            clearTimeout(timer);
            set({ loadingState: undefined });
        }
    },
}));