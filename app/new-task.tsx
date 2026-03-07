import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    SafeAreaView,
    Platform,
    Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '@/providers/TaskProvider';
import { BouncyButton } from '@/components/BouncyButton';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { X, Calendar, Flag } from 'lucide-react-native';
import { format } from 'date-fns';
import type { Task } from '@/types';

type Priority = Task['priority'];

const priorities: { value: Priority; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: colors.priorityLow },
    { value: 'medium', label: 'Medium', color: colors.priorityMed },
    { value: 'high', label: 'High', color: colors.priorityHigh },
];

export default function NewTaskScreen() {
    const router = useRouter();
    const { addTask } = useTasks();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSave = async () => {
        if (!title.trim()) return;

        await addTask({
            title: title.trim(),
            description: description.trim() || undefined,
            priority,
            dueDate: dueDate.toISOString(),
        });

        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.screenTitle}>New Task</Text>
                <Pressable onPress={() => router.back()} hitSlop={12}>
                    <X size={28} color={colors.black} strokeWidth={3} />
                </Pressable>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Title */}
                <Text style={styles.label}>TITLE *</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="What needs to be done?"
                    placeholderTextColor={colors.gray}
                    autoFocus
                />

                {/* Description */}
                <Text style={styles.label}>DESCRIPTION</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Add details (optional)"
                    placeholderTextColor={colors.gray}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                />

                {/* Priority */}
                <Text style={styles.label}>PRIORITY</Text>
                <View style={styles.priorityRow}>
                    {priorities.map(p => (
                        <Pressable
                            key={p.value}
                            onPress={() => setPriority(p.value)}
                            style={[
                                styles.priorityBtn,
                                priority === p.value ? { backgroundColor: p.color, borderColor: colors.black } : null,
                            ]}
                        >
                            <Flag size={14} color={priority === p.value ? colors.black : colors.gray} />
                            <Text style={[
                                styles.priorityLabel,
                                priority === p.value ? styles.priorityLabelActive : null,
                            ]}>
                                {p.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Due Date */}
                <Text style={styles.label}>DUE DATE</Text>
                <Pressable
                    style={styles.dateBtn}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Calendar size={18} color={colors.black} />
                    <Text style={styles.dateText}>
                        {format(dueDate, 'EEEE, MMM d, yyyy')}
                    </Text>
                </Pressable>

                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate}
                        mode="date"
                        minimumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(Platform.OS === 'ios');
                            if (selectedDate) setDueDate(selectedDate);
                        }}
                    />
                )}

                {/* Save Button */}
                <View style={styles.saveWrapper}>
                    <BouncyButton
                        onPress={handleSave}
                        color="mint"
                        size="large"
                        disabled={!title.trim()}
                        style={[
                            styles.saveButton,
                            !title.trim() ? styles.saveDisabled : null,
                        ] as any}
                    >
                        <Text style={styles.saveText}>Create Task</Text>
                    </BouncyButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cream,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '900' as const,
        color: colors.black,
        letterSpacing: -0.5,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    label: {
        fontSize: fontSizes.xs,
        fontWeight: '800' as const,
        color: colors.gray,
        letterSpacing: 2,
        marginBottom: spacing.sm,
        marginTop: spacing.lg,
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 3,
        borderColor: colors.black,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 4,
        fontSize: fontSizes.md,
        fontWeight: '600' as const,
        color: colors.black,
    },
    textArea: {
        minHeight: 80,
        paddingTop: spacing.sm + 4,
    },
    priorityRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    priorityBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: spacing.sm + 2,
        borderRadius: borderRadius.md,
        borderWidth: 3,
        borderColor: colors.lightGray,
        backgroundColor: colors.white,
    },
    priorityLabel: {
        fontSize: fontSizes.sm,
        fontWeight: '700' as const,
        color: colors.gray,
    },
    priorityLabelActive: {
        color: colors.black,
    },
    dateBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.white,
        borderWidth: 3,
        borderColor: colors.black,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 4,
    },
    dateText: {
        fontSize: fontSizes.md,
        fontWeight: '600' as const,
        color: colors.black,
    },
    saveWrapper: {
        marginTop: spacing.xl,
    },
    saveButton: {
        width: '100%',
    },
    saveDisabled: {
        opacity: 0.4,
    },
    saveText: {
        fontSize: fontSizes.lg,
        fontWeight: '800' as const,
        color: colors.black,
        letterSpacing: 0.5,
    },
});
