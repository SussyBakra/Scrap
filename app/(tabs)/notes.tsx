import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNotes } from '@/providers/NoteProvider';
import { NoteCard } from '@/components/NoteCard';
import { BouncyButton } from '@/components/BouncyButton';
import { colors, spacing, fontSizes } from '@/constants/theme';
import { Plus, FileText } from 'lucide-react-native';

export default function NotesScreen() {
    const router = useRouter();
    const { notes, deleteNote } = useNotes();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.cream} />

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Notes</Text>
                    <Text style={styles.headerSubtitle}>
                        {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                    </Text>
                </View>

                <BouncyButton
                    variant="fab"
                    color="sky"
                    onPress={() => router.push('/new-note')}
                >
                    <Plus size={28} color={colors.black} strokeWidth={3} />
                </BouncyButton>
            </View>

            {notes.length === 0 ? (
                <View style={styles.emptyState}>
                    <FileText size={80} color={colors.lightGray} strokeWidth={1.5} />
                    <Text style={styles.emptyTitle}>No notes yet</Text>
                    <Text style={styles.emptySubtitle}>
                        Tap the + button to jot down your first note
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={notes}
                    renderItem={({ item }) => (
                        <NoteCard
                            note={item}
                            onDelete={deleteNote}
                        />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
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
    listContent: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxl,
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
