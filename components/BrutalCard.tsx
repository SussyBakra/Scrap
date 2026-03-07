import React from 'react';
import { View, StyleSheet, Pressable, type ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '@/constants/theme';
import type { CardColor } from '@/types';

interface BrutalCardProps {
    children: React.ReactNode;
    accentColor?: CardColor;
    style?: ViewStyle;
    onPress?: () => void;
}

const accentMap: Record<CardColor, string> = {
    lilac: colors.lilac,
    mint: colors.mint,
    bubblegum: colors.bubblegum,
    peach: colors.peach,
    sky: colors.sky,
};

export const BrutalCard: React.FC<BrutalCardProps> = ({
    children,
    accentColor,
    style,
    onPress,
}) => {
    const card = (
        <View style={[styles.wrapper, style]}>
            <View style={styles.shadow} />
            <View style={styles.card}>
                {accentColor && (
                    <View style={[styles.accent, { backgroundColor: accentMap[accentColor] }]} />
                )}
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </View>
    );

    if (onPress) {
        return (
            <Pressable onPress={onPress}>
                {card}
            </Pressable>
        );
    }

    return card;
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        marginBottom: spacing.md,
    },
    shadow: {
        position: 'absolute',
        top: 4,
        left: 4,
        right: -4,
        bottom: -4,
        backgroundColor: colors.black,
        borderRadius: borderRadius.lg,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        borderWidth: 3,
        borderColor: colors.black,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    accent: {
        width: 6,
    },
    content: {
        flex: 1,
        padding: spacing.md,
    },
});
