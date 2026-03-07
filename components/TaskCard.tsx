import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BrutalCard } from './BrutalCard';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/theme';
import type { Task } from '@/types';
import { format, parseISO } from 'date-fns';
import { Trash2, Clock } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const priorityLabels: Record<Task['priority'], string> = {
    low: 'LOW',
    medium: 'MED',
    high: 'HIGH',
};

const priorityColors: Record<Task['priority'], string> = {
    low: colors.priorityLow,
    medium: colors.priorityMed,
    high: colors.priorityHigh,
};

export const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onToggle,
    onDelete,
}) => {
    const isCompleted = task.status === 'completed';

    const handleToggle = () => {
        Haptics.notificationAsync(
            isCompleted
                ? Haptics.NotificationFeedbackType.Warning
                : Haptics.NotificationFeedbackType.Success
        );
        onToggle(task.id);
    };

    return (
        <BrutalCard accentColor={task.color}>
            <View style={styles.row}>
                <Pressable
                    onPress={handleToggle}
                    style={[
                        styles.checkbox,
                        isCompleted ? styles.checkboxChecked : null,
                    ]}
                    hitSlop={8}
                >
                    {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                </Pressable>

                <View style={styles.body}>
                    <View style={styles.titleRow}>
                        <Text
                            style={[
                                styles.title,
                                isCompleted ? styles.titleDone : null,
                            ]}
                            numberOfLines={2}
                        >
                            {task.title}
                        </Text>
                        <View style={[styles.priorityBadge, { backgroundColor: priorityColors[task.priority] }]}>
                            <Text style={styles.priorityText}>{priorityLabels[task.priority]}</Text>
                        </View>
                    </View>

                    {task.description ? (
                        <Text style={styles.description} numberOfLines={1}>
                            {task.description}
                        </Text>
                    ) : null}

                    <View style={styles.meta}>
                        <View style={styles.datePill}>
                            <Clock size={12} color={colors.ink} />
                            <Text style={styles.dateText}>
                                {format(parseISO(task.dueDate), 'MMM d')}
                                {task.dueTime ? ` · ${task.dueTime}` : ''}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() => onDelete(task.id)}
                            hitSlop={12}
                            style={styles.deleteBtn}
                        >
                            <Trash2 size={16} color={colors.error} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </BrutalCard>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 6,
        borderWidth: 3,
        borderColor: colors.black,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
        marginTop: 2,
    },
    checkboxChecked: {
        backgroundColor: colors.mint,
    },
    checkmark: {
        fontSize: 14,
        fontWeight: '900' as const,
        color: colors.black,
    },
    body: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    title: {
        fontSize: fontSizes.md,
        fontWeight: '700' as const,
        color: colors.black,
        flex: 1,
        lineHeight: 22,
    },
    titleDone: {
        textDecorationLine: 'line-through',
        opacity: 0.4,
    },
    description: {
        fontSize: fontSizes.sm,
        color: colors.gray,
        marginTop: 4,
    },
    priorityBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.black,
    },
    priorityText: {
        fontSize: 10,
        fontWeight: '800' as const,
        color: colors.black,
        letterSpacing: 1,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.sm,
    },
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: colors.lightGray,
        paddingHorizontal: spacing.sm,
        paddingVertical: 3,
        borderRadius: borderRadius.sm,
    },
    dateText: {
        fontSize: fontSizes.xs,
        fontWeight: '600' as const,
        color: colors.ink,
    },
    deleteBtn: {
        padding: spacing.xs,
    },
});
