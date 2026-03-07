import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, type ViewStyle } from 'react-native';
import { colors } from '@/constants/theme';

interface MarkerScribbleProps {
    isVisible: boolean;
    onComplete?: () => void;
    style?: ViewStyle;
    color?: string;
}

export const MarkerScribble: React.FC<MarkerScribbleProps> = ({
    isVisible,
    onComplete,
    style,
    color = colors.black,
}) => {
    const progress = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            progress.setValue(0);
            opacity.setValue(1);

            Animated.timing(progress, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    onComplete?.();
                }, 200);
            });
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <View style={[styles.container, style]} pointerEvents="none">
            <Animated.View
                style={[
                    styles.scribble,
                    {
                        backgroundColor: color,
                        opacity: opacity,
                        transform: [
                            {
                                scaleX: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                }),
                            },
                        ],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.scribbleWiggle,
                    {
                        backgroundColor: color,
                        opacity: opacity,
                        transform: [
                            {
                                scaleX: progress.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0, 0.6, 1.1],
                                }),
                            },
                            {
                                translateY: progress.interpolate({
                                    inputRange: [0, 0.3, 0.6, 1],
                                    outputRange: [0, -3, 2, 0],
                                }),
                            },
                        ],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: 4,
        justifyContent: 'center',
    },
    scribble: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 4,
        borderRadius: 2,
        transformOrigin: 'left',
    },
    scribbleWiggle: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 3,
        borderRadius: 1.5,
        transformOrigin: 'left',
    },
});
