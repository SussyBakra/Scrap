import React from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";

interface BrutalCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  color?: string;
  rotation?: number;
  onPress?: () => void;
}

export function BrutalCard({ children, style, color = "#ff8c42", rotation = 0, onPress }: BrutalCardProps) {
  const cardContent = (
    <View
      style={[
        styles.card,
        { backgroundColor: color, transform: [{ rotate: `${rotation}deg` }] },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressableBlock,
          pressed && { transform: [{ translateY: 2 }, { rotate: `${rotation}deg` }] },
        ]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  pressableBlock: {
    marginVertical: 8,
  },
  card: {
    padding: 24,
    borderWidth: 4,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
  },
});
