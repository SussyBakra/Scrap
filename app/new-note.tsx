import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    SafeAreaView,
    Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNotes } from '@/providers/NoteProvider';
import { BouncyButton } from '@/components/BouncyButton';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/theme';
import { X } from 'lucide-react-native';
import type { CardColor } from '@/types';

const colorOptions: { color: CardColor; hex: string }[] = [
    { color: 'lilac', hex: colors.lilac },
    { color: 'mint', hex: colors.mint },
    { color: 'bubblegum', hex: colors.bubblegum },
    { color: 'peach', hex: colors.peach },
    { color: 'sky', hex: colors.sky },
];

export default function NewNoteScreen() {
    const router = useRouter();
    const { addNote } = useNotes();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedColor, setSelectedColor] = useState<CardColor>('sky');

    const handleSave = async () => {
        if (!content.trim()) return;

        await addNote({
            title: title.trim(),
            content: content.trim(),
            color: selectedColor,
        });

        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.screenTitle}>New Note</Text>
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
                <Text style={styles.label}>TITLE</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Note title (optional)"
                    placeholderTextColor={colors.gray}
                />

                {/* Content */}
                <Text style={styles.label}>CONTENT *</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Write your note here..."
                    placeholderTextColor={colors.gray}
                    multiline
                    numberOfLines={8}
                    textAlignVertical="top"
                    autoFocus
                />

                {/* Color */}
                <Text style={styles.label}>COLOR</Text>
                <View style={styles.colorRow}>
                    {colorOptions.map(option => (
                        <Pressable
                            key={option.color}
                            onPress={() => setSelectedColor(option.color)}
                            style={[
                                styles.colorDot,
                                { backgroundColor: option.hex },
                                selectedColor === option.color ? styles.colorDotSelected : null,
                            ]}
                        />
                    ))}
                </View>

                {/* Save Button */}
                <View style={styles.saveWrapper}>
                    <BouncyButton
                        onPress={handleSave}
                        color={selectedColor}
                        size="large"
                        disabled={!content.trim()}
                        style={[
                            styles.saveButton,
                            !content.trim() ? styles.saveDisabled : null,
                        ] as any}
                    >
                        <Text style={styles.saveText}>Save Note</Text>
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
        minHeight: 200,
        paddingTop: spacing.sm + 4,
        lineHeight: 26,
    },
    colorRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    colorDot: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: colors.lightGray,
    },
    colorDotSelected: {
        borderColor: colors.black,
        borderWidth: 4,
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
