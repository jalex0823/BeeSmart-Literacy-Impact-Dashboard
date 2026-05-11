"use client";

import { useState, useRef, useEffect } from "react";
import { StudentGroup } from "@/lib/data";

export const ALL_GROUPS: StudentGroup[] = [
  "All Students",
  "African American",
  "Hispanic",
  "White",
  "Asian",
  "Economically Disadvantaged",
  "Special Education",
  "English Learners",
];

interface DemographicsDropdownProps {
  selected: StudentGroup[];
  onChange: (groups: StudentGroup[]) => void;
}

export function DemographicsDropdown({ selected, onChange }: DemographicsDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(g: StudentGroup) {
    if (g === "All Students") {
      onChange(["All Students"]);
      return;
    }
    const without = selected.filter((s) => s !== "All Students");
    const next = without.includes(g) ? without.filter((s) => s !== g) : [...without, g];
    onChange(next.length === 0 ? ["All Students"] : next);
  }

  const label = selected.includes("All Students")
    ? "All Demographics"
    : selected.length === 1
    ? selected[0]
    : `${selected.length} Groups`;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 bg-slate-700/60 border border-slate-600 text-slate-200 text-xs rounded-lg px-3 py-1.5 hover:border-amber-500/60 focus:outline-none focus:border-amber-500 cursor-pointer whitespace-nowrap"
      >
        <span>👥</span>
        <span>{label}</span>
        <span className="text-slate-500 ml-0.5">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl py-2 min-w-52">
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider px-3 pb-1.5 border-b border-slate-700/50 mb-1">
            Demographics
          </p>
          {ALL_GROUPS.map((g) => {
            const active = selected.includes(g);
            return (
              <button
                key={g}
                onClick={() => toggle(g)}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs transition-colors hover:bg-slate-700/50 ${
                  active ? "text-amber-300" : "text-slate-300"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    active ? "bg-amber-500 border-amber-500" : "border-slate-500"
                  }`}
                >
                  {active && <span className="text-slate-900 text-[10px] font-bold">✓</span>}
                </span>
                {g}
              </button>
            );
          })}
          <div className="border-t border-slate-700/50 mt-1 pt-1 px-3">
            <button
              onClick={() => onChange(["All Students"])}
              className="text-[10px] text-slate-500 hover:text-amber-400 transition-colors"
            >
              Reset to All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
