import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskProvider } from '@/providers/TaskProvider';
import { NoteProvider } from '@/providers/NoteProvider';
import { colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function DraftPadNavigator() {
    return (
        <Stack
            screenOptions={{
                headerBackTitle: 'Back',
                headerStyle: { backgroundColor: colors.cream },
                headerTintColor: colors.black,
                headerTitleStyle: { fontWeight: '900' as const, fontSize: 20 },
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="tasks" options={{ headerShown: false }} />
            <Stack.Screen name="notes" options={{ headerShown: false }} />
            <Stack.Screen name="new-task" options={{ presentation: 'modal', title: 'New Task' }} />
            <Stack.Screen name="new-note" options={{ presentation: 'modal', title: 'New Note' }} />
        </Stack>
    );
}

export default function DraftPadRootLayout() {
    React.useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <TaskProvider>
                <NoteProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <DraftPadNavigator />
                    </GestureHandlerRootView>
                </NoteProvider>
            </TaskProvider>
        </QueryClientProvider>
    );
}
