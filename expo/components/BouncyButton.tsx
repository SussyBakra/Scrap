import React, { useRef } from 'react';
import {
    Pressable,
    Animated,
    StyleSheet,
    type PressableProps,
    type ViewStyle,
    type TextStyle,
} from 'react-native';
import { colors, shadows, borders, borderRadius, spacing } from '@/constants/theme';
import * as Haptics from 'expo-haptics';

interface BouncyButtonProps extends PressableProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    color?: 'lilac' | 'mint' | 'bubblegum' | 'peach' | 'sky';
    size?: 'small' | 'medium' | 'large';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const colorMap = {
    lilac: colors.lilac,
    mint: colors.mint,
    bubblegum: colors.bubblegum,
    peach: colors.peach,
    sky: colors.sky,
};

export const BouncyButton: React.FC<BouncyButtonProps> = ({
    children,
    variant = 'primary',
    color = 'lilac',
    size = 'medium',
    style,
    onPressIn,
    onPressOut,
    ...props
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const shadowAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = (e: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.92,
                useNativeDriver: true,
                friction: 5,
                tension: 200,
            }),
            Animated.timing(shadowAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        onPressIn?.(e);
    };

    const handlePressOut = (e: any) => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 3,
                tension: 400,
            }),
            Animated.spring(shadowAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 3,
                tension: 400,
            }),
        ]).start();

        onPressOut?.(e);
    };

    const getBackgroundColor = () => {
        if (variant === 'ghost') return 'transparent';
        return colorMap[color];
    };

    const getSizeStyles = (): ViewStyle => {
        switch (size) {
            case 'small':
                return { paddingVertical: spacing.xs, paddingHorizontal: spacing.md };
            case 'large':
                return { paddingVertical: spacing.md, paddingHorizontal: spacing.xl };
            default:
                return { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg };
        }
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...props}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        backgroundColor: getBackgroundColor(),
                        transform: [{ scale: scaleAnim }],
                    },
                    getSizeStyles(),
                    variant !== 'ghost' && styles.withShadow,
                    style,
                ]}
            >
                <Animated.View
                    style={[
                        styles.shadow,
                        {
                            opacity: shadowAnim,
                            transform: [{
                                translateX: shadowAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 4],
                                }),
                            }, {
                                translateY: shadowAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 4],
                                }),
                            }],
                        },
                    ]}
                />
                <Animated.View style={styles.content}>
                    {children}
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.medium,
        borderWidth: 3,
        borderColor: colors.black,
        position: 'relative',
    },
    withShadow: {
        marginBottom: 4,
        marginRight: 4,
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.black,
        borderRadius: borderRadius.medium,
        borderWidth: 3,
        borderColor: colors.black,
        zIndex: -1,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
