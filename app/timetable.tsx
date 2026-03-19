import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Modal } from "react-native";
import { CalendarDays, Plus, X, Trash2, MapPin, Clock } from "lucide-react-native";
import { useTimetableStore } from "../store/useTimetableStore";
import { BrutalCard } from "../components/ui/BrutalCard";

export default function Timetable() {
  const { events, addEvent, deleteEvent } = useTimetableStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [location, setLocation] = useState("");

  const handleAddEvent = () => {
    if (title.trim()) {
      addEvent(title, timeRange || "TBD", location || "TBD");
    }
    setTitle("");
    setTimeRange("");
    setLocation("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <CalendarDays color="#fff" size={32} strokeWidth={2.5} style={{ marginRight: 8 }} />
            <Text style={styles.title}>SCHEDULE</Text>
          </View>
        </View>

        {/* Date Box */}
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}</Text>
        </View>

        {/* Events List */}
        <View style={styles.eventsList}>
          {events.length === 0 ? (
            <Text style={styles.emptyText}>No events scheduled.</Text>
          ) : (
            events.map((event, index) => {
              const rotation = index % 2 === 0 ? 1 : -1;
              const bgColor = index % 2 === 0 ? "#ef5350" : "#ff8c42";
              return (
                <BrutalCard key={event.id} color={bgColor} rotation={rotation} style={styles.eventCard}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Pressable onPress={() => deleteEvent(event.id)}>
                      <Trash2 color="#000" size={24} />
                    </Pressable>
                  </View>
                  <View style={styles.eventDetails}>
                    <View style={styles.detailRow}>
                      <Clock color="#000" size={16} />
                      <Text style={styles.detailText}>{event.timeRange}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MapPin color="#000" size={16} />
                      <Text style={styles.detailText}>{event.location}</Text>
                    </View>
                  </View>
                </BrutalCard>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Add Event Button */}
      <Pressable 
        style={({ pressed }) => [
          styles.fab,
          pressed && { transform: [{ scale: 0.95 }, { rotate: "6deg" }] }
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Plus color="#000" size={36} strokeWidth={3} />
      </Pressable>

      {/* Add Event Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>NEW EVENT</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <X color="#000" size={32} />
              </Pressable>
            </View>
            
            <TextInput
              style={styles.inputTitle}
              placeholder="Event Title..."
              placeholderTextColor="#666"
              value={title}
              onChangeText={setTitle}
            />
            
            <TextInput
              style={styles.inputSmall}
              placeholder="Time Range (e.g. 10:00 AM - 11:30 AM)"
              placeholderTextColor="#666"
              value={timeRange}
              onChangeText={setTimeRange}
            />

            <TextInput
              style={styles.inputSmall}
              placeholder="Location..."
              placeholderTextColor="#666"
              value={location}
              onChangeText={setLocation}
            />
            
            <Pressable 
              style={({ pressed }) => [
                styles.saveBtn,
                pressed && { transform: [{ translateY: 2 }] }
              ]} 
              onPress={handleAddEvent}
            >
              <Text style={styles.saveBtnText}>SAVE EVENT</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    marginBottom: 8,
  },
  titleContainer: {
    backgroundColor: "#ef5350",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: "flex-start",
    transform: [{ rotate: "-2deg" }],
    borderWidth: 4,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textTransform: "uppercase",
  },
  dateBox: {
    backgroundColor: "#000",
    padding: 12,
    borderWidth: 4,
    borderColor: "#000",
    transform: [{ rotate: "1deg" }],
    alignItems: "center",
    marginBottom: 16,
  },
  dateText: {
    color: "#fff",
    fontFamily: "monospace",
    fontSize: 16,
    fontWeight: "bold",
  },
  eventsList: {
    gap: 16,
  },
  emptyText: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    transform: [{ rotate: "-2deg" }],
  },
  eventCard: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    flex: 1,
    marginRight: 8,
  },
  eventDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 8,
    borderWidth: 2,
    borderColor: "#000",
  },
  detailText: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  fab: {
    position: "absolute",
    bottom: 120,
    right: 24,
    backgroundColor: "#ef5350",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#000",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
    transform: [{ rotate: "-1deg" }],
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
  },
  inputTitle: {
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#f4f4f0",
    padding: 16,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputSmall: {
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#f4f4f0",
    padding: 12,
    fontSize: 16,
    fontFamily: "monospace",
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: "#ff8c42",
    borderWidth: 3,
    borderColor: "#000",
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: 8,
  },
  saveBtnText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
  },
});
