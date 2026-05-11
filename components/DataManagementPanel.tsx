"use client";

import { useState, useRef } from "react";
import { literacyRecords, LiteracyRecord } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatNumber } from "@/lib/utils";

export function DataManagementPanel() {
  const [records, setRecords] = useState<LiteracyRecord[]>(literacyRecords);
  const [showAdd, setShowAdd]     = useState(false);
  const [csvError, setCsvError]   = useState("");
  const [csvSuccess, setCsvSuccess] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("All");
  const fileRef = useRef<HTMLInputElement>(null);
  const idRef   = useRef(100);

  const [newRow, setNewRow] = useState<Omit<LiteracyRecord, "id">>({
    district: "Houston ISD", campus: "All Campuses", year: "2023-2024",
    grade: "All", subject: "Reading Language Arts", group: "All Students",
    proficiencyPercent: 0, totalStudents: 0,
  });

  const districts = ["All", ...Array.from(new Set(records.map((r) => r.district)))];
  const filtered  = filterDistrict === "All" ? records : records.filter((r) => r.district === filterDistrict);

  function handleAddRecord() {
    const rec: LiteracyRecord = { ...newRow, id: String(++idRef.current) };
    setRecords((prev) => [...prev, rec]);
    setShowAdd(false);
  }

  function handleDelete(id: string) {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }

  function handleCsvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const lines = text.trim().split("\n");
        const headers = lines[0].toLowerCase().split(",").map((h) => h.trim());
        const required = ["district", "campus", "year", "grade", "subject", "group", "proficiencypercent", "totalstudents"];
        const missing = required.filter((r) => !headers.includes(r));
        if (missing.length) {
          setCsvError(`Missing columns: ${missing.join(", ")}`);
          return;
        }
        const parsed: LiteracyRecord[] = lines.slice(1).map((line) => {
          const vals = line.split(",").map((v) => v.trim());
          const get = (col: string) => vals[headers.indexOf(col)] ?? "";
          return {
            id: String(++idRef.current),
            district: get("district"),
            campus: get("campus"),
            year: get("year"),
            grade: get("grade"),
            subject: get("subject"),
            group: get("group"),
            proficiencyPercent: Number(get("proficiencypercent")),
            totalStudents: Number(get("totalstudents")),
          };
        });
        setRecords((prev) => [...prev, ...parsed]);
        setCsvSuccess(`${parsed.length} records imported successfully`);
        setCsvError("");
        setTimeout(() => setCsvSuccess(""), 4000);
      } catch {
        setCsvError("Failed to parse CSV. Check column format.");
      }
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = "";
  }

  const inputCls = "bg-slate-700/60 border border-slate-600 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 w-full";
  const thCls    = "text-left py-2.5 px-3 text-slate-400 font-medium text-xs uppercase tracking-wider";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Data Management</h1>
          <p className="text-sm text-slate-400 mt-1">Upload or manually enter TEA/STAAR literacy baseline data</p>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium hover:bg-blue-500/30 transition-colors cursor-pointer">
            📥 Import CSV/Excel
            <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleCsvUpload} />
          </label>
          <button onClick={() => setShowAdd(!showAdd)}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-bold transition-colors">
            + Add Record
          </button>
        </div>
      </div>

      {/* CSV format hint */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3 text-xs text-slate-400">
        <span className="font-semibold text-blue-300">CSV/Excel Import:</span> Your file should include columns for{" "}
        <span className="text-slate-300">district, campus, year, grade, subject, group, proficiencyPercent, totalStudents</span>.
        Download TEA TAPR data from{" "}
        <a href="https://tea.texas.gov/perfreport/tapr" target="_blank" rel="noopener noreferrer"
          className="text-amber-400 hover:underline">tea.texas.gov</a>.
      </div>

      {csvError   && <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl px-4 py-3 text-sm">⚠️ {csvError}</div>}
      {csvSuccess && <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl px-4 py-3 text-sm">✅ {csvSuccess}</div>}

      {/* Add record form */}
      {showAdd && (
        <Card glow>
          <CardHeader>
            <CardTitle>Add New Record</CardTitle>
            <CardSubtitle>Manually enter a TEA/STAAR literacy baseline data point</CardSubtitle>
          </CardHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {(["district","campus","year","grade","subject","group"] as const).map((field) => (
              <div key={field}>
                <label className="text-xs text-slate-400 mb-1 block capitalize">{field}</label>
                <input className={inputCls} value={(newRow as Record<string, string | number>)[field] as string}
                  onChange={(e) => setNewRow((p) => ({ ...p, [field]: e.target.value }))} />
              </div>
            ))}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Proficiency %</label>
              <input type="number" className={inputCls} value={newRow.proficiencyPercent}
                onChange={(e) => setNewRow((p) => ({ ...p, proficiencyPercent: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Total Students</label>
              <input type="number" className={inputCls} value={newRow.totalStudents}
                onChange={(e) => setNewRow((p) => ({ ...p, totalStudents: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAddRecord}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-bold transition-colors">
              Save Record
            </button>
            <button onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm transition-colors">
              Cancel
            </button>
          </div>
        </Card>
      )}

      {/* Filter + table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle>{filtered.length} records loaded</CardTitle>
              <CardSubtitle>Click the trash icon to remove a record</CardSubtitle>
            </div>
            <select
              className="bg-slate-700/60 border border-slate-600 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500"
              value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}
            >
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className={thCls}>District</th>
                <th className={thCls}>Campus</th>
                <th className={thCls}>Year</th>
                <th className={thCls}>Grade</th>
                <th className={thCls}>Subject</th>
                <th className={thCls}>Group</th>
                <th className={`${thCls} text-right`}>Proficiency %</th>
                <th className={`${thCls} text-right`}>Students</th>
                <th className={thCls}></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filtered.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="py-2.5 px-3 text-slate-200 font-semibold">{rec.district}</td>
                  <td className="py-2.5 px-3 text-slate-400">{rec.campus}</td>
                  <td className="py-2.5 px-3">
                    <Badge variant="blue">{rec.year}</Badge>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">{rec.grade === "All" ? "All" : `Grade ${rec.grade}`}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-xs">{rec.subject}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-xs">{rec.group}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`font-bold ${rec.proficiencyPercent >= 50 ? "text-emerald-400" : rec.proficiencyPercent >= 40 ? "text-amber-400" : "text-red-400"}`}>
                      {rec.proficiencyPercent}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400 text-xs">{formatNumber(rec.totalStudents)}</td>
                  <td className="py-2.5 px-3">
                    <button onClick={() => handleDelete(rec.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors text-base">
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
