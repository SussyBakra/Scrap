import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BrutalCard } from './BrutalCard';
import { colors, spacing, fontSizes } from '@/constants/theme';
import type { Note } from '@/types';
import { format, parseISO } from 'date-fns';
import { Trash2 } from 'lucide-react-native';

interface NoteCardProps {
    note: Note;
    onDelete?: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
    note,
    onDelete,
}) => {
    return (
        <BrutalCard accentColor={note.color}>
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>
                    {note.title || 'Untitled Note'}
                </Text>
                {onDelete && (
                    <Pressable
                        onPress={() => onDelete(note.id)}
                        hitSlop={12}
                        style={styles.deleteBtn}
                    >
                        <Trash2 size={16} color={colors.error} />
                    </Pressable>
                )}
            </View>

            <Text style={styles.content} numberOfLines={3}>
                {note.content}
            </Text>

            <Text style={styles.date}>
                {format(parseISO(note.updatedAt), 'MMM d, h:mm a')}
            </Text>
        </BrutalCard>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },
    title: {
        fontSize: fontSizes.lg,
        fontWeight: '800' as const,
        color: colors.black,
        flex: 1,
        marginRight: spacing.sm,
    },
    deleteBtn: {
        padding: spacing.xs,
    },
    content: {
        fontSize: fontSizes.md,
        color: colors.ink,
        lineHeight: 24,
        marginBottom: spacing.sm,
    },
    date: {
        fontSize: fontSizes.xs,
        color: colors.gray,
        fontWeight: '600' as const,
    },
});
