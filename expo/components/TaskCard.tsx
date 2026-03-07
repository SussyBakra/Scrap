import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { SpiralBoundCard } from './SpiralBoundCard';
import { MarkerScribble } from './MarkerScribble';
import { colors, spacing, fontSizes } from '@/constants/theme';
import type { Task } from '@/types';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Repeat, Trash2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onPress?: (task: Task) => void;
}

const priorityLabels: Record<Task['priority'], string> = {
    low: 'Low',
    medium: 'Med',
    high: 'High',
};

const priorityColors: Record<Task['priority'], string> = {
    low: colors.mint,
    medium: colors.peach,
    high: colors.bubblegum,
};

export const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onToggle,
    onDelete,
    onPress,
}) => {
    const [showScribble, setShowScribble] = useState(false);
    const isCompleted = task.status === 'completed';

    const handleToggle = () => {
        if (!isCompleted) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setShowScribble(true);
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onToggle(task.id);
    };

    const handleScribbleComplete = () => {
        setShowScribble(false);
    };

    return (
        <SpiralBoundCard color={task.color}>
            <Pressable onPress={() => onPress?.(task)} style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.checkboxContainer}>
                        <Pressable
                            onPress={handleToggle}
                            style={[
                                styles.checkbox,
                                isCompleted && styles.checkboxChecked,
                            ]}
                        >
                            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                        </Pressable>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text
                            style={[
                                styles.title,
                                isCompleted && styles.titleCompleted,
                            ]}
                            numberOfLines={2}
                        >
                            {task.title}
                        </Text>
                        <MarkerScribble
                            isVisible={showScribble}
                            onComplete={handleScribbleComplete}
                        />
                    </View>

                    <View style={[
                        styles.priorityBadge,
                        { backgroundColor: priorityColors[task.priority] },
                    ]}>
                        <Text style={styles.priorityText}>{priorityLabels[task.priority]}</Text>
                    </View>
                </View>

                {task.description && (
                    <Text style={styles.description} numberOfLines={2}>
                        {task.description}
                    </Text>
                )}

                <View style={styles.footer}>
                    <View style={styles.metaContainer}>
                        <View style={styles.metaItem}>
                            <Calendar size={14} color={colors.black} />
                            <Text style={styles.metaText}>
                                {format(parseISO(task.dueDate), 'MMM d')}
                            </Text>
                        </View>

                        {task.dueTime && (
                            <View style={styles.metaItem}>
                                <Clock size={14} color={colors.black} />
                                <Text style={styles.metaText}>{task.dueTime}</Text>
                            </View>
                        )}

                        {task.recurrence !== 'none' && (
                            <View style={styles.metaItem}>
                                <Repeat size={14} color={colors.black} />
                                <Text style={styles.metaText}>
                                    {task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}
                                </Text>
                            </View>
                        )}
                    </View>

                    <Pressable
                        onPress={() => onDelete(task.id)}
                        style={styles.deleteButton}
                        hitSlop={8}
                    >
                        <Trash2 size={18} color={colors.error} />
                    </Pressable>
                </View>
            </Pressable>
        </SpiralBoundCard>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.xs,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    checkboxContainer: {
        marginRight: spacing.sm,
        marginTop: 2,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 3,
        borderColor: colors.black,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.mint,
    },
    checkmark: {
        fontSize: 14,
        fontWeight: '900',
        color: colors.black,
    },
    titleContainer: {
        flex: 1,
        position: 'relative',
    },
    title: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.black,
        lineHeight: 22,
    },
    titleCompleted: {
        opacity: 0.5,
    },
    priorityBadge: {
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.black,
        marginLeft: spacing.sm,
    },
    priorityText: {
        fontSize: fontSizes.xs,
        fontWeight: '700',
        color: colors.black,
    },
    description: {
        fontSize: fontSizes.sm,
        color: colors.gray,
        marginLeft: 36,
        marginBottom: spacing.sm,
        fontStyle: 'italic',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 36,
    },
    metaContainer: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: fontSizes.xs,
        fontWeight: '600',
        color: colors.ink,
    },
    deleteButton: {
        padding: spacing.xs,
    },
});
