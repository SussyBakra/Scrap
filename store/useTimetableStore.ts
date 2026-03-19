import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ScheduleEvent {
  id: string;
  title: string;
  timeRange: string;
  location: string;
}

interface TimetableState {
  events: ScheduleEvent[];
  addEvent: (title: string, timeRange: string, location: string) => void;
  deleteEvent: (id: string) => void;
}

export const useTimetableStore = create<TimetableState>()(
  persist(
    (set) => ({
      events: [
        { id: '1', title: 'Design Review', timeRange: '10:00 AM - 11:30 AM', location: 'Meeting Room A' },
      ],
      addEvent: (title, timeRange, location) => set((state) => ({
        events: [
          ...state.events,
          {
            id: Date.now().toString(),
            title,
            timeRange,
            location,
          },
        ],
      })),
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter((event) => event.id !== id),
      })),
    }),
    {
      name: 'scraps-timetable-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
