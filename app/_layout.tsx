import { Tabs } from "expo-router";
import { Home, BookOpen, Clock, CalendarDays } from "lucide-react-native";
import { View, StyleSheet, Platform } from "react-native";

export default function Layout() {
  return (
    <View style={styles.container}>
      {/* Background styling to match the web design */}
      <View style={styles.bgGrid} pointerEvents="none" />
      
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#4b5563",
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "HOME",
            tabBarIcon: ({ color, size }) => (
              <Home color={color} size={28} strokeWidth={2.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="notes"
          options={{
            title: "NOTES",
            tabBarIcon: ({ color, size }) => (
              <BookOpen color={color} size={28} strokeWidth={2.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="tracker"
          options={{
            title: "TRACKER",
            tabBarIcon: ({ color, size }) => (
              <Clock color={color} size={28} strokeWidth={2.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="timetable"
          options={{
            title: "SCHEDULE",
            tabBarIcon: ({ color, size }) => (
              <CalendarDays color={color} size={28} strokeWidth={2.5} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f0",
  },
  bgGrid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
    // Add grid pattern visual here if needed
  },
  tabBar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 32 : 16,
    left: 16,
    right: 16,
    backgroundColor: "#f4f4f0",
    borderWidth: 4,
    borderColor: "#000000",
    height: 70,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 10,
    transform: [{ rotate: "1deg" }],
    // Hard brutalist shadow
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  tabBarLabel: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 4,
  },
});
