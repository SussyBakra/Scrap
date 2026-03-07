import React, { useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Animated,
    type ViewStyle,
    type PressableProps
} from 'react-native';
import { colors, shadows, borders, spacing, borderRadius } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import type { CardColor } from '@/types';

interface SpiralBoundCardProps extends PressableProps {
    children: React.ReactNode;
    color?: CardColor;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
    onPressIn?: () => void;
    onPressOut?: () => void;
    animatePress?: boolean;
}

const colorMap: Record<CardColor, string> = {
    lilac: colors.lilac,
    mint: colors.mint,
    bubblegum: colors.bubblegum,
    peach: colors.peach,
    sky: colors.sky,
};

export const SpiralBoundCard: React.FC<SpiralBoundCardProps> = ({
    children,
    color = 'lilac',
    style,
    contentStyle,
    onPressIn,
    onPressOut,
    onPress,
    animatePress = true,
    ...props
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const shadowAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (animatePress) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 0.98,
                    useNativeDriver: true,
                    friction: 8,
                    tension: 100,
                }),
                Animated.timing(shadowAnim, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        onPressIn?.();
    };

    const handlePressOut = () => {
        if (animatePress) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    friction: 5,
                    tension: 100,
                }),
                Animated.timing(shadowAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        onPressOut?.();
    };

    const renderSpiralRings = () => {
        const rings = [];
        const ringCount = 5;
        const spacingBetween = 56;

        for (let i = 0; i < ringCount; i++) {
            rings.push(
                <View key={i} style={styles.ringContainer}>
                    <View style={styles.ringHole} />
                    <View style={styles.ringWire}>
                        <View style={styles.ringWireInner} />
                    </View>
                </View>
            );
        }
        return (
            <View style={[styles.spiralContainer, { justifyContent: 'space-evenly' }]}>
                {rings}
            </View>
        );
    };

    const content = (
        <Animated.View
            style={[
                styles.card,
                {
                    backgroundColor: colors.paper,
                    transform: [{ scale: scaleAnim }],
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    styles.shadowLayer,
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
            <View style={styles.cardInner}>
                {renderSpiralRings()}
                <View style={[styles.content, { backgroundColor: colorMap[color] }, contentStyle]}>
                    {children}
                </View>
            </View>
        </Animated.View>
    );

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                {...props}
            >
                {content}
            </Pressable>
        );
    }

    return content;
};

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        marginBottom: spacing.md,
    },
    shadowLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.black,
        borderRadius: borderRadius.medium,
        borderWidth: 3,
        borderColor: colors.black,
    },
    cardInner: {
        backgroundColor: colors.paper,
        borderRadius: borderRadius.medium,
        borderWidth: 3,
        borderColor: colors.black,
        overflow: 'hidden',
        position: 'relative',
    },
    spiralContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm,
        paddingBottom: spacing.xs,
        backgroundColor: colors.paper,
        height: 32,
        alignItems: 'center',
    },
    ringContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ringHole: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.black,
        position: 'absolute',
        top: -2,
    },
    ringWire: {
        width: 14,
        height: 20,
        borderRadius: 7,
        borderWidth: 2.5,
        borderColor: colors.gray,
        backgroundColor: 'transparent',
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ringWireInner: {
        width: 6,
        height: 14,
        borderRadius: 3,
        backgroundColor: colors.lightGray,
    },
    content: {
        padding: spacing.md,
        margin: spacing.xs,
        marginTop: 0,
        borderRadius: borderRadius.small,
        borderWidth: 2,
        borderColor: colors.black,
    },
});
