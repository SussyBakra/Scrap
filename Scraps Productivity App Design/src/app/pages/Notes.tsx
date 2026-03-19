import { useState } from "react";
import { Folder, FileText, CheckSquare, Plus, X, Square } from "lucide-react";
import { clsx } from "clsx";

const MOCK_FOLDERS = [
  { id: 1, name: "Uni Stuff", color: "bg-[#f4e04d]" }, // Manila
  { id: 2, name: "Design Ideas", color: "bg-[#e27396]" }, // Pink
  { id: 3, name: "Random", color: "bg-[#68c3d4]" }, // Blue
];

const MOCK_NOTES = [
  { id: 1, folderId: 1, title: "Psych 101 Midterm", type: "text", content: "Don't forget chapter 4 & 5. Focus on the cognitive models.\n\nAlso, email prof about extension on paper." },
  { id: 2, folderId: 1, title: "Groceries", type: "checklist", items: [
    { text: "Oat milk", done: true },
    { text: "Instant Noodles", done: false },
    { text: "Coffee beans (dark roast)", done: true },
  ] },
  { id: 3, folderId: 2, title: "Brutalist Insp.", type: "text", content: "Heavy borders, offset shadows, grid paper backgrounds. \n\nCheck out old 90s zines." },
];

export function Notes() {
  const [activeFolder, setActiveFolder] = useState<number | null>(null);
  const [notes, setNotes] = useState(MOCK_NOTES);

  const filteredNotes = activeFolder 
    ? notes.filter(n => n.folderId === activeFolder)
    : notes;

  const toggleCheck = (noteId: number, itemIndex: number) => {
    setNotes(prev => prev.map(note => {
      if (note.id === noteId && note.type === "checklist" && note.items) {
        const newItems = [...note.items];
        newItems[itemIndex] = { ...newItems[itemIndex], done: !newItems[itemIndex].done };
        return { ...note, items: newItems };
      }
      return note;
    }));
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto font-brutal pt-8 md:pt-16 pb-32">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-black uppercase tracking-tighter bg-black text-white inline-block px-4 py-2 shadow-brutal-sm border-2 border-black rotate-1">
          Scrapbook
        </h1>
        <button className="bg-yellow-400 p-2 border-4 border-black shadow-brutal hover:-translate-y-1 hover:-rotate-3 transition-transform">
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Folders Section */}
      <section>
        <div className="flex justify-between items-baseline mb-4 border-b-4 border-black pb-2">
          <h2 className="text-2xl font-black uppercase">Folders</h2>
          <span className="font-typewriter text-lg bg-black text-white px-2">Index</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          <button 
            onClick={() => setActiveFolder(null)}
            className={clsx(
              "shrink-0 w-32 h-24 border-4 border-black p-3 flex flex-col justify-between items-start transition-transform shadow-brutal-sm hover:-translate-y-1 snap-start",
              activeFolder === null ? "bg-black text-white" : "bg-white text-black"
            )}
            style={{ clipPath: "polygon(0 0, 40% 0, 50% 15%, 100% 15%, 100% 100%, 0 100%)" }}
          >
            <Folder size={20} strokeWidth={2.5} />
            <span className="font-bold uppercase text-sm w-full truncate">All Scraps</span>
          </button>
          
          {MOCK_FOLDERS.map((f) => (
            <button 
              key={f.id}
              onClick={() => setActiveFolder(f.id)}
              className={clsx(
                "shrink-0 w-32 h-24 border-4 border-black p-3 flex flex-col justify-between items-start transition-transform shadow-brutal-sm hover:-translate-y-1 snap-start",
                f.color,
                activeFolder === f.id ? "ring-4 ring-black ring-offset-2" : ""
              )}
              style={{ clipPath: "polygon(0 0, 40% 0, 50% 15%, 100% 15%, 100% 100%, 0 100%)" }}
            >
              <Folder size={20} strokeWidth={2.5} />
              <span className="font-bold uppercase text-sm w-full truncate text-left">{f.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Notes Grid */}
      <section className="grid gap-6">
        {filteredNotes.map((note) => (
          <div 
            key={note.id} 
            className="bg-white border-4 border-black p-4 shadow-brutal relative torn-paper group transition-transform hover:-translate-y-1"
            style={{ 
              transform: `rotate(${Math.random() > 0.5 ? 1 : -1}deg)`,
              backgroundImage: "linear-gradient(transparent 90%, #e5e7eb 90%)",
              backgroundSize: "100% 2rem"
            }}
          >
            {/* Top Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200 opacity-80 border border-yellow-300 -rotate-2 mix-blend-multiply"></div>
            
            <div className="flex items-center gap-2 mb-4 mt-2">
              {note.type === "text" ? <FileText size={20} className="text-gray-500" /> : <CheckSquare size={20} className="text-gray-500" />}
              <h3 className="font-black text-xl uppercase">{note.title}</h3>
            </div>

            {note.type === "text" && (
              <p className="font-typewriter text-lg leading-8 text-black whitespace-pre-wrap">
                {note.content}
              </p>
            )}

            {note.type === "checklist" && note.items && (
              <ul className="space-y-3 font-typewriter text-lg leading-8 text-black">
                {note.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 cursor-pointer group/item" onClick={() => toggleCheck(note.id, idx)}>
                    <div className="w-6 h-6 border-2 border-black flex items-center justify-center bg-[#f4f4f0] group-hover/item:bg-gray-200 transition-colors shrink-0">
                      {item.done ? <X size={20} strokeWidth={3} className="text-red-500" /> : null}
                    </div>
                    <span className={clsx(item.done && "line-through text-gray-500 decoration-red-500 decoration-2")}>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

    </div>
  );
}
