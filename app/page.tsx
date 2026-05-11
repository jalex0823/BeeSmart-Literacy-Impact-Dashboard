"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ImpactDashboard } from "@/components/ImpactDashboard";
import { SavedScenariosPanel } from "@/components/SavedScenariosPanel";
import { PilotPanel } from "@/components/PilotPanel";
import { DataManagementPanel } from "@/components/DataManagementPanel";
import { SourcesPanel } from "@/components/SourcesPanel";
import { SavedScenario } from "@/lib/data";

export type NavPage = "dashboard" | "scenarios" | "pilot" | "data" | "sources";

export default function Home() {
  const [activePage, setActivePage] = useState<NavPage>("dashboard");
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

  const handleSaveScenario = (s: SavedScenario) => {
    setSavedScenarios((prev) => [s, ...prev]);
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a]">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 overflow-auto">
          {activePage === "dashboard" && (
            <ImpactDashboard onSaveScenario={handleSaveScenario} />
          )}
          {activePage === "scenarios" && (
            <SavedScenariosPanel scenarios={savedScenarios} />
          )}
          {activePage === "pilot" && <PilotPanel />}
          {activePage === "data"    && <DataManagementPanel />}
          {activePage === "sources" && <SourcesPanel />}
        </main>

        <footer className="border-t border-slate-700/50 bg-slate-900/50 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-500">
              🐝 BeeSmart Literacy Impact Dashboard · TEA TAPR · STAAR · HISD · NAEP
            </span>
            <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
              Estimated Impact Scenario — configurable intervention assumptions
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
