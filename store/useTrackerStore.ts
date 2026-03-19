import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TimeEntry {
  id: string;
  taskName: string;
  durationSeconds: number;
  date: string;
}

interface TrackerState {
  entries: TimeEntry[];
  addEntry: (taskName: string, durationSeconds: number) => void;
  deleteEntry: (id: string) => void;
  getTotalSeconds: () => number;
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (taskName, durationSeconds) => set((state) => ({
        entries: [
          {
            id: Date.now().toString(),
            taskName,
            durationSeconds,
            date: new Date().toISOString(),
          },
          ...state.entries,
        ],
      })),
      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
      })),
      getTotalSeconds: () => {
        return get().entries.reduce((total, entry) => total + entry.durationSeconds, 0);
      }
    }),
    {
      name: 'scraps-tracker-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
