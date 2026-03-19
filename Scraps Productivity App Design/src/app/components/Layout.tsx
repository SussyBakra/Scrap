import { Outlet, NavLink } from "react-router";
import { BookOpen, Clock, CalendarDays, Home } from "lucide-react";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f4f4f0] font-brutal text-black selection:bg-yellow-400 selection:text-black">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-grid-pattern"></div>
      
      {/* Main Content Area */}
      <main className="relative z-10 pb-28 min-h-screen max-w-2xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      {/* Rough Draftpad Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 md:pb-8">
        <div className="max-w-md mx-auto bg-black p-2 rounded-none shadow-brutal border-4 border-black rotate-1">
          <ul className="flex justify-between items-center bg-[#f4f4f0] p-1 border-2 border-black">
            <NavItem to="/" icon={<Home size={28} strokeWidth={2.5} />} label="HOME" />
            <NavItem to="/notes" icon={<BookOpen size={28} strokeWidth={2.5} />} label="NOTES" />
            <NavItem to="/tracker" icon={<Clock size={28} strokeWidth={2.5} />} label="TRACKER" />
            <NavItem to="/timetable" icon={<CalendarDays size={28} strokeWidth={2.5} />} label="SCHEDULE" />
          </ul>
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-full p-2 border-2 transition-all duration-200 ${
          isActive
            ? "bg-[#ffeb3b] text-black border-black shadow-brutal-sm -translate-y-1"
            : "bg-transparent text-gray-800 border-transparent hover:bg-gray-200"
        }`
      }
    >
      {icon}
      <span className="text-xs font-bold mt-1 tracking-wider">{label}</span>
    </NavLink>
  );
}
