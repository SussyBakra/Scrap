# DraftPad

A dual-purpose Android app that merges task management with quick note-taking. Handle everything from daily to-do lists to monthly goals, with native push notifications, local data persistence, and a dedicated space for fast notes on the go.

---

## Features

- **Tasks** — Create tasks with title, description, priority (Low/Med/High), due date & time, and color
- **Daily / Weekly / Monthly views** — Browse tasks across different time ranges with a swipeable calendar strip
- **Recurring tasks** — Daily, weekly, or monthly repeat schedules
- **Push notifications** — Native reminders fire at the task's due time
- **Quick Notes** — Jot down thoughts instantly with color-coded note cards
- **Haptic feedback** — Tactile response on all interactions
- **Persistent storage** — All data saved locally via AsyncStorage (no account needed)
- **Neo-Brutalist design** — Bold borders, pastel accents, bouncy press animations

---

## Requirements

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Expo CLI** or **EAS CLI** for building
- **Expo Go** app (for development preview on device)

---

## Running Locally

```bash
npm install
npm start          # Opens Metro bundler — scan QR with Expo Go
```

---

## Building an APK (Android)

```bash
# Install EAS CLI (one time)
npm install -g eas-cli
eas login          # Sign in with your free Expo account

# Build a directly-installable APK
eas build --platform android --profile preview
```

The build link will appear in your terminal — download and install it directly on any Android device, no Play Store required.

---

## Tech Stack

| | |
|---|---|
| Framework | React Native + Expo (~54) |
| Navigation | Expo Router (file-based) |
| Storage | AsyncStorage |
| Notifications | expo-notifications |
| Icons | lucide-react-native |
| Animations | React Native Animated API |
