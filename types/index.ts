export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';
export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';
export type ViewType = 'daily' | 'weekly' | 'monthly';
export type CardColor = 'lilac' | 'mint' | 'bubblegum' | 'peach' | 'sky';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    dueTime?: string;
    recurrence: RecurrenceType;
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

export interface TaskFilter {
    view: ViewType;
    date: Date;
}
