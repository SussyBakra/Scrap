import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SpiralBoundCard } from './SpiralBoundCard';
import { colors, spacing, fontSizes } from '@/constants/theme';
import type { Note } from '@/types';
import { format, parseISO } from 'date-fns';
import { Trash2, Edit3 } from 'lucide-react-native';

interface NoteCardProps {
    note: Note;
    onPress?: (note: Note) => void;
    onDelete?: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
    note,
    onPress,
    onDelete,
}) => {
    return (
        <SpiralBoundCard color={note.color}>
            <Pressable onPress={() => onPress?.(note)} style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>
                        {note.title || 'Untitled Note'}
                    </Text>
                    <Pressable
                        onPress={() => onDelete?.(note.id)}
                        style={styles.deleteButton}
                        hitSlop={8}
                    >
                        <Trash2 size={18} color={colors.error} />
                    </Pressable>
                </View>

                <Text style={styles.content} numberOfLines={4}>
                    {note.content}
                </Text>

                <View style={styles.footer}>
                    <Edit3 size={14} color={colors.gray} />
                    <Text style={styles.date}>
                        {format(parseISO(note.updatedAt), 'MMM d, h:mm a')}
                    </Text>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    title: {
        fontSize: fontSizes.lg,
        fontWeight: '900',
        color: colors.black,
        flex: 1,
        marginRight: spacing.sm,
    },
    deleteButton: {
        padding: spacing.xs,
    },
    content: {
        fontSize: fontSizes.md,
        color: colors.ink,
        lineHeight: 24,
        minHeight: 60,
        fontWeight: '400',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.md,
        gap: spacing.xs,
    },
    date: {
        fontSize: fontSizes.xs,
        color: colors.gray,
        fontWeight: '600',
    },
});
