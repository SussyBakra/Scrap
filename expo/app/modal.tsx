import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, fontSizes } from '@/constants/theme';
import { BouncyButton } from '@/components/BouncyButton';
import { SpiralBoundCard } from '@/components/SpiralBoundCard';

export default function DraftPadModal() {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => router.back()}
        >
            <Pressable style={styles.overlay} onPress={() => router.back()}>
                <View style={styles.container}>
                    <SpiralBoundCard color="lilac" style={styles.card}>
                        <View style={styles.content}>
                            <Text style={styles.emoji}>✨</Text>
                            <Text style={styles.title}>Coming Soon!</Text>
                            <Text style={styles.description}>
                                This feature is still being written in our notebook. Check back soon!
                            </Text>

                            <BouncyButton
                                color="bubblegum"
                                onPress={() => router.back()}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>Got it!</Text>
                            </BouncyButton>
                        </View>
                    </SpiralBoundCard>
                </View>
            </Pressable>

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    container: {
        width: '100%',
        maxWidth: 340,
    },
    card: {
        marginBottom: 0,
    },
    content: {
        padding: spacing.md,
        alignItems: 'center',
    },
    emoji: {
        fontSize: 48,
        marginBottom: spacing.md,
    },
    title: {
        fontSize: fontSizes.xl,
        fontWeight: '900',
        color: colors.black,
        marginBottom: spacing.sm,
    },
    description: {
        textAlign: 'center',
        marginBottom: spacing.lg,
        color: colors.ink,
        fontSize: fontSizes.md,
        lineHeight: 22,
    },
    closeButton: {
        minWidth: 150,
    },
    closeButtonText: {
        color: colors.black,
        fontWeight: '800',
        fontSize: fontSizes.md,
    },
});
