"use client";

import { useState } from "react";
import { dataSources, DataSource } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const methodColors: Record<DataSource["pullMethod"], "green" | "blue" | "yellow" | "gray"> = {
  "CSV Import": "green",
  "Hard Pull": "blue",
  "Manual Entry": "yellow",
  "Internal": "gray",
};

const methodIcons: Record<DataSource["pullMethod"], string> = {
  "CSV Import": "📥",
  "Hard Pull": "🔗",
  "Manual Entry": "✏️",
  "Internal": "🐝",
};

interface NewSource {
  name: string; organization: string; year: string;
  pullMethod: DataSource["pullMethod"]; url: string; description: string;
}

export function SourcesPanel() {
  const [sources, setSources] = useState<DataSource[]>(dataSources);
  const [showAdd, setShowAdd] = useState(false);
  const [counter, setCounter] = useState(dataSources.length + 1);
  const [newSrc, setNewSrc] = useState<NewSource>({
    name: "", organization: "", year: "",
    pullMethod: "Manual Entry", url: "", description: "",
  });

  function handleAdd() {
    if (!newSrc.name.trim()) return;
    setSources((prev) => [...prev, { ...newSrc, id: `custom-${counter}` }]);
    setCounter((c) => c + 1);
    setNewSrc({ name: "", organization: "", year: "", pullMethod: "Manual Entry", url: "", description: "" });
    setShowAdd(false);
  }

  function handleDelete(id: string) {
    setSources((prev) => prev.filter((s) => s.id !== id));
  }

  const inputCls = "bg-slate-700/60 border border-slate-600 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 w-full";

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Data Sources</h1>
          <p className="text-sm text-slate-400 mt-1">Track and cite all data sources used in projections and reports</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-bold transition-colors">
          + Add Source
        </button>
      </div>

      {/* Add source form */}
      {showAdd && (
        <Card>
          <p className="text-sm font-semibold text-slate-200 mb-4">New Data Source</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Source Name *</label>
              <input className={inputCls} placeholder="e.g. TEA TAPR 2025" value={newSrc.name}
                onChange={(e) => setNewSrc((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Organization</label>
              <input className={inputCls} placeholder="e.g. Texas Education Agency" value={newSrc.organization}
                onChange={(e) => setNewSrc((p) => ({ ...p, organization: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Year</label>
              <input className={inputCls} placeholder="e.g. 2024-25" value={newSrc.year}
                onChange={(e) => setNewSrc((p) => ({ ...p, year: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Pull Method</label>
              <select className={inputCls} value={newSrc.pullMethod}
                onChange={(e) => setNewSrc((p) => ({ ...p, pullMethod: e.target.value as DataSource["pullMethod"] }))}>
                {(["CSV Import", "Hard Pull", "Manual Entry", "Internal"] as DataSource["pullMethod"][]).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">URL</label>
              <input className={inputCls} placeholder="https://..." value={newSrc.url}
                onChange={(e) => setNewSrc((p) => ({ ...p, url: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-slate-400 mb-1 block">Description</label>
              <textarea className={inputCls} rows={2} placeholder="What data does this source provide?" value={newSrc.description}
                onChange={(e) => setNewSrc((p) => ({ ...p, description: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-bold transition-colors">
              Save Source
            </button>
            <button onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm transition-colors">
              Cancel
            </button>
          </div>
        </Card>
      )}

      {/* Sources list */}
      <div className="space-y-3">
        {sources.map((source, i) => (
          <Card key={source.id} className="hover:border-slate-600/50 transition-colors">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-700/60 flex items-center justify-center text-lg shrink-0">
                {methodIcons[source.pullMethod]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-slate-200">{source.name}</p>
                  <Badge variant={methodColors[source.pullMethod]}>{source.pullMethod}</Badge>
                  <span className="text-xs text-slate-500">{source.year}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2 leading-relaxed">{source.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span>🏛 {source.organization}</span>
                  {source.url && (
                    <a href={source.url} target="_blank" rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 transition-colors truncate max-w-xs">
                      🔗 {source.url}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-2 shrink-0">
                <span className="text-xs text-slate-600 mt-1">#{i + 1}</span>
                <button onClick={() => handleDelete(source.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors text-base">
                  🗑
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
