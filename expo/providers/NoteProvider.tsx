import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';
import { storage } from '@/lib/storage';
import type { Note, CardColor } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface CreateNoteInput {
    title: string;
    content: string;
    color?: CardColor;
}

interface NoteContextValue {
    notes: Note[];
    isLoading: boolean;
    addNote: (input: CreateNoteInput) => Promise<void>;
    updateNote: (id: string, input: Partial<CreateNoteInput>) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    getNoteById: (id: string) => Note | undefined;
}

const colorPalette: CardColor[] = ['lilac', 'mint', 'bubblegum', 'peach', 'sky'];

const getRandomColor = (): CardColor =>
    colorPalette[Math.floor(Math.random() * colorPalette.length)];

export const [NoteProvider, useNotes] = createContextHook<NoteContextValue>(() => {
    const queryClient = useQueryClient();
    const [notes, setNotes] = useState<Note[]>([]);

    const { data: storedNotes, isLoading } = useQuery({
        queryKey: ['notes'],
        queryFn: storage.getNotes,
    });

    useEffect(() => {
        if (storedNotes) {
            setNotes(storedNotes);
        }
    }, [storedNotes]);

    const saveNotesMutation = useMutation({
        mutationFn: storage.saveNotes,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const addNote = async (input: CreateNoteInput) => {
        const newNote: Note = {
            id: uuidv4(),
            title: input.title,
            content: input.content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            color: input.color || getRandomColor(),
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        await saveNotesMutation.mutateAsync(updatedNotes);
    };

    const updateNote = async (id: string, input: Partial<CreateNoteInput>) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    ...input,
                    updatedAt: new Date().toISOString(),
                };
            }
            return note;
        });

        setNotes(updatedNotes);
        await saveNotesMutation.mutateAsync(updatedNotes);
    };

    const deleteNote = async (id: string) => {
        const updatedNotes = notes.filter(n => n.id !== id);
        setNotes(updatedNotes);
        await saveNotesMutation.mutateAsync(updatedNotes);
    };

    const getNoteById = (id: string) => notes.find(n => n.id === id);

    return {
        notes,
        isLoading,
        addNote,
        updateNote,
        deleteNote,
        getNoteById,
    };
});
