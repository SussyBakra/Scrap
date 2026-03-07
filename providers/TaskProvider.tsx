import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';
import { storage } from '@/lib/storage';
import { scheduleTaskNotification, cancelNotification } from '@/lib/notifications';
import type { Task, TaskStatus, ViewType, CardColor } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { isSameDay, isSameWeek, isSameMonth, parseISO } from 'date-fns';

interface CreateTaskInput {
    title: string;
    description?: string;
    priority?: Task['priority'];
    dueDate: string;
    dueTime?: string;
    recurrence?: Task['recurrence'];
    color?: CardColor;
}

interface TaskContextValue {
    tasks: Task[];
    isLoading: boolean;
    addTask: (input: CreateTaskInput) => Promise<void>;
    toggleTaskStatus: (taskId: string) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    getFilteredTasks: (view: ViewType, date: Date) => Task[];
    getTaskById: (id: string) => Task | undefined;
}

const colorPalette: CardColor[] = ['lilac', 'mint', 'bubblegum', 'peach', 'sky'];

const getRandomColor = (): CardColor =>
    colorPalette[Math.floor(Math.random() * colorPalette.length)];

export const [TaskProvider, useTasks] = createContextHook<TaskContextValue>(() => {
    const queryClient = useQueryClient();
    const [tasks, setTasks] = useState<Task[]>([]);

    const { data: storedTasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: storage.getTasks,
    });

    useEffect(() => {
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, [storedTasks]);

    const saveTasksMutation = useMutation({
        mutationFn: storage.saveTasks,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const addTask = async (input: CreateTaskInput) => {
        const newTask: Task = {
            id: uuidv4(),
            title: input.title,
            description: input.description,
            status: 'pending',
            priority: input.priority || 'medium',
            dueDate: input.dueDate,
            dueTime: input.dueTime,
            recurrence: input.recurrence || 'none',
            createdAt: new Date().toISOString(),
            color: input.color || getRandomColor(),
        };

        const notificationId = await scheduleTaskNotification(newTask);
        if (notificationId) {
            newTask.notificationId = notificationId;
        }

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        await saveTasksMutation.mutateAsync(updatedTasks);
    };

    const toggleTaskStatus = async (taskId: string) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                const newStatus: TaskStatus = task.status === 'pending' ? 'completed' : 'pending';
                return {
                    ...task,
                    status: newStatus,
                    completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
                };
            }
            return task;
        });

        setTasks(updatedTasks);
        await saveTasksMutation.mutateAsync(updatedTasks);
    };

    const deleteTask = async (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (task?.notificationId) {
            await cancelNotification(task.notificationId);
        }

        const updatedTasks = tasks.filter(t => t.id !== taskId);
        setTasks(updatedTasks);
        await saveTasksMutation.mutateAsync(updatedTasks);
    };

    const getFilteredTasks = (view: ViewType, date: Date): Task[] => {
        return tasks.filter(task => {
            const taskDate = parseISO(task.dueDate);
            switch (view) {
                case 'daily':
                    return isSameDay(taskDate, date);
                case 'weekly':
                    return isSameWeek(taskDate, date, { weekStartsOn: 1 });
                case 'monthly':
                    return isSameMonth(taskDate, date);
                default:
                    return true;
            }
        }).sort((a, b) => {
            if (a.status !== b.status) {
                return a.status === 'pending' ? -1 : 1;
            }
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
    };

    const getTaskById = (id: string) => tasks.find(t => t.id === id);

    return {
        tasks,
        isLoading,
        addTask,
        toggleTaskStatus,
        deleteTask,
        getFilteredTasks,
        getTaskById,
    };
});
