import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { StickyNote, Clock, CalendarDays, Plus, ArrowRight } from "lucide-react-native";
import { BrutalCard } from "../components/ui/BrutalCard";

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SCRAPS.</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>YOUR DIGITAL DRAFTPAD</Text>
          </View>
        </View>

        {/* Widgets */}
        <BrutalCard 
          color="#ff8c42" 
          rotation={-1} 
          onPress={() => router.push("/notes")}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { transform: [{ rotate: "3deg" }] }]}>
              <StickyNote color="#000" size={32} strokeWidth={2.5} />
            </View>
            <Text style={styles.cardTitle}>Scrapbook</Text>
            <View style={styles.arrowBox}>
              <ArrowRight color="#000" size={20} />
            </View>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>View Notes</Text>
          </View>
        </BrutalCard>

        <BrutalCard 
          color="#42a5f5" 
          rotation={1} 
          onPress={() => router.push("/tracker")}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { transform: [{ rotate: "-3deg" }] }]}>
              <Clock color="#000" size={32} strokeWidth={2.5} />
            </View>
            <Text style={styles.cardTitle}>Punch Card</Text>
            <View style={styles.arrowBox}>
              <ArrowRight color="#000" size={20} />
            </View>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Track Time</Text>
          </View>
        </BrutalCard>

        <BrutalCard 
          color="#ef5350" 
          rotation={-2} 
          onPress={() => router.push("/timetable")}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { transform: [{ rotate: "6deg" }] }]}>
              <CalendarDays color="#000" size={32} strokeWidth={2.5} />
            </View>
            <Text style={styles.cardTitle}>Timetable</Text>
            <View style={styles.arrowBox}>
              <ArrowRight color="#000" size={20} />
            </View>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>View Schedule</Text>
          </View>
        </BrutalCard>
      </ScrollView>

      {/* Floating Add Button */}
      <Pressable 
        style={({ pressed }) => [
          styles.fab,
          pressed && { transform: [{ scale: 0.95 }, { rotate: "6deg" }] }
        ]}
        onPress={() => {
          // Open new note or task modal
          router.push("/notes");
        }}
      >
        <Plus color="#000" size={36} strokeWidth={3} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f0",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 64,
    paddingBottom: 120,
    gap: 20,
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
    transform: [{ rotate: "-2deg" }],
    borderWidth: 2,
    borderColor: "#000",
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#fff",
    textTransform: "uppercase",
  },
  subtitleContainer: {
    backgroundColor: "#ffeb3b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    transform: [{ rotate: "1deg" }],
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  subtitle: {
    fontFamily: "monospace",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  iconBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#000",
    flex: 1,
  },
  arrowBox: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "flex-start",
  },
  tagText: {
    fontFamily: "monospace",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  fab: {
    position: "absolute",
    bottom: 120,
    right: 24,
    backgroundColor: "#ffeb3b",
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    transform: [{ rotate: "3deg" }],
    elevation: 10,
  },
});
