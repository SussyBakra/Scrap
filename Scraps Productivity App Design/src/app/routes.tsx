import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Notes } from "./pages/Notes";
import { TimeTracker } from "./pages/TimeTracker";
import { Timetable } from "./pages/Timetable";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "notes", Component: Notes },
      { path: "tracker", Component: TimeTracker },
      { path: "timetable", Component: Timetable },
    ],
  },
]);
