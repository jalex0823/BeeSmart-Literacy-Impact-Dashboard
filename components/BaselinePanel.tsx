"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { districtData, campusData, GradeLevel, StudentGroup, DISTRICTS, YEARS } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-xs">
        <p className="font-semibold text-slate-200 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
}

interface BaselinePanelProps {
  year: string;
  district: string;
  grade: GradeLevel;
  studentGroup: StudentGroup;
}

export function BaselinePanel({ year, district, grade, studentGroup }: BaselinePanelProps) {
  const currentDistrict = districtData.find((d) => d.district === district && d.year === year);
  const stateData = districtData.find((d) => d.district === "Texas Statewide" && d.year === year);
  const campuses = campusData.filter((c) => c.district === district && c.year === year);

  const getBaselinePercent = () => {
    if (!currentDistrict) return 0;
    if (studentGroup !== "All Students" && campuses.length > 0) {
      const avg = campuses.reduce((sum, c) => sum + (c.studentGroups[studentGroup] ?? 0), 0) / campuses.length;
      return Math.round(avg);
    }
    return currentDistrict.staarRLA;
  };

  const baselinePercent = getBaselinePercent();
  const statePercent = stateData?.staarRLA ?? 52;
  const gap = statePercent - baselinePercent;

  const districtComparison = DISTRICTS.map((d) => {
    const entry = districtData.find((x) => x.district === d && x.year === year);
    return {
      name: d === "Texas Statewide" ? "TX State" : d.replace(" ISD", ""),
      value: entry?.staarRLA ?? 0,
      isSelected: d === district,
    };
  });

  const campusChartData = campuses.map((c) => ({
    name: c.campus.length > 22 ? c.campus.substring(0, 22) + "…" : c.campus,
    staarRLA: studentGroup === "All Students"
      ? c.staarRLA[grade === "All Grades" ? "All Grades" : grade]
      : (c.studentGroups[studentGroup] ?? 0),
    rating: c.campusRating,
  })).filter((c) => c.staarRLA > 0);

  const trendData = YEARS.map((y) => {
    const d = districtData.find((x) => x.district === district && x.year === y);
    const s = districtData.find((x) => x.district === "Texas Statewide" && x.year === y);
    return {
      year: y.split("–")[1] ? `'${y.split("–")[1]}` : y,
      [district === "Texas Statewide" ? "TX State" : district.replace(" ISD", "")]: d?.staarRLA ?? 0,
      "TX State Avg": s?.staarRLA ?? 0,
    };
  });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">STAAR RLA Proficiency</p>
          <p className="text-3xl font-bold text-amber-400">{baselinePercent}%</p>
          <p className="text-xs text-slate-500 mt-1">
            {district === "Texas Statewide" ? "Statewide" : district} · {year}
          </p>
          <Badge variant={baselinePercent >= 50 ? "green" : baselinePercent >= 40 ? "yellow" : "red"} className="mt-2">
            {baselinePercent >= 50 ? "At/Above Avg" : baselinePercent >= 40 ? "Near Avg" : "Below Avg"}
          </Badge>
        </Card>

        <Card>
          <p className="text-xs text-slate-400 mb-1">Texas State Average</p>
          <p className="text-3xl font-bold text-blue-400">{statePercent}%</p>
          <p className="text-xs text-slate-500 mt-1">Statewide STAAR RLA · {year}</p>
          <Badge variant="blue" className="mt-2">State Benchmark</Badge>
        </Card>

        <Card>
          <p className="text-xs text-slate-400 mb-1">Gap vs. State Avg</p>
          <p className={`text-3xl font-bold ${gap > 0 ? "text-red-400" : "text-emerald-400"}`}>
            {gap > 0 ? "-" : "+"}{Math.abs(gap)}pts
          </p>
          <p className="text-xs text-slate-500 mt-1">Proficiency point difference</p>
          <Badge variant={gap > 0 ? "red" : "green"} className="mt-2">
            {gap > 0 ? `${gap}pt below state` : `${Math.abs(gap)}pt above state`}
          </Badge>
        </Card>

        <Card>
          <p className="text-xs text-slate-400 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-slate-100">
            {currentDistrict ? formatNumber(currentDistrict.totalStudents) : "—"}
          </p>
          <p className="text-xs text-slate-500 mt-1">Enrolled · {year}</p>
          {currentDistrict?.nweaRIT && (
            <p className="text-xs text-amber-400 mt-2">NWEA RIT: {currentDistrict.nweaRIT}</p>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>District Comparison — STAAR RLA {year}</CardTitle>
            <CardSubtitle>Reading Language Arts proficiency % across Texas districts</CardSubtitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={districtComparison} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={statePercent} stroke="#60a5fa" strokeDasharray="4 4" label={{ value: "State Avg", fill: "#60a5fa", fontSize: 10 }} />
              <Bar dataKey="value" name="STAAR RLA %" radius={[4, 4, 0, 0]}
                fill="#f5a800"
                label={{ position: "top", fill: "#94a3b8", fontSize: 10, formatter: (v: unknown) => `${Number(v)}%` }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Multi-Year Trend — {district === "Texas Statewide" ? "Statewide" : district.replace(" ISD", " ISD")}</CardTitle>
            <CardSubtitle>STAAR RLA proficiency vs. Texas state average over time</CardSubtitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
              <Bar dataKey={Object.keys(trendData[0] ?? {})[1] ?? ""} fill="#f5a800" radius={[4, 4, 0, 0]} />
              <Bar dataKey="TX State Avg" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {campusChartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Campus-Level Breakdown — {district}</CardTitle>
            <CardSubtitle>
              STAAR RLA % by campus · {studentGroup} · {grade} · {year} · Source: TEA TAPR / HISD Reports
            </CardSubtitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={campusChartData} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} angle={-20} textAnchor="end" interval={0} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={baselinePercent} stroke="#f5a800" strokeDasharray="4 4" label={{ value: "Dist Avg", fill: "#f5a800", fontSize: 10 }} />
              <Bar dataKey="staarRLA" name="STAAR RLA %" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
