import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/providers/TaskProvider';
import { TaskCard } from '@/components/TaskCard';
import { BouncyButton } from '@/components/BouncyButton';
import { colors, spacing, fontSizes, shadows } from '@/constants/theme';
import type { ViewType } from '@/types';
import { Plus, Calendar, ChevronLeft, ChevronRight, StickyNote } from 'lucide-react-native';
import {
    format,
    addDays,
    addWeeks,
    addMonths,
    startOfWeek,
    eachDayOfInterval,
    isSameDay,
} from 'date-fns';
import * as Haptics from 'expo-haptics';

export default function TasksScreen() {
    const insets = useSafeAreaInsets();
    const { tasks, getFilteredTasks, toggleTaskStatus, deleteTask } = useTasks();
    const [view, setView] = useState<ViewType>('daily');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [refreshing, setRefreshing] = useState(false);

    const filteredTasks = getFilteredTasks(view, currentDate);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 500);
    }, []);

    const navigateDate = (direction: 'prev' | 'next') => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (view === 'daily') {
            setCurrentDate((prev) =>
                direction === 'next' ? addDays(prev, 1) : addDays(prev, -1)
            );
        } else if (view === 'weekly') {
            setCurrentDate((prev) =>
                direction === 'next' ? addWeeks(prev, 1) : addWeeks(prev, -1)
            );
        } else {
            setCurrentDate((prev) =>
                direction === 'next' ? addMonths(prev, 1) : addMonths(prev, -1)
            );
        }
    };

    const getDateDisplay = () => {
        switch (view) {
            case 'daily':
                return format(currentDate, 'EEEE, MMM d');
            case 'weekly':
                const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
                return `${format(weekStart, 'MMM d')} - ${format(
                    addDays(weekStart, 6),
                    'MMM d'
                )}`;
            case 'monthly':
                return format(currentDate, 'MMMM yyyy');
        }
    };

    const renderCalendarStrip = () => {
        if (view !== 'daily') return null;
        const days = eachDayOfInterval({
            start: addDays(currentDate, -3),
            end: addDays(currentDate, 3),
        });

        return (
            <View style={styles.calendarStrip}>
                {days.map((day, index) => {
                    const isSelected = isSameDay(day, currentDate);
                    const dayTasks = tasks.filter(
                        (t) => isSameDay(new Date(t.dueDate), day) && t.status === 'pending'
                    );
                    return (
                        <BouncyButton
                            key={index}
                            variant="ghost"
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setCurrentDate(day);
                            }}
                            style={[
                                styles.dayButton,
                                isSelected && styles.dayButtonSelected,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayLabel,
                                    isSelected && styles.dayLabelSelected,
                                ]}
                            >
                                {format(day, 'EEE')}
                            </Text>
                            <Text
                                style={[
                                    styles.dayNumber,
                                    isSelected && styles.dayNumberSelected,
                                ]}
                            >
                                {format(day, 'd')}
                            </Text>
                            {dayTasks.length > 0 && (
                                <View
                                    style={[
                                        styles.taskDot,
                                        isSelected && styles.taskDotSelected,
                                    ]}
                                />
                            )}
                        </BouncyButton>
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>My Tasks</Text>
                    <Text style={styles.headerSubtitle}>Stay organized, stay creative</Text>
                </View>
                <View style={styles.headerActions}>
                    <BouncyButton
                        color="bubblegum"
                        size="small"
                        onPress={() => router.push('/notes')}
                        style={styles.iconButton}
                    >
                        <StickyNote size={20} color={colors.black} />
                    </BouncyButton>
                    <BouncyButton
                        color="mint"
                        size="small"
                        onPress={() => router.push('/new-task')}
                        style={styles.iconButton}
                    >
                        <Plus size={24} color={colors.black} />
                    </BouncyButton>
                </View>
            </View>

            <View style={styles.viewToggle}>
                {(['daily', 'weekly', 'monthly'] as ViewType[]).map((v) => (
                    <BouncyButton
                        key={v}
                        color={view === v ? 'lilac' : 'sky'}
                        size="small"
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            setView(v);
                        }}
                        style={[
                            styles.viewButton,
                            view === v && styles.viewButtonActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.viewButtonText,
                                view === v && styles.viewButtonTextActive,
                            ]}
                        >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </Text>
                    </BouncyButton>
                ))}
            </View>

            <View style={styles.dateNavigator}>
                <BouncyButton
                    variant="ghost"
                    size="small"
                    onPress={() => navigateDate('prev')}
                    style={styles.navArrow}
                >
                    <ChevronLeft size={24} color={colors.black} />
                </BouncyButton>
                <View style={styles.dateDisplay}>
                    <Calendar size={18} color={colors.black} />
                    <Text style={styles.dateText}>{getDateDisplay()}</Text>
                </View>
                <BouncyButton
                    variant="ghost"
                    size="small"
                    onPress={() => navigateDate('next')}
                    style={styles.navArrow}
                >
                    <ChevronRight size={24} color={colors.black} />
                </BouncyButton>
            </View>

            {renderCalendarStrip()}

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.black}
                    />
                }
            >
                {filteredTasks.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>📝</Text>
                        <Text style={styles.emptyTitle}>No tasks yet!</Text>
                        <Text style={styles.emptySubtitle}>
                            Tap the + button to add your first task
                        </Text>
                    </View>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={toggleTaskStatus}
                            onDelete={deleteTask}
                            onPress={() => { }}
                        />
                    ))
                )}
            </ScrollView>
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
        alignItems: 'flex-start',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    headerTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '900',
        color: colors.black,
        letterSpacing: -1,
    },
    headerSubtitle: {
        fontSize: fontSizes.md,
        color: colors.gray,
        marginTop: spacing.xs,
    },
    headerActions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    iconButton: {
        paddingHorizontal: spacing.md,
    },
    viewToggle: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    viewButton: {
        flex: 1,
    },
    viewButtonActive: {
        borderWidth: 3,
    },
    viewButtonText: {
        fontWeight: '700',
        fontSize: fontSizes.sm,
        color: colors.ink,
    },
    viewButtonTextActive: {
        color: colors.black,
    },
    dateNavigator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    navArrow: {
        padding: spacing.xs,
    },
    dateDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.white,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: colors.black,
        ...shadows.small,
    },
    dateText: {
        fontSize: fontSizes.md,
        fontWeight: '800',
        color: colors.black,
    },
    calendarStrip: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
        gap: spacing.xs,
    },
    dayButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.xs,
        alignItems: 'center',
    },
    dayButtonSelected: {
        backgroundColor: colors.lilac,
    },
    dayLabel: {
        fontSize: fontSizes.xs,
        fontWeight: '600',
        color: colors.gray,
        marginBottom: 2,
    },
    dayLabelSelected: {
        color: colors.black,
    },
    dayNumber: {
        fontSize: fontSizes.lg,
        fontWeight: '800',
        color: colors.black,
    },
    dayNumberSelected: {
        color: colors.black,
    },
    taskDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.bubblegum,
        marginTop: 2,
    },
    taskDotSelected: {
        backgroundColor: colors.black,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: spacing.md,
    },
    emptyTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '800',
        color: colors.black,
        marginBottom: spacing.xs,
    },
    emptySubtitle: {
        fontSize: fontSizes.md,
        color: colors.gray,
        textAlign: 'center',
    },
});
