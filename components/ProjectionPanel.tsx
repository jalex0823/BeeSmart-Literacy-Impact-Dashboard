"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { calcProjection, USAGE_IMPROVEMENT, UsageLevel } from "@/lib/data";
import { formatNumber, formatPercent } from "@/lib/utils";

interface ProjectionPanelProps {
  baselinePercent: number;
  districtStudents: number;
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

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

const USAGE_COLORS: Record<UsageLevel, string> = {
  Light: "#6366f1",
  Moderate: "#f5a800",
  Intensive: "#10b981",
};

export function ProjectionPanel({ baselinePercent, districtStudents }: ProjectionPanelProps) {
  const [studentCount, setStudentCount] = useState(1000);
  const [usageLevel, setUsageLevel] = useState<UsageLevel>("Moderate");
  const [customImprovement, setCustomImprovement] = useState<number | null>(null);
  const [useCustom, setUseCustom] = useState(false);

  const activeImprovement = useCustom && customImprovement !== null
    ? customImprovement
    : undefined;

  const projection = useMemo(
    () => calcProjection(baselinePercent, studentCount, usageLevel, activeImprovement),
    [baselinePercent, studentCount, usageLevel, activeImprovement]
  );

  const comparisonData = [
    { name: "Before BeeSmart", value: projection.baselinePercent, students: projection.baselineStudents },
    { name: "After BeeSmart", value: projection.projectedPercent, students: projection.projectedStudents },
  ];

  const usageLevels: UsageLevel[] = ["Light", "Moderate", "Intensive"];

  return (
    <div className="space-y-5">
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-5 py-3 flex items-start gap-3">
        <span className="text-amber-400 text-lg mt-0.5">⚠️</span>
        <div>
          <p className="text-xs font-semibold text-amber-300">Estimated Impact Scenario</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Projections are based on configurable intervention assumptions, not guaranteed outcomes.
            Based on gamified literacy research benchmarks until BeeSmart pilot data is available.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card glow>
          <CardHeader>
            <CardTitle>Configure Scenario</CardTitle>
            <CardSubtitle>Adjust BeeSmart deployment assumptions</CardSubtitle>
          </CardHeader>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">Students Using BeeSmart</label>
                <span className="text-amber-400 font-bold text-sm">{formatNumber(studentCount)}</span>
              </div>
              <input
                type="range"
                min={1}
                max={100000}
                step={100}
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1</span>
                <span>25,000</span>
                <span>50,000</span>
                <span>100,000</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">BeeSmart Usage Level</label>
              <div className="grid grid-cols-3 gap-2">
                {usageLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => { setUsageLevel(level); setUseCustom(false); }}
                    className={`rounded-lg py-2.5 text-xs font-semibold border transition-all ${
                      usageLevel === level && !useCustom
                        ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                        : "bg-slate-700/50 border-slate-600 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <div>{level}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">
                      {USAGE_IMPROVEMENT[level].min}–{USAGE_IMPROVEMENT[level].max}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="useCustom"
                  checked={useCustom}
                  onChange={(e) => setUseCustom(e.target.checked)}
                  className="accent-amber-500"
                />
                <label htmlFor="useCustom" className="text-sm font-medium text-slate-300 cursor-pointer">
                  Custom Improvement %
                </label>
                {useCustom && (
                  <span className="text-amber-400 font-bold text-sm ml-auto">{customImprovement ?? 0}%</span>
                )}
              </div>
              {useCustom && (
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={0.5}
                  value={customImprovement ?? 5}
                  onChange={(e) => setCustomImprovement(Number(e.target.value))}
                  className="w-full"
                />
              )}
            </div>

            <div className="text-xs text-slate-500 bg-slate-700/30 rounded-lg p-3">
              <p className="font-medium text-slate-400 mb-1">Baseline District Enrollment</p>
              <p>{formatNumber(districtStudents)} total students enrolled</p>
              <p className="mt-1">Modeling <span className="text-amber-400 font-semibold">{((studentCount / districtStudents) * 100).toFixed(1)}%</span> of district</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact Projection Chart</CardTitle>
            <CardSubtitle>Before vs. After BeeSmart literacy proficiency</CardSubtitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Proficiency %" radius={[6, 6, 0, 0]}
                label={{ position: "top", fill: "#94a3b8", fontSize: 12, formatter: (v: unknown) => `${Number(v).toFixed(1)}%` }}
              >
                <Cell fill="#475569" />
                <Cell fill={USAGE_COLORS[usageLevel]} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Baseline Proficiency</p>
          <p className="text-3xl font-bold text-slate-300">{formatPercent(projection.baselinePercent)}</p>
          <p className="text-xs text-slate-500 mt-1">{formatNumber(projection.baselineStudents)} students meeting standard</p>
          <Badge variant="gray" className="mt-2">Before BeeSmart</Badge>
        </Card>

        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Projected Proficiency</p>
          <p className="text-3xl font-bold text-amber-400">{formatPercent(projection.projectedPercent)}</p>
          <p className="text-xs text-slate-500 mt-1">{formatNumber(projection.projectedStudents)} students meeting standard</p>
          <Badge variant="yellow" className="mt-2">After BeeSmart</Badge>
        </Card>

        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Additional Students Improved</p>
          <p className="text-3xl font-bold text-emerald-400">+{formatNumber(projection.additionalStudents)}</p>
          <p className="text-xs text-slate-500 mt-1">Projected new proficiency gains</p>
          <Badge variant="green" className="mt-2">Net Impact</Badge>
        </Card>

        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Projected Gain</p>
          <p className="text-3xl font-bold text-blue-400">+{formatPercent(projection.improvementPercent)}</p>
          <p className="text-xs text-slate-500 mt-1">Percentage point improvement</p>
          <Badge variant="blue" className="mt-2">{usageLevel} Use Model</Badge>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scenario Summary Table</CardTitle>
          <CardSubtitle>Grant-ready impact overview · Estimated Impact Scenario based on configurable intervention assumptions</CardSubtitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3 text-slate-400 font-medium">Metric</th>
                <th className="text-right py-2 px-3 text-slate-400 font-medium">Before BeeSmart</th>
                <th className="text-right py-2 px-3 text-amber-400 font-medium">After BeeSmart Projection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              <tr>
                <td className="py-2.5 px-3 text-slate-300">Students in Scenario</td>
                <td className="py-2.5 px-3 text-right text-slate-300">{formatNumber(studentCount)}</td>
                <td className="py-2.5 px-3 text-right text-amber-300">{formatNumber(studentCount)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-300">Reading/Spelling Proficiency</td>
                <td className="py-2.5 px-3 text-right text-slate-300">{formatPercent(projection.baselinePercent)}</td>
                <td className="py-2.5 px-3 text-right text-amber-300">{formatPercent(projection.projectedPercent)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-300">Students Meeting Standard</td>
                <td className="py-2.5 px-3 text-right text-slate-300">{formatNumber(projection.baselineStudents)}</td>
                <td className="py-2.5 px-3 text-right text-amber-300">{formatNumber(projection.projectedStudents)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-300">Additional Students Improved</td>
                <td className="py-2.5 px-3 text-right text-slate-400">—</td>
                <td className="py-2.5 px-3 text-right text-emerald-300 font-semibold">+{formatNumber(projection.additionalStudents)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-300">Projected Gain</td>
                <td className="py-2.5 px-3 text-right text-slate-400">—</td>
                <td className="py-2.5 px-3 text-right text-emerald-300 font-semibold">+{formatPercent(projection.improvementPercent)} pts</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-300">BeeSmart Usage Level</td>
                <td className="py-2.5 px-3 text-right text-slate-400">N/A</td>
                <td className="py-2.5 px-3 text-right">
                  <Badge variant={usageLevel === "Intensive" ? "green" : usageLevel === "Moderate" ? "yellow" : "blue"}>
                    {usageLevel}
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
