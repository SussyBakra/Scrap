import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Modal } from "react-native";
import { Clock, Play, Square, Trash2, X } from "lucide-react-native";
import { useTrackerStore } from "../store/useTrackerStore";
import { BrutalCard } from "../components/ui/BrutalCard";

const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function Tracker() {
  const { entries, addEntry, deleteEntry, getTotalSeconds } = useTrackerStore();
  
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  const handleStop = () => {
    setIsRunning(false);
    setModalVisible(true);
  };

  const handleSaveEntry = () => {
    if (seconds > 0) {
      addEntry(taskName || "Untitled Session", seconds);
    }
    setSeconds(0);
    setTaskName("");
    setModalVisible(false);
  };

  const handleDiscard = () => {
    setSeconds(0);
    setTaskName("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Clock color="#fff" size={32} strokeWidth={2.5} style={{ marginRight: 8 }} />
            <Text style={styles.title}>PUNCH CARD</Text>
          </View>
        </View>

        {/* Total Time Logged */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>TOTAL LOGGED TIME</Text>
          <Text style={styles.totalTime}>{formatTime(getTotalSeconds())}</Text>
        </View>

        {/* Current Timer */}
        <BrutalCard color="#ffffff" rotation={0} style={styles.timerCard}>
          <Text style={styles.timerDisplay}>{formatTime(seconds)}</Text>
          <View style={styles.timerControls}>
            {!isRunning ? (
              <Pressable 
                style={({ pressed }) => [
                  styles.playBtn,
                  pressed && { transform: [{ translateY: 2 }] }
                ]}
                onPress={() => setIsRunning(true)}
              >
                <Play color="#fff" size={32} fill="#fff" />
                <Text style={styles.btnText}>START</Text>
              </Pressable>
            ) : (
              <Pressable 
                style={({ pressed }) => [
                  styles.stopBtn,
                  pressed && { transform: [{ translateY: 2 }] }
                ]}
                onPress={handleStop}
              >
                <Square color="#fff" size={32} fill="#fff" />
                <Text style={styles.btnText}>STOP</Text>
              </Pressable>
            )}
          </View>
        </BrutalCard>

        {/* Recent Entries */}
        <Text style={styles.sectionTitle}>RECENT SESSIONS</Text>
        <View style={styles.entriesGrid}>
          {entries.length === 0 ? (
            <Text style={styles.emptyText}>No sessions logged yet.</Text>
          ) : (
            entries.map((entry, index) => {
              const rotation = index % 2 === 0 ? 1 : -1;
              return (
                <BrutalCard key={entry.id} color="#42a5f5" rotation={rotation} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTask}>{entry.taskName}</Text>
                    <Pressable onPress={() => deleteEntry(entry.id)}>
                      <Trash2 color="#000" size={24} />
                    </Pressable>
                  </View>
                  <View style={styles.entryFooter}>
                    <Text style={styles.entryDate}>{new Date(entry.date).toLocaleDateString()}</Text>
                    <Text style={styles.entryDuration}>{formatTime(entry.durationSeconds)}</Text>
                  </View>
                </BrutalCard>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Save Session Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>LOG SESSION</Text>
              <Pressable onPress={handleDiscard}>
                <X color="#000" size={32} />
              </Pressable>
            </View>
            
            <Text style={styles.modalTimeDisplay}>{formatTime(seconds)}</Text>

            <TextInput
              style={styles.inputTitle}
              placeholder="What were you working on?"
              placeholderTextColor="#666"
              value={taskName}
              onChangeText={setTaskName}
            />
            
            <Pressable 
              style={({ pressed }) => [
                styles.saveBtn,
                pressed && { transform: [{ translateY: 2 }] }
              ]} 
              onPress={handleSaveEntry}
            >
              <Text style={styles.saveBtnText}>SAVE SESSION</Text>
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
    marginBottom: 16,
  },
  titleContainer: {
    backgroundColor: "#42a5f5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: "flex-start",
    transform: [{ rotate: "2deg" }],
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
    color: "#000",
    textTransform: "uppercase",
  },
  totalBox: {
    backgroundColor: "#000",
    padding: 16,
    borderWidth: 4,
    borderColor: "#000",
    transform: [{ rotate: "-1deg" }],
    alignItems: "center",
    marginBottom: 8,
  },
  totalLabel: {
    color: "#fff",
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  totalTime: {
    color: "#ffeb3b",
    fontSize: 36,
    fontWeight: "900",
    fontFamily: "monospace",
  },
  timerCard: {
    alignItems: "center",
    paddingVertical: 32,
  },
  timerDisplay: {
    fontSize: 64,
    fontWeight: "900",
    fontFamily: "monospace",
    color: "#000",
    marginBottom: 24,
  },
  timerControls: {
    flexDirection: "row",
    gap: 16,
  },
  playBtn: {
    backgroundColor: "#4caf50",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 4,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    gap: 8,
  },
  stopBtn: {
    backgroundColor: "#ef5350",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 4,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    gap: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    marginTop: 16,
    textTransform: "uppercase",
  },
  entriesGrid: {
    gap: 16,
  },
  emptyText: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  entryCard: {
    padding: 16,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  entryTask: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    flex: 1,
    marginRight: 8,
  },
  entryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  entryDate: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#000",
  },
  entryDuration: {
    fontFamily: "monospace",
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "#000",
    transform: [{ rotate: "3deg" }],
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
    transform: [{ rotate: "1deg" }],
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
  },
  modalTimeDisplay: {
    fontSize: 48,
    fontWeight: "900",
    fontFamily: "monospace",
    color: "#42a5f5",
    textAlign: "center",
    marginBottom: 24,
  },
  inputTitle: {
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#f4f4f0",
    padding: 16,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  saveBtn: {
    backgroundColor: "#ffeb3b",
    borderWidth: 3,
    borderColor: "#000",
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  saveBtnText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
  },
});
