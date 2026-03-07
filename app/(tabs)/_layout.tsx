import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { ClipboardList, StickyNote } from 'lucide-react-native';
import { colors, fontSizes } from '@/constants/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: colors.black,
                tabBarInactiveTintColor: colors.gray,
                tabBarLabelStyle: styles.tabLabel,
            }}
        >
            <Tabs.Screen
                name="tasks"
                options={{
                    title: 'Tasks',
                    tabBarIcon: ({ color, size }) => (
                        <ClipboardList size={size} color={color} strokeWidth={2.5} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notes"
                options={{
                    title: 'Notes',
                    tabBarIcon: ({ color, size }) => (
                        <StickyNote size={size} color={color} strokeWidth={2.5} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.cream,
        borderTopWidth: 3,
        borderTopColor: colors.black,
        height: Platform.OS === 'ios' ? 88 : 64,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    },
    tabLabel: {
        fontSize: fontSizes.xs,
        fontWeight: '800' as const,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
