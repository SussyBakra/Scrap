import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task, Note } from '@/types';

const TASKS_KEY = '@draftpad_tasks';
const NOTES_KEY = '@draftpad_notes';

export const storage = {
    async getTasks(): Promise<Task[]> {
        try {
            const data = await AsyncStorage.getItem(TASKS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    },

    async saveTasks(tasks: Task[]): Promise<void> {
        try {
            await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    },

    async addTask(task: Task): Promise<void> {
        const tasks = await this.getTasks();
        tasks.push(task);
        await this.saveTasks(tasks);
    },

    async updateTask(updatedTask: Task): Promise<void> {
        const tasks = await this.getTasks();
        const index = tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
            tasks[index] = updatedTask;
            await this.saveTasks(tasks);
        }
    },

    async deleteTask(taskId: string): Promise<void> {
        const tasks = await this.getTasks();
        const filtered = tasks.filter(t => t.id !== taskId);
        await this.saveTasks(filtered);
    },

    async getNotes(): Promise<Note[]> {
        try {
            const data = await AsyncStorage.getItem(NOTES_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading notes:', error);
            return [];
        }
    },

    async saveNotes(notes: Note[]): Promise<void> {
        try {
            await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    },

    async addNote(note: Note): Promise<void> {
        const notes = await this.getNotes();
        notes.unshift(note);
        await this.saveNotes(notes);
    },

    async updateNote(updatedNote: Note): Promise<void> {
        const notes = await this.getNotes();
        const index = notes.findIndex(n => n.id === updatedNote.id);
        if (index !== -1) {
            notes[index] = updatedNote;
            await this.saveNotes(notes);
        }
    },

    async deleteNote(noteId: string): Promise<void> {
        const notes = await this.getNotes();
        const filtered = notes.filter(n => n.id !== noteId);
        await this.saveNotes(filtered);
    },
};
