import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    SafeAreaView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTasks } from '@/providers/TaskProvider';
import { BouncyButton } from '@/components/BouncyButton';
import { SpiralBoundCard } from '@/components/SpiralBoundCard';
import { colors, spacing, fontSizes } from '@/constants/theme';
import type { CardColor, TaskPriority, RecurrenceType } from '@/types';
import { X, Calendar, Clock, Repeat, Flag } from 'lucide-react-native';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';

const colorOptions: { color: CardColor; label: string }[] = [
    { color: 'lilac', label: 'Lilac' },
    { color: 'mint', label: 'Mint' },
    { color: 'bubblegum', label: 'Pink' },
    { color: 'peach', label: 'Peach' },
    { color: 'sky', label: 'Sky' },
];

const priorityOptions: { value: TaskPriority; label: string }[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
];

const recurrenceOptions: { value: RecurrenceType; label: string }[] = [
    { value: 'none', label: 'Once' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
];

export default function CreateTaskScreen() {
    const insets = useSafeAreaInsets();
    const { addTask } = useTasks();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState<CardColor>('lilac');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [recurrence, setRecurrence] = useState<RecurrenceType>('none');
    const [dueDate, setDueDate] = useState(new Date());
    const [dueTime, setDueTime] = useState(new Date());
    const [hasTime, setHasTime] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleSave = async () => {
        if (!title.trim()) return;

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        await addTask({
            title: title.trim(),
            description: description.trim() || undefined,
            priority,
            dueDate: dueDate.toISOString(),
            dueTime: hasTime ? format(dueTime, 'HH:mm') : undefined,
            recurrence,
            color: selectedColor,
        });

        router.back();
    };

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDueDate(selectedDate);
        }
    };

    const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            setDueTime(selectedTime);
            setHasTime(true);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>New Task</Text>
                <BouncyButton
                    color="peach"
                    size="small"
                    onPress={() => router.back()}
                >
                    <X size={24} color={colors.black} />
                </BouncyButton>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <SpiralBoundCard color={selectedColor} animatePress={false}>
                    <View style={styles.formSection}>
                        <Text style={styles.label}>What needs to be done?</Text>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Enter task title..."
                            placeholderTextColor={colors.gray}
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                        />
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.label}>Add details (optional)</Text>
                        <TextInput
                            style={styles.descriptionInput}
                            placeholder="Add more details..."
                            placeholderTextColor={colors.gray}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={3}
                            maxLength={500}
                        />
                    </View>
                </SpiralBoundCard>

                <Text style={styles.sectionTitle}>Color</Text>
                <View style={styles.colorGrid}>
                    {colorOptions.map((option) => (
                        <BouncyButton
                            key={option.color}
                            color={option.color}
                            size="small"
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setSelectedColor(option.color);
                            }}
                            style={[
                                styles.colorButton,
                                selectedColor === option.color ? styles.colorButtonSelected : null,
                            ] as any}
                        >
                            <Text style={styles.colorLabel}>{option.label}</Text>
                        </BouncyButton>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Priority</Text>
                <View style={styles.optionsRow}>
                    {priorityOptions.map((option) => (
                        <BouncyButton
                            key={option.value}
                            color={priority === option.value ? 'bubblegum' : 'sky'}
                            size="small"
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setPriority(option.value);
                            }}
                            style={[
                                styles.optionButton,
                                priority === option.value ? styles.optionButtonSelected : null,
                            ] as any}
                        >
                            <Flag size={14} color={colors.black} />
                            <Text style={styles.optionText}>{option.label}</Text>
                        </BouncyButton>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Due Date</Text>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.dateTimeButton}
                >
                    <Calendar size={20} color={colors.black} />
                    <Text style={styles.dateTimeText}>
                        {format(dueDate, 'EEEE, MMM d, yyyy')}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                        minimumDate={new Date()}
                    />
                )}

                <Text style={styles.sectionTitle}>Time (Optional)</Text>
                <TouchableOpacity
                    onPress={() => setShowTimePicker(true)}
                    style={styles.dateTimeButton}
                >
                    <Clock size={20} color={colors.black} />
                    <Text style={styles.dateTimeText}>
                        {hasTime ? format(dueTime, 'h:mm a') : 'Set time...'}
                    </Text>
                </TouchableOpacity>

                {showTimePicker && (
                    <DateTimePicker
                        value={dueTime}
                        mode="time"
                        display="default"
                        onChange={onTimeChange}
                    />
                )}

                <Text style={styles.sectionTitle}>Repeat</Text>
                <View style={styles.optionsRow}>
                    {recurrenceOptions.map((option) => (
                        <BouncyButton
                            key={option.value}
                            color={recurrence === option.value ? 'mint' : 'sky'}
                            size="small"
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setRecurrence(option.value);
                            }}
                            style={[
                                styles.optionButton,
                                recurrence === option.value ? styles.optionButtonSelected : null,
                            ] as any}
                        >
                            <Repeat size={14} color={colors.black} />
                            <Text style={styles.optionText}>{option.label}</Text>
                        </BouncyButton>
                    ))}
                </View>

                <BouncyButton
                    color="mint"
                    size="large"
                    onPress={handleSave}
                    style={[
                        styles.saveButton,
                        !title.trim() ? styles.saveButtonDisabled : null,
                    ] as any}
                >
                    <Text style={styles.saveButtonText}>Create Task</Text>
                </BouncyButton>
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
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '900',
        color: colors.black,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    formSection: {
        marginBottom: spacing.md,
    },
    label: {
        fontSize: fontSizes.sm,
        fontWeight: '700',
        color: colors.ink,
        marginBottom: spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    titleInput: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.black,
        padding: spacing.sm,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.black,
    },
    descriptionInput: {
        fontSize: fontSizes.md,
        color: colors.ink,
        padding: spacing.sm,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.black,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    sectionTitle: {
        fontSize: fontSizes.md,
        fontWeight: '800',
        color: colors.ink,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    colorButton: {
        flex: 1,
        minWidth: 60,
    },
    colorButtonSelected: {
        borderWidth: 4,
    },
    colorLabel: {
        fontSize: fontSizes.xs,
        fontWeight: '800',
        color: colors.black,
    },
    optionsRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        flexWrap: 'wrap',
    },
    optionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    optionButtonSelected: {
        borderWidth: 3,
    },
    optionText: {
        fontSize: fontSizes.sm,
        fontWeight: '700',
        color: colors.black,
    },
    dateTimeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: colors.black,
    },
    dateTimeText: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.black,
    },
    saveButton: {
        marginTop: spacing.xl,
        marginBottom: spacing.lg,
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    saveButtonText: {
        fontSize: fontSizes.lg,
        fontWeight: '900',
        color: colors.black,
    },
});
