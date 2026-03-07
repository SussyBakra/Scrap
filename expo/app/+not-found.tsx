import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSizes } from '@/constants/theme';
import { BouncyButton } from '@/components/BouncyButton';

export default function DraftPadNotFound() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View style={styles.container}>
                <Text style={styles.emoji}>📝</Text>
                <Text style={styles.title}>Page not found</Text>
                <Text style={styles.subtitle}>This page seems to have been torn out of the notebook!</Text>

                <Link href="/tasks" asChild>
                    <BouncyButton color="mint" style={styles.button}>
                        <Text style={styles.buttonText}>Back to Tasks</Text>
                    </BouncyButton>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
        backgroundColor: colors.cream,
    },
    emoji: {
        fontSize: 64,
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: fontSizes.xxl,
        fontWeight: '900',
        color: colors.black,
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: colors.gray,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    button: {
        minWidth: 200,
    },
    buttonText: {
        fontSize: fontSizes.md,
        fontWeight: '800',
        color: colors.black,
    },
});
