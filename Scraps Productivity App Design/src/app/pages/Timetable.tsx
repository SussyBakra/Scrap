import { useState } from "react";
import { Plus, Maximize, Clock, FilePlus } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

const TIME_SLOTS = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

type Event = {
  id: string;
  title: string;
  day: string;
  start: string;
  duration: number; // hours
  color: string;
  type: "uni" | "work";
};

const MOCK_EVENTS: Event[] = [
  { id: "1", title: "Design Theory", day: "Mon", start: "10 AM", duration: 2, color: "bg-yellow-300", type: "uni" },
  { id: "2", title: "Office Shift", day: "Tue", start: "1 PM", duration: 4, color: "bg-[#42a5f5]", type: "work" },
  { id: "3", title: "Web Dev Lab", day: "Wed", start: "9 AM", duration: 3, color: "bg-[#ff8c42]", type: "uni" },
  { id: "4", title: "Office Shift", day: "Thu", start: "1 PM", duration: 4, color: "bg-[#42a5f5]", type: "work" },
];

export function Timetable() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto font-brutal pt-8 md:pt-16 pb-32">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-black uppercase tracking-tighter bg-black text-white inline-block px-4 py-2 shadow-brutal-sm border-2 border-black rotate-2">
          Schedule
        </h1>
        <button className="bg-[#ef5350] p-2 border-4 border-black shadow-brutal hover:-translate-y-1 hover:-rotate-3 transition-transform">
          <Plus size={24} strokeWidth={3} className="text-black" />
        </button>
      </div>

      {/* Timetable Grid Container */}
      <section className="bg-white border-4 border-black shadow-brutal mx-1 relative overflow-hidden" style={{ minHeight: "600px" }}>
        
        {/* Binder Rings Simulation */}
        <div className="absolute top-0 bottom-0 left-0 w-8 border-r-4 border-black bg-gray-200 z-10 flex flex-col justify-between py-12">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="w-6 h-6 rounded-full border-4 border-black bg-white -ml-3 flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-black"></div>
             </div>
           ))}
        </div>

        {/* Notebook Grid Lines */}
        <div className="absolute inset-0 left-8 right-0 bg-grid-pattern opacity-50 z-0 pointer-events-none"></div>

        <div className="ml-8 relative z-10 h-full flex flex-col">
          
          {/* Days Header */}
          <div className="grid grid-cols-5 border-b-4 border-black bg-white/90 sticky top-0 z-20">
            {DAYS.map((day, idx) => (
              <div key={day} className="text-center py-2 border-r-2 border-black last:border-r-0 font-typewriter font-bold flex flex-col justify-center min-h-[48px]">
                <span className="text-xs uppercase bg-black text-white px-1 inline-block mx-auto mb-1">{day}</span>
                <span className="text-sm">{format(addDays(startDate, idx), "dd")}</span>
              </div>
            ))}
          </div>

          {/* Time Grid Scroll Area */}
          <div className="flex-1 overflow-y-auto relative min-h-[500px]">
            {/* Horizontal Time Lines */}
            {TIME_SLOTS.map((time, idx) => (
              <div key={time} className="absolute left-0 right-0 border-t border-dashed border-gray-400 flex items-start pl-2" style={{ top: `${idx * 60 + 20}px` }}>
                <span className="text-[10px] font-typewriter text-gray-500 bg-[#f4f4f0] px-1 -mt-2">{time}</span>
              </div>
            ))}

            {/* Events Overlay */}
            {events.map((evt) => {
              const dayIndex = DAYS.indexOf(evt.day);
              const startIdx = TIME_SLOTS.indexOf(evt.start);
              
              if (dayIndex === -1 || startIdx === -1) return null;

              const top = startIdx * 60 + 20;
              const height = evt.duration * 60;
              const left = `${(dayIndex / 5) * 100}%`;
              const width = "20%";

              return (
                <div 
                  key={evt.id}
                  className="absolute p-1 group"
                  style={{ top, left, width, height }}
                >
                  <div 
                    className={`${evt.color} w-full h-full border-2 border-black p-1 flex flex-col gap-1 overflow-hidden shadow-brutal-sm group-hover:z-30 transition-transform hover:scale-110 hover:-rotate-2`}
                    style={{ 
                      // Ripped masking tape effect
                      clipPath: evt.type === "work" 
                        ? "polygon(2% 2%, 98% 0%, 100% 98%, 0% 100%)"
                        : "polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)",
                      mixBlendMode: "multiply"
                    }}
                  >
                    <span className="font-black text-xs uppercase leading-tight truncate">{evt.title}</span>
                    <span className="font-typewriter text-[10px] bg-white/50 px-1 truncate inline-block w-fit border border-black">{evt.duration}h</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
