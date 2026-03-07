import React, { useRef } from 'react';
import {
    Pressable,
    Animated,
    StyleSheet,
    type PressableProps,
    type ViewStyle,
} from 'react-native';
import { colors, borderRadius, spacing } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import type { CardColor } from '@/types';

interface BouncyButtonProps extends PressableProps {
    children: React.ReactNode;
    color?: CardColor;
    variant?: 'filled' | 'ghost' | 'fab';
    size?: 'small' | 'medium' | 'large';
    style?: ViewStyle;
}

const colorMap: Record<CardColor, string> = {
    lilac: colors.lilac,
    mint: colors.mint,
    bubblegum: colors.bubblegum,
    peach: colors.peach,
    sky: colors.sky,
};

export const BouncyButton: React.FC<BouncyButtonProps> = ({
    children,
    color = 'mint',
    variant = 'filled',
    size = 'medium',
    style,
    onPressIn,
    onPressOut,
    ...props
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = (e: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Animated.spring(scaleAnim, {
            toValue: 0.93,
            useNativeDriver: true,
            friction: 5,
            tension: 200,
        }).start();
        onPressIn?.(e);
    };

    const handlePressOut = (e: any) => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 3,
            tension: 400,
        }).start();
        onPressOut?.(e);
    };

    const sizeStyles: ViewStyle = size === 'small'
        ? { paddingVertical: spacing.xs, paddingHorizontal: spacing.md }
        : size === 'large'
            ? { paddingVertical: spacing.md, paddingHorizontal: spacing.xl }
            : { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg };

    const fabStyles: ViewStyle = variant === 'fab'
        ? { width: 56, height: 56, borderRadius: 28, paddingVertical: 0, paddingHorizontal: 0 }
        : {};

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...props}
        >
            <Animated.View
                style={[
                    styles.wrapper,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            >
                {variant !== 'ghost' && <Animated.View style={styles.shadow} />}
                <Animated.View
                    style={[
                        styles.button,
                        variant === 'ghost'
                            ? styles.ghost
                            : { backgroundColor: colorMap[color] },
                        sizeStyles,
                        fabStyles,
                        style,
                    ]}
                >
                    {children}
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    shadow: {
        position: 'absolute',
        top: 3,
        left: 3,
        right: -3,
        bottom: -3,
        backgroundColor: colors.black,
        borderRadius: borderRadius.md,
    },
    button: {
        borderRadius: borderRadius.md,
        borderWidth: 3,
        borderColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
});
