import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskProvider } from '@/providers/TaskProvider';
import { NoteProvider } from '@/providers/NoteProvider';

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <TaskProvider>
                    <NoteProvider>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="(tabs)" />
                            <Stack.Screen
                                name="new-task"
                                options={{
                                    presentation: 'modal',
                                    animation: 'slide_from_bottom',
                                }}
                            />
                            <Stack.Screen
                                name="new-note"
                                options={{
                                    presentation: 'modal',
                                    animation: 'slide_from_bottom',
                                }}
                            />
                        </Stack>
                    </NoteProvider>
                </TaskProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
