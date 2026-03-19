import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (title, content) => set((state) => ({
        notes: [
          {
            id: Date.now().toString(),
            title,
            content,
            createdAt: new Date().toISOString(),
          },
          ...state.notes,
        ],
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      })),
    }),
    {
      name: 'scraps-notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
