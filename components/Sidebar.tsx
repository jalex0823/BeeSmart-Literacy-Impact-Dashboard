"use client";

import { NavPage } from "@/app/page";

const NAV_ITEMS: { id: NavPage; label: string; icon: string }[] = [
  { id: "dashboard", label: "Impact Dashboard", icon: "📊" },
  { id: "scenarios", label: "Saved Scenarios",  icon: "💾" },
  { id: "pilot",     label: "Pilot Results",    icon: "✅" },
  { id: "data",      label: "Data Management",  icon: "🗄️" },
  { id: "sources",   label: "Data Sources",     icon: "🔗" },
];

interface SidebarProps {
  activePage: NavPage;
  setActivePage: (p: NavPage) => void;
}

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 bg-[#0c1525] border-r border-slate-700/50 flex flex-col min-h-screen">
      <div className="px-4 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-lg font-black text-slate-900">
            🐝
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100 leading-none">BeeSmart</p>
            <p className="text-[10px] text-amber-400 mt-0.5">Literacy Impact</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
              activePage === item.id
                ? "bg-amber-500 text-slate-900"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-700/50">
        <div className="text-[10px] text-slate-600 leading-relaxed">
          Data: TEA TAPR · STAAR<br />
          HISD · NAEP · Scholastic
        </div>
      </div>
    </aside>
  );
}
