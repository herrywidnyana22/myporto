import { locations } from "@/lib/constant";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work

const useLocationStore = create<LocationStore>()(
    immer((set) => ({
        activeLocation: DEFAULT_LOCATION,

        setActiveLocation: (location) =>
            set((state) => {
                state.activeLocation = location ?? DEFAULT_LOCATION;
            }),

        resetActiveLocation: () =>
            set((state) => {
                state.activeLocation = DEFAULT_LOCATION;
            }),
    }))
);

export default useLocationStore