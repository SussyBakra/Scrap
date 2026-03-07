import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNotes } from '@/providers/NoteProvider';
import { BouncyButton } from '@/components/BouncyButton';
import { SpiralBoundCard } from '@/components/SpiralBoundCard';
import { colors, spacing, fontSizes } from '@/constants/theme';
import type { CardColor } from '@/types';
import { X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const colorOptions: { color: CardColor; label: string }[] = [
    { color: 'lilac', label: 'Lilac' },
    { color: 'mint', label: 'Mint' },
    { color: 'bubblegum', label: 'Pink' },
    { color: 'peach', label: 'Peach' },
    { color: 'sky', label: 'Sky' },
];

export default function CreateNoteScreen() {
    const insets = useSafeAreaInsets();
    const { addNote } = useNotes();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedColor, setSelectedColor] = useState<CardColor>('peach');

    const handleSave = async () => {
        if (!content.trim()) return;

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        await addNote({
            title: title.trim() || 'Untitled Note',
            content: content.trim(),
            color: selectedColor,
        });

        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>New Note</Text>
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
                        <Text style={styles.label}>Title (Optional)</Text>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Give your note a title..."
                            placeholderTextColor={colors.gray}
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                        />
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.label}>Your Note</Text>
                        <TextInput
                            style={styles.contentInput}
                            placeholder="Start writing your thoughts here..."
                            placeholderTextColor={colors.gray}
                            value={content}
                            onChangeText={setContent}
                            multiline
                            numberOfLines={10}
                            maxLength={2000}
                            textAlignVertical="top"
                            autoFocus
                        />
                    </View>
                </SpiralBoundCard>

                <Text style={styles.sectionTitle}>Note Color</Text>
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

                <View style={styles.previewSection}>
                    <Text style={styles.sectionTitle}>Preview</Text>
                    <View style={styles.previewCard}>
                        <Text style={styles.previewTitle}>
                            {title || 'Untitled Note'}
                        </Text>
                        <Text style={styles.previewContent} numberOfLines={3}>
                            {content || 'Your note content will appear here...'}
                        </Text>
                    </View>
                </View>

                <BouncyButton
                    color="mint"
                    size="large"
                    onPress={handleSave}
                    style={[
                        styles.saveButton,
                        !content.trim() ? styles.saveButtonDisabled : null,
                    ] as any}
                >
                    <Text style={styles.saveButtonText}>Save Note</Text>
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
    contentInput: {
        fontSize: fontSizes.md,
        color: colors.ink,
        padding: spacing.sm,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.black,
        minHeight: 200,
        lineHeight: 24,
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
    previewSection: {
        marginTop: spacing.md,
    },
    previewCard: {
        backgroundColor: colors.paper,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: colors.black,
        padding: spacing.md,
    },
    previewTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '900',
        color: colors.black,
        marginBottom: spacing.sm,
    },
    previewContent: {
        fontSize: fontSizes.md,
        color: colors.ink,
        lineHeight: 22,
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
