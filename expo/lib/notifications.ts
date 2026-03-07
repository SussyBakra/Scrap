import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { Task } from '@/types';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
    if (Platform.OS === 'web') return false;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    return finalStatus === 'granted';
}

export async function scheduleTaskNotification(task: Task): Promise<string | null> {
    if (Platform.OS === 'web') return null;

    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return null;

    const dueDate = new Date(task.dueDate);
    if (task.dueTime) {
        const [hours, minutes] = task.dueTime.split(':').map(Number);
        dueDate.setHours(hours, minutes, 0, 0);
    } else {
        dueDate.setHours(9, 0, 0, 0);
    }

    if (dueDate <= new Date()) return null;

    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: '📝 Task Reminder',
            body: task.title,
            data: { taskId: task.id },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: dueDate,
        },
    });

    return notificationId;
}

export async function cancelNotification(notificationId: string): Promise<void> {
    if (Platform.OS === 'web') return;
    await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function cancelAllNotifications(): Promise<void> {
    if (Platform.OS === 'web') return;
    await Notifications.cancelAllScheduledNotificationsAsync();
}
