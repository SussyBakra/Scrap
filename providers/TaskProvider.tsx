import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createContextHook from '@nkzw/create-context-hook';
import { storage } from '@/lib/storage';
import { scheduleTaskNotification, cancelNotification } from '@/lib/notifications';
import type { Task, TaskStatus, CardColor } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { isToday, isBefore, startOfDay, parseISO } from 'date-fns';

interface CreateTaskInput {
    title: string;
    description?: string;
    priority?: Task['priority'];
    dueDate: string;
    dueTime?: string;
    color?: CardColor;
}

interface TaskContextValue {
    tasks: Task[];
    isLoading: boolean;
    addTask: (input: CreateTaskInput) => Promise<void>;
    toggleTaskStatus: (taskId: string) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    todayTasks: Task[];
    upcomingTasks: Task[];
    completedTasks: Task[];
}

const priorityColors: Record<Task['priority'], CardColor> = {
    high: 'bubblegum',
    medium: 'peach',
    low: 'mint',
};

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
        const priority = input.priority || 'medium';
        const newTask: Task = {
            id: uuidv4(),
            title: input.title,
            description: input.description,
            status: 'pending',
            priority,
            dueDate: input.dueDate,
            dueTime: input.dueTime,
            createdAt: new Date().toISOString(),
            color: input.color || priorityColors[priority],
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

    const pendingTasks = tasks
        .filter(t => t.status === 'pending')
        .sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });

    const todayTasks = pendingTasks.filter(t => {
        const dueDate = parseISO(t.dueDate);
        return isToday(dueDate) || isBefore(dueDate, startOfDay(new Date()));
    });

    const upcomingTasks = pendingTasks.filter(t => {
        const dueDate = parseISO(t.dueDate);
        return !isToday(dueDate) && !isBefore(dueDate, startOfDay(new Date()));
    });

    const completedTasks = tasks
        .filter(t => t.status === 'completed')
        .sort((a, b) => new Date(b.completedAt || b.createdAt).getTime() - new Date(a.completedAt || a.createdAt).getTime());

    return {
        tasks,
        isLoading,
        addTask,
        toggleTaskStatus,
        deleteTask,
        todayTasks,
        upcomingTasks,
        completedTasks,
    };
});
