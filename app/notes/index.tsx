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
import { useNotes } from '@/providers/NoteProvider';
import { NoteCard } from '@/components/NoteCard';
import { BouncyButton } from '@/components/BouncyButton';
import { colors, spacing, fontSizes } from '@/constants/theme';
import { Plus, ListTodo } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function NotesScreen() {
    const insets = useSafeAreaInsets();
    const { notes, deleteNote } = useNotes();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 500);
    }, []);

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Quick Notes</Text>
                    <Text style={styles.headerSubtitle}>Capture ideas instantly</Text>
                </View>
                <View style={styles.headerActions}>
                    <BouncyButton
                        color="lilac"
                        size="small"
                        onPress={() => router.push('/tasks')}
                        style={styles.iconButton}
                    >
                        <ListTodo size={22} color={colors.black} />
                    </BouncyButton>
                    <BouncyButton
                        color="bubblegum"
                        size="small"
                        onPress={() => router.push('/new-note')}
                        style={styles.iconButton}
                    >
                        <Plus size={24} color={colors.black} />
                    </BouncyButton>
                </View>
            </View>

            <View style={styles.quickNoteSection}>
                <Text style={styles.sectionTitle}>New Quick Note</Text>
                <BouncyButton
                    color="peach"
                    onPress={() => router.push('/new-note')}
                    style={styles.quickNoteButton}
                >
                    <Text style={styles.quickNoteText}>Tap to write something...</Text>
                </BouncyButton>
            </View>

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
                <Text style={styles.sectionTitle}>All Notes ({notes.length})</Text>

                {notes.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>🗒️</Text>
                        <Text style={styles.emptyTitle}>No notes yet!</Text>
                        <Text style={styles.emptySubtitle}>
                            Jot down your thoughts and ideas here
                        </Text>
                    </View>
                ) : (
                    notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDelete={deleteNote}
                            onPress={() =>
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            }
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
    quickNoteSection: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.md,
        fontWeight: '800',
        color: colors.ink,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    quickNoteButton: {
        alignItems: 'flex-start',
        paddingVertical: spacing.lg,
    },
    quickNoteText: {
        fontSize: fontSizes.md,
        color: colors.gray,
        fontStyle: 'italic',
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
