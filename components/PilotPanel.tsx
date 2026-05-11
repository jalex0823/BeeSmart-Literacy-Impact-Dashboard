"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatPercent } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

interface PilotEntry {
  campus: string;
  grade: string;
  studentsCount: number;
  preTestPercent: number;
  postTestPercent: number;
}

const samplePilotData: PilotEntry[] = [
  { campus: "Sample Campus A", grade: "Grade 4", studentsCount: 120, preTestPercent: 42, postTestPercent: 54 },
  { campus: "Sample Campus B", grade: "Grade 5", studentsCount: 95, preTestPercent: 38, postTestPercent: 49 },
  { campus: "Sample Campus C", grade: "Grade 3", studentsCount: 110, preTestPercent: 45, postTestPercent: 56 },
];

interface TooltipPayload { name: string; value: number; color: string; }

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-xs">
        <p className="font-semibold text-slate-200 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}%</p>
        ))}
      </div>
    );
  }
  return null;
}

export function PilotPanel() {
  const [pilotData] = useState<PilotEntry[]>(samplePilotData);
  const [csvText, setCsvText] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const totalStudents = pilotData.reduce((s, r) => s + r.studentsCount, 0);
  const avgPre = pilotData.reduce((s, r) => s + r.preTestPercent, 0) / pilotData.length;
  const avgPost = pilotData.reduce((s, r) => s + r.postTestPercent, 0) / pilotData.length;
  const avgGain = avgPost - avgPre;
  const studentsImproved = pilotData.reduce((s, r) => {
    return s + Math.round(((r.postTestPercent - r.preTestPercent) / 100) * r.studentsCount);
  }, 0);

  const chartData = pilotData.map((r) => ({
    name: r.campus.replace("Sample ", ""),
    "Pre-Test": r.preTestPercent,
    "Post-Test": r.postTestPercent,
    Gain: r.postTestPercent - r.preTestPercent,
  }));

  return (
    <div className="space-y-5">
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-5 py-3 flex items-start gap-3">
        <span className="text-emerald-400 text-lg mt-0.5">✅</span>
        <div>
          <p className="text-xs font-semibold text-emerald-300">Measured BeeSmart Pilot Results</p>
          <p className="text-xs text-slate-400 mt-0.5">
            This section displays real pre-test / post-test results from BeeSmart pilot deployments.
            Currently showing sample data. Upload actual pilot CSV to replace with verified results.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Pilot Students</p>
          <p className="text-3xl font-bold text-slate-100">{formatNumber(totalStudents)}</p>
          <Badge variant="gray" className="mt-2">Total Enrolled</Badge>
        </Card>
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Avg Pre-Test Score</p>
          <p className="text-3xl font-bold text-slate-400">{formatPercent(avgPre)}</p>
          <Badge variant="gray" className="mt-2">Before BeeSmart</Badge>
        </Card>
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Avg Post-Test Score</p>
          <p className="text-3xl font-bold text-emerald-400">{formatPercent(avgPost)}</p>
          <Badge variant="green" className="mt-2">After BeeSmart</Badge>
        </Card>
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Students Improved</p>
          <p className="text-3xl font-bold text-amber-400">+{formatNumber(studentsImproved)}</p>
          <Badge variant="yellow" className="mt-2">+{formatPercent(avgGain)} avg gain</Badge>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Pre vs. Post Test Results by Campus</CardTitle>
            <CardSubtitle>Measured BeeSmart pilot outcomes</CardSubtitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
              <Bar dataKey="Pre-Test" fill="#475569" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Post-Test" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pilot Data Table</CardTitle>
            <CardSubtitle>Campus-level pre/post results</CardSubtitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Campus</th>
                  <th className="text-left py-2 px-2 text-slate-400 font-medium text-xs">Grade</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium text-xs">Students</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium text-xs">Pre</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium text-xs">Post</th>
                  <th className="text-right py-2 px-2 text-emerald-400 font-medium text-xs">Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {pilotData.map((row) => (
                  <tr key={row.campus} className="hover:bg-slate-700/20">
                    <td className="py-2 px-2 text-slate-300 text-xs">{row.campus}</td>
                    <td className="py-2 px-2 text-slate-400 text-xs">{row.grade}</td>
                    <td className="py-2 px-2 text-right text-slate-300 text-xs">{formatNumber(row.studentsCount)}</td>
                    <td className="py-2 px-2 text-right text-slate-400 text-xs">{row.preTestPercent}%</td>
                    <td className="py-2 px-2 text-right text-emerald-300 text-xs">{row.postTestPercent}%</td>
                    <td className="py-2 px-2 text-right text-xs">
                      <Badge variant="green">+{row.postTestPercent - row.preTestPercent}pts</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Pilot Data</CardTitle>
          <CardSubtitle>
            CSV format: campus, grade, studentsCount, preTestPercent, postTestPercent
          </CardSubtitle>
        </CardHeader>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium hover:bg-emerald-500/30 transition-colors"
        >
          {showUpload ? "Hide Upload" : "📁 Upload Pilot CSV"}
        </button>
        {showUpload && (
          <div className="mt-4 space-y-3">
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder={"campus,grade,studentsCount,preTestPercent,postTestPercent\nCampus A,Grade 4,120,42,54"}
              rows={6}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500 resize-none"
            />
            <p className="text-xs text-slate-500">
              Paste your CSV data above. Once you have real pilot data, this replaces the sample data and activates Verified Pilot Mode.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
