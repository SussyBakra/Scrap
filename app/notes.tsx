import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Modal } from "react-native";
import { StickyNote, Plus, X, Trash2 } from "lucide-react-native";
import { useNotesStore } from "../store/useNotesStore";
import { BrutalCard } from "../components/ui/BrutalCard";

export default function Notes() {
  const { notes, addNote, deleteNote } = useNotesStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleAddNote = () => {
    if (noteTitle.trim() || noteContent.trim()) {
      addNote(noteTitle || "Untitled", noteContent);
    }
    setNoteTitle("");
    setNoteContent("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <StickyNote color="#fff" size={32} strokeWidth={2.5} style={{ marginRight: 8 }} />
            <Text style={styles.title}>SCRAPBOOK</Text>
          </View>
        </View>

        {/* Note Grid */}
        <View style={styles.notesGrid}>
          {notes.length === 0 ? (
            <Text style={styles.emptyText}>No notes yet. Add one!</Text>
          ) : (
            notes.map((note, index) => {
              const rotation = index % 2 === 0 ? 2 : -2;
              const bgColor = index % 3 === 0 ? "#ffeb3b" : index % 3 === 1 ? "#ff8c42" : "#ffffff";
              return (
                <BrutalCard key={note.id} color={bgColor} rotation={rotation} style={styles.noteCard}>
                  <View style={styles.noteHeader}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    <Pressable onPress={() => deleteNote(note.id)}>
                      <Trash2 color="#ef5350" size={24} />
                    </Pressable>
                  </View>
                  <Text style={styles.noteDate}>
                    {new Date(note.createdAt).toLocaleDateString()}
                  </Text>
                  <Text style={styles.noteContent}>{note.content}</Text>
                </BrutalCard>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Add Note Button */}
      <Pressable 
        style={({ pressed }) => [
          styles.fab,
          pressed && { transform: [{ scale: 0.95 }, { rotate: "6deg" }] }
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Plus color="#fff" size={36} strokeWidth={3} />
      </Pressable>

      {/* Add Note Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>NEW SCRAP</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <X color="#000" size={32} />
              </Pressable>
            </View>
            
            <TextInput
              style={styles.inputTitle}
              placeholder="Title..."
              placeholderTextColor="#666"
              value={noteTitle}
              onChangeText={setNoteTitle}
            />
            
            <TextInput
              style={styles.inputContent}
              placeholder="Write your note here..."
              placeholderTextColor="#666"
              multiline
              textAlignVertical="top"
              value={noteContent}
              onChangeText={setNoteContent}
            />
            
            <Pressable 
              style={({ pressed }) => [
                styles.saveBtn,
                pressed && { transform: [{ translateY: 2 }] }
              ]} 
              onPress={handleAddNote}
            >
              <Text style={styles.saveBtnText}>SAVE SCRAP</Text>
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
    marginBottom: 24,
  },
  titleContainer: {
    backgroundColor: "#ff8c42",
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
    fontSize: 32,
    fontWeight: "900",
    color: "#000",
    textTransform: "uppercase",
  },
  notesGrid: {
    gap: 24,
  },
  emptyText: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 40,
    transform: [{ rotate: "-2deg" }],
  },
  noteCard: {
    padding: 16,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    flex: 1,
    marginRight: 8,
  },
  noteDate: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  noteContent: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
  },
  fab: {
    position: "absolute",
    bottom: 120,
    right: 24,
    backgroundColor: "#ff8c42",
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
    transform: [{ rotate: "-3deg" }],
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
    transform: [{ rotate: "1deg" }],
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
  inputContent: {
    borderWidth: 3,
    borderColor: "#000",
    backgroundColor: "#f4f4f0",
    padding: 16,
    fontSize: 18,
    height: 150,
    marginBottom: 24,
  },
  saveBtn: {
    backgroundColor: "#42a5f5",
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
    color: "#fff",
  },
});
