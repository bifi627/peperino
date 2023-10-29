import { create } from 'zustand';

type AppFrameStore = {
    title: string,
    setTitle: (title: string) => void;
}

export const useAppFrameStore = create<AppFrameStore>((set) => ({
    title: "Peperino",
    setTitle: (title: string) => set({ title }),
}));