import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '@/providers/TaskProvider';
import { TaskCard } from '@/components/TaskCard';
import { BouncyButton } from '@/components/BouncyButton';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/theme';
import { Plus, ChevronDown, ChevronRight, ListChecks } from 'lucide-react-native';
import type { Task } from '@/types';

export default function TasksScreen() {
    const router = useRouter();
    const { todayTasks, upcomingTasks, completedTasks, toggleTaskStatus, deleteTask } = useTasks();

    const [showCompleted, setShowCompleted] = useState(false);

    const renderSection = (title: string, emoji: string, tasks: Task[], collapsed?: boolean, onToggleCollapse?: () => void) => {
        if (tasks.length === 0 && !collapsed) return null;

        return (
            <View style={styles.section} key={title}>
                <Pressable
                    style={styles.sectionHeader}
                    onPress={onToggleCollapse}
                >
                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionEmoji}>{emoji}</Text>
                        <Text style={styles.sectionLabel}>{title}</Text>
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>{tasks.length}</Text>
                        </View>
                    </View>
                    {onToggleCollapse && (
                        collapsed
                            ? <ChevronRight size={20} color={colors.gray} />
                            : <ChevronDown size={20} color={colors.gray} />
                    )}
                </Pressable>

                {!collapsed && tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={toggleTaskStatus}
                        onDelete={deleteTask}
                    />
                ))}
            </View>
        );
    };

    const noTasks = todayTasks.length === 0 && upcomingTasks.length === 0 && completedTasks.length === 0;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.cream} />

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>My Tasks</Text>
                    <Text style={styles.headerSubtitle}>
                        {todayTasks.length + upcomingTasks.length} active
                    </Text>
                </View>

                <BouncyButton
                    variant="fab"
                    color="lilac"
                    onPress={() => router.push('/new-task')}
                >
                    <Plus size={28} color={colors.black} strokeWidth={3} />
                </BouncyButton>
            </View>

            {noTasks ? (
                <View style={styles.emptyState}>
                    <ListChecks size={80} color={colors.lightGray} strokeWidth={1.5} />
                    <Text style={styles.emptyTitle}>No tasks yet</Text>
                    <Text style={styles.emptySubtitle}>
                        Tap the + button to create your first task
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={[1]}
                    renderItem={() => (
                        <View style={styles.listContent}>
                            {renderSection('Today + Overdue', '🔥', todayTasks)}
                            {renderSection('Upcoming', '📅', upcomingTasks)}
                            {completedTasks.length > 0 && renderSection(
                                'Completed',
                                '✅',
                                completedTasks,
                                !showCompleted,
                                () => setShowCompleted(prev => !prev)
                            )}
                        </View>
                    )}
                    keyExtractor={() => 'tasks-list'}
                    contentContainerStyle={styles.flatListContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '900' as const,
        color: colors.black,
        letterSpacing: -1,
    },
    headerSubtitle: {
        fontSize: fontSizes.md,
        fontWeight: '600' as const,
        color: colors.gray,
        marginTop: 2,
    },
    flatListContent: {
        paddingBottom: spacing.xxl,
    },
    listContent: {
        paddingHorizontal: spacing.lg,
    },
    section: {
        marginBottom: spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
        marginBottom: spacing.sm,
    },
    sectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    sectionEmoji: {
        fontSize: 18,
    },
    sectionLabel: {
        fontSize: fontSizes.md,
        fontWeight: '800' as const,
        color: colors.black,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    countBadge: {
        backgroundColor: colors.lightGray,
        borderRadius: borderRadius.round,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    countText: {
        fontSize: fontSizes.xs,
        fontWeight: '700' as const,
        color: colors.ink,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    emptyTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '800' as const,
        color: colors.black,
        marginTop: spacing.lg,
    },
    emptySubtitle: {
        fontSize: fontSizes.md,
        color: colors.gray,
        textAlign: 'center',
        marginTop: spacing.sm,
    },
});
