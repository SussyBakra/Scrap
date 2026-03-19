import { useState } from "react";
import { Calculator, Save } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

type Log = {
  day: string;
  in: string;
  out: string;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function TimeTracker() {
  const [logs, setLogs] = useState<Log[]>(
    WEEKDAYS.map(day => ({ day, in: "", out: "" }))
  );

  const calculateHours = (log: Log) => {
    if (!log.in || !log.out) return 0;
    const [inH, inM] = log.in.split(":").map(Number);
    const [outH, outM] = log.out.split(":").map(Number);
    if (isNaN(inH) || isNaN(outH)) return 0;
    
    let diff = (outH * 60 + outM) - (inH * 60 + inM);
    if (diff < 0) diff += 24 * 60; // Cross midnight
    return diff / 60;
  };

  const totalHours = logs.reduce((acc, log) => acc + calculateHours(log), 0);

  const handleLogChange = (index: number, field: "in" | "out", value: string) => {
    const newLogs = [...logs];
    newLogs[index][field] = value;
    setLogs(newLogs);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto font-brutal pt-8 md:pt-16 pb-32">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-black uppercase tracking-tighter bg-black text-white inline-block px-4 py-2 shadow-brutal-sm border-2 border-black -rotate-1">
          Time Punch
        </h1>
        <button className="bg-[#42a5f5] p-2 border-4 border-black shadow-brutal hover:-translate-y-1 hover:rotate-3 transition-transform">
          <Save size={24} strokeWidth={3} className="text-black" />
        </button>
      </div>

      {/* Punch Card Container */}
      <section className="bg-white border-4 border-black shadow-brutal mx-2 relative serrated-bottom"
               style={{ backgroundImage: "linear-gradient(90deg, transparent 79px, #ffbaba 79px, #ffbaba 81px, transparent 81px)", backgroundSize: "100% 100%" }}>
        
        {/* Top edge holes like a punch card */}
        <div className="absolute top-2 left-0 right-0 flex justify-around opacity-20 px-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-black border border-black"></div>
          ))}
        </div>

        <div className="p-6 pt-10">
          <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-6">
             <div>
               <p className="font-typewriter text-xl text-gray-500">WEEK OF</p>
               <h2 className="text-2xl font-black uppercase">{format(startOfWeek(new Date(), { weekStartsOn: 1 }), "MMM dd, yyyy")}</h2>
             </div>
             <p className="font-typewriter text-xl bg-black text-white px-2 py-1 rotate-2">ID: 8492-X</p>
          </div>

          {/* Time Entries */}
          <div className="space-y-4 font-typewriter">
            <div className="grid grid-cols-4 gap-2 text-sm font-black border-b-2 border-black pb-2 px-2">
              <span className="col-span-1">DAY</span>
              <span className="col-span-1 text-center">IN</span>
              <span className="col-span-1 text-center">OUT</span>
              <span className="col-span-1 text-right">HRS</span>
            </div>

            {logs.map((log, idx) => (
              <div key={log.day} className="grid grid-cols-4 gap-2 items-center px-2 group">
                <span className="col-span-1 font-bold text-lg">{log.day}</span>
                <input 
                  type="time" 
                  value={log.in}
                  onChange={(e) => handleLogChange(idx, "in", e.target.value)}
                  className="col-span-1 bg-transparent border-b-2 border-dashed border-gray-400 focus:border-black focus:bg-yellow-200 outline-none text-center px-1"
                />
                <input 
                  type="time" 
                  value={log.out}
                  onChange={(e) => handleLogChange(idx, "out", e.target.value)}
                  className="col-span-1 bg-transparent border-b-2 border-dashed border-gray-400 focus:border-black focus:bg-yellow-200 outline-none text-center px-1"
                />
                <span className="col-span-1 text-right font-bold text-lg group-hover:text-black text-gray-600">
                  {calculateHours(log) > 0 ? calculateHours(log).toFixed(1) : "-"}
                </span>
              </div>
            ))}
          </div>

          {/* Calculator Section / Total */}
          <div className="mt-8 pt-6 border-t-4 border-black flex items-center justify-between bg-gray-100 p-4 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] -mx-6 -mb-6 pb-12">
            <div className="flex items-center gap-2">
              <Calculator size={32} strokeWidth={2.5} className="text-black" />
              <span className="font-black text-2xl uppercase">Total</span>
            </div>
            
            <div className="bg-black text-[#00ff41] font-typewriter text-5xl p-3 border-4 border-black shadow-[4px_4px_0px_#ccc] flex items-center justify-center min-w-[120px]">
              {totalHours.toFixed(1)}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
