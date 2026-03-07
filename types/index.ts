export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';
export type CardColor = 'lilac' | 'mint' | 'bubblegum' | 'peach' | 'sky';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    dueTime?: string;
    createdAt: string;
    completedAt?: string;
    notificationId?: string;
    color: CardColor;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    color: CardColor;
}
