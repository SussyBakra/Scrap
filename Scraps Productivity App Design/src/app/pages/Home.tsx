import { Link } from "react-router";
import { Plus, StickyNote, Clock, CalendarDays, ArrowRight } from "lucide-react";

export function Home() {
  return (
    <div className="flex flex-col gap-8 pb-32 max-w-lg mx-auto w-full font-brutal pt-8 md:pt-16">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter -rotate-2 bg-black text-white inline-block px-4 py-2 shadow-brutal-sm border-2 border-black">Scraps.</h1>
          <p className="font-typewriter text-xl text-gray-800 mt-2 bg-yellow-300 inline-block px-2 transform rotate-1 border border-black shadow-[2px_2px_0px_#000]">YOUR DIGITAL DRAFTPAD</p>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid gap-6">
        
        {/* Notes Widget */}
        <Link 
          to="/notes" 
          className="group relative block bg-[#ff8c42] text-black border-4 border-black p-6 shadow-brutal transition-transform hover:-translate-y-2 hover:-rotate-1 torn-paper focus:outline-none focus:ring-4 focus:ring-black"
        >
          <div className="absolute top-0 right-0 w-8 h-8 bg-black/10 m-2 rounded-full flex items-center justify-center">
            <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white p-3 border-2 border-black rotate-3 shadow-brutal-sm">
              <StickyNote size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black uppercase">Scrapbook</h2>
          </div>
          <p className="font-typewriter text-lg text-black bg-white/50 p-2 border border-black inline-block">3 Unread Notes</p>
        </Link>

        {/* Tracker Widget */}
        <Link 
          to="/tracker" 
          className="group relative block bg-[#42a5f5] text-black border-4 border-black p-6 shadow-brutal transition-transform hover:-translate-y-2 hover:rotate-1 focus:outline-none focus:ring-4 focus:ring-black"
          style={{ clipPath: "polygon(2% 0%, 100% 1%, 98% 100%, 0% 98%)" }}
        >
           <div className="absolute top-0 right-0 w-8 h-8 bg-black/10 m-2 rounded-full flex items-center justify-center">
            <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white p-3 border-2 border-black -rotate-3 shadow-brutal-sm">
              <Clock size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black uppercase">Punch Card</h2>
          </div>
          <p className="font-typewriter text-lg text-black bg-white/50 p-2 border border-black inline-block">00:00:00 Logged</p>
        </Link>

        {/* Timetable Widget */}
        <Link 
          to="/timetable" 
          className="group relative block bg-[#ef5350] text-black border-4 border-black p-6 shadow-brutal transition-transform hover:-translate-y-2 hover:-rotate-2 focus:outline-none focus:ring-4 focus:ring-black"
          style={{ clipPath: "polygon(0% 1%, 98% 0%, 100% 99%, 1% 100%)" }}
        >
           <div className="absolute top-0 right-0 w-8 h-8 bg-black/10 m-2 rounded-full flex items-center justify-center">
            <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white p-3 border-2 border-black rotate-6 shadow-brutal-sm">
              <CalendarDays size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black uppercase">Timetable</h2>
          </div>
          <p className="font-typewriter text-lg text-black bg-white/50 p-2 border border-black inline-block">2 Classes Today</p>
        </Link>

      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-32 right-6 md:right-auto md:ml-96 bg-yellow-400 text-black border-4 border-black p-4 shadow-brutal rotate-3 hover:rotate-6 hover:-translate-y-2 transition-all group z-40 focus:outline-none focus:ring-4 focus:ring-black">
        <Plus size={36} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
      </button>

    </div>
  );
}
