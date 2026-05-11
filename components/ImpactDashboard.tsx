"use client";

import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ReferenceLine, Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  districtData, campusData, literacyRecords, DISTRICTS, YEARS,
  calcProjection, USAGE_IMPROVEMENT, UsageLevel, SavedScenario, GradeLevel, StudentGroup,
  normalizeYear,
} from "@/lib/data";
import { formatNumber, formatPercent } from "@/lib/utils";
import { DemographicsDropdown, ALL_GROUPS } from "@/components/DemographicsDropdown";

interface ImpactDashboardProps {
  onSaveScenario: (s: SavedScenario) => void;
}

interface TTPayload { name: string; value: number; color: string; }
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TTPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-xs shadow-xl">
      <p className="font-semibold text-slate-200 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}%</p>
      ))}
    </div>
  );
}

const USAGE_LEVELS: UsageLevel[] = ["Light", "Moderate", "Intensive"];
type NonAllGroup = Exclude<StudentGroup, "All Students">;

export function ImpactDashboard({ onSaveScenario }: ImpactDashboardProps) {
  const [year, setYear]           = useState("2024–25");
  const [district, setDistrict]   = useState("Houston ISD");
  const [campus, setCampus]       = useState("All Campuses");
  const [grade, setGrade]         = useState("All");
  const [subject, setSubject]     = useState("Reading Language Arts");
  const [selectedGroups, setSelectedGroups] = useState<StudentGroup[]>(["All Students"]);
  const [studentCount, setStudentCount] = useState(5000);
  const [usageLevel, setUsageLevel]     = useState<UsageLevel>("Moderate");
  const [customImprove, setCustomImprove] = useState(6.5);
  const [useCustom, setUseCustom] = useState(false);
  const [savedMsg, setSavedMsg]   = useState(false);
  const idRef = useRef(0);

  const districtEntry = districtData.find((d) => d.district === district && d.year === year);

  // Campus-level override when a specific campus is selected
  const campusEntry = campusData.find((c) => c.campus === campus && c.district === district && c.year === year);

  // Resolve which groups to show; when "All Students" is active show every non-All group
  const showAllGroups = selectedGroups.includes("All Students");
  const activeGroups: StudentGroup[] = showAllGroups
    ? ALL_GROUPS.filter((g) => g !== "All Students")
    : selectedGroups;

  // ── Derived filter keys ────────────────────────────────────────────────────
  const normYear = normalizeYear(year);
  const gradeKey2 = grade === "All" ? "All" : grade;

  // ── Filtered total students ──────────────────────────────────────────────
  // Priority: campus > demographic+grade > grade > district
  const filteredTotalStudents = (() => {
    // Campus selected
    if (campusEntry) {
      if (!showAllGroups) {
        const allPct = campusEntry.studentGroups["All Students"] || 1;
        return Math.round(
          activeGroups.reduce((sum, g) => {
            const pct = campusEntry.studentGroups[g] ?? 0;
            return sum + Math.round((pct / allPct) * campusEntry.totalStudents);
          }, 0)
        );
      }
      return campusEntry.totalStudents;
    }
    // Demographic filter — sum matching records (year-aware, with grade if set)
    if (!showAllGroups) {
      const matched = literacyRecords.filter(
        (r) => r.district === district &&
               normalizeYear(r.year) === normYear &&
               r.grade === gradeKey2 &&
               activeGroups.includes(r.group as StudentGroup)
      );
      // Fall back to any-year match if no year-specific record exists
      const fallback = matched.length > 0 ? matched : literacyRecords.filter(
        (r) => r.district === district &&
               r.grade === gradeKey2 &&
               activeGroups.includes(r.group as StudentGroup)
      );
      if (fallback.length > 0) return fallback.reduce((s, r) => s + r.totalStudents, 0);
    }
    // Grade filter — year-aware lookup first, then any-year
    if (grade !== "All") {
      const gradeRec =
        literacyRecords.find(
          (r) => r.district === district && normalizeYear(r.year) === normYear &&
                 r.grade === grade && r.group === "All Students"
        ) ??
        literacyRecords.find(
          (r) => r.district === district && r.grade === grade && r.group === "All Students"
        );
      if (gradeRec) return gradeRec.totalStudents;
    }
    // District total
    return districtEntry?.totalStudents ?? 195000;
  })();

  // When specific groups selected, compute their avg proficiency (year+grade aware)
  let demographicBaseline: number | null = null;
  if (!showAllGroups && activeGroups.length > 0) {
    const vals = campusEntry
      ? activeGroups.map((g) => campusEntry.studentGroups[g] ?? 0).filter(Boolean)
      : (() => {
          const recs = literacyRecords.filter(
            (r) => r.district === district &&
                   normalizeYear(r.year) === normYear &&
                   r.grade === gradeKey2 &&
                   activeGroups.includes(r.group as StudentGroup)
          );
          const fallback = recs.length > 0 ? recs : literacyRecords.filter(
            (r) => r.district === district && r.grade === gradeKey2 &&
                   activeGroups.includes(r.group as StudentGroup)
          );
          return fallback.map((r) => r.proficiencyPercent);
        })();
    if (vals.length > 0) {
      demographicBaseline = Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
    }
  }

  // Grade filter: grade state is "All"/"3"/"4"... but staarRLA keys are "All Grades"/"Grade 3"/"Grade 4"...
  const gradeKey: GradeLevel = grade === "All" ? "All Grades" : (`Grade ${grade}` as GradeLevel);
  const gradeSpecificPercent = campusEntry
    ? campusEntry.staarRLA[gradeKey] || campusEntry.staarRLA["All Grades"]
    : (
        // year-aware lookup first, fall back to any-year
        literacyRecords.find(
          (r) => r.district === district && normalizeYear(r.year) === normYear &&
                 r.grade === gradeKey2 && r.group === "All Students" && r.subject === subject
        ) ??
        literacyRecords.find(
          (r) => r.district === district && r.grade === gradeKey2 && r.group === "All Students"
        )
      )?.proficiencyPercent;

  const baselinePercent = demographicBaseline ?? gradeSpecificPercent ?? districtEntry?.staarRLA ?? 44;

  // Improvement % from the projection calculator (used by both grade chart and group chart)
  const improvePct = useCustom
    ? customImprove
    : (USAGE_IMPROVEMENT[usageLevel].min + USAGE_IMPROVEMENT[usageLevel].max) / 2;

  // Group chart: always show ALL non-All-Students groups for full context
  const ALL_NONALL_GROUPS = ALL_GROUPS.filter((g): g is NonAllGroup => g !== "All Students");

  const groupChartData = campusEntry
    ? Object.entries(campusEntry.studentGroups)
        .filter(([g]) => ALL_NONALL_GROUPS.includes(g as NonAllGroup))
        .map(([g, v]) => {
          const before = Number(v);
          const after  = Math.min(100, parseFloat((before + improvePct).toFixed(1)));
          const highlighted = showAllGroups || activeGroups.includes(g as StudentGroup);
          return {
            group:     g.replace("Economically Disadvantaged", "Econ. Disadv."),
            before,
            after,
            highlighted,
          };
        })
        .sort((a, b) => b.before - a.before)
    : ALL_NONALL_GROUPS.flatMap((grp) => {
        const rec =
          literacyRecords.find(
            (r) => r.district === district && normalizeYear(r.year) === normYear &&
                   r.grade === gradeKey2 && r.group === grp
          ) ??
          literacyRecords.find(
            (r) => r.district === district && r.grade === gradeKey2 && r.group === grp
          );
        if (!rec) return [];
        const before = rec.proficiencyPercent;
        const after  = Math.min(100, parseFloat((before + improvePct).toFixed(1)));
        const highlighted = showAllGroups || activeGroups.includes(grp);
        return [{ group: grp.replace("Economically Disadvantaged", "Econ. Disadv."), before, after, highlighted }];
      })
      .sort((a, b) => b.before - a.before);

  // Clamp studentCount to filteredTotalStudents if it exceeds the filtered population
  const effectiveStudentCount = Math.min(studentCount, filteredTotalStudents);

  const projection = calcProjection(baselinePercent, effectiveStudentCount, usageLevel, useCustom ? customImprove : undefined);

  const avgLiteracy = baselinePercent;
  const studentsToImprove = projection.additionalStudents;
  const roi = (projection.projectedPercent / (baselinePercent || 1)).toFixed(2);

  // Build a human-readable context label for KPI subtitles
  const scopeLabel = (() => {
    const parts: string[] = [];
    if (campus !== "All Campuses") parts.push(campus);
    else parts.push(district);
    if (grade !== "All") parts.push(`Grade ${grade}`);
    if (!showAllGroups) {
      parts.push(selectedGroups.length === 1 ? selectedGroups[0] : `${selectedGroups.length} groups`);
    }
    return parts.join(" · ");
  })();

  // Grade chart — when campus is selected, use campus staarRLA; otherwise use literacyRecords
  const gradeChartDataWithProjection = [3, 4, 5, 6, 7, 8].map((g) => {
    const gKey: GradeLevel = `Grade ${g}` as GradeLevel;
    const campusVal = campusEntry ? (campusEntry.staarRLA[gKey] ?? campusEntry.staarRLA["All Grades"]) : undefined;
    // District baseline: year-aware, respects demographic if active
    const distRec =
      literacyRecords.find(
        (r) => r.district === district && normalizeYear(r.year) === normYear &&
               r.grade === String(g) &&
               r.group === (!showAllGroups && activeGroups.length === 1 ? activeGroups[0] : "All Students")
      ) ??
      literacyRecords.find(
        (r) => r.district === district && r.grade === String(g) && r.group === "All Students"
      );
    const stateRec =
      literacyRecords.find(
        (r) => r.district === "Texas Statewide" && normalizeYear(r.year) === normYear &&
               r.grade === String(g) && r.group === "All Students"
      ) ??
      literacyRecords.find(
        (r) => r.district === "Texas Statewide" && r.grade === String(g) && r.group === "All Students"
      );
    const distLabel = campus !== "All Campuses" ? campus.split(" ")[0] : district.replace(" ISD", "");
    const baseline = campusVal ?? distRec?.proficiencyPercent ?? baselinePercent - (5 - g);
    const projected = Math.min(100, parseFloat((baseline + improvePct).toFixed(1)));
    return {
      grade: `Grade ${g}`,
      [distLabel]: baseline,
      "After BeeSmart": projected,
      "TX State": stateRec?.proficiencyPercent ?? 48,
    };
  });

  const beforeAfterData = [
    { name: "Before BeeSmart", value: projection.baselinePercent },
    { name: "After BeeSmart",  value: projection.projectedPercent },
  ];

  const selectCls = "bg-slate-700/60 border border-slate-600 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer";

  function handleSave() {
    onSaveScenario({
      id: String(++idRef.current),
      name: `${district} — ${usageLevel} Use`,
      district,
      studentCount,
      usageLevel,
      baselinePercent,
      projectedPercent: projection.projectedPercent,
      additionalStudents: projection.additionalStudents,
      createdAt: new Date().toLocaleDateString(),
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">BeeSmart Literacy Impact Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Model literacy improvement outcomes using TEA/STAAR baseline data and BeeSmart usage projections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-medium">
            Projection Mode
          </span>
          <span className="text-xs text-slate-500">— Estimated Impact Scenario</span>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mr-1">Filters</span>
        <select className={selectCls} value={year} onChange={(e) => setYear(e.target.value)}>
          {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select className={selectCls} value={district} onChange={(e) => { setDistrict(e.target.value); setCampus("All Campuses"); }}>
          {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className={selectCls} value={campus}
          onChange={(e) => setCampus(e.target.value)}>
          <option value="All Campuses">All Campuses</option>
          {campusData
            .filter((c) => c.district === district && c.year === year)
            .map((c) => <option key={c.campus} value={c.campus}>{c.campus}</option>)
          }
        </select>
        <select className={selectCls} value={grade} onChange={(e) => setGrade(e.target.value)}>
          {["All", "3", "4", "5", "6", "7", "8"].map((g) => (
            <option key={g} value={g}>{g === "All" ? "All Grades" : `Grade ${g}`}</option>
          ))}
        </select>
        <select className={selectCls} value={subject} onChange={(e) => setSubject(e.target.value)}>
          {["Reading Language Arts", "Spelling", "Vocabulary"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <DemographicsDropdown selected={selectedGroups} onChange={setSelectedGroups} />
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Avg Spelling Literacy %</p>
          <p className="text-4xl font-black text-amber-400">{avgLiteracy}%</p>
          <p className="text-xs text-slate-500 mt-1">{scopeLabel} · {year}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge variant={avgLiteracy >= 50 ? "green" : avgLiteracy >= 40 ? "yellow" : "red"}>
              {avgLiteracy >= 50 ? "At/Above State" : "Below State Avg"}
            </Badge>
            {!showAllGroups && (
              <Badge variant="blue">
                {selectedGroups.length === 1 ? selectedGroups[0] : `${selectedGroups.length} Groups`}
              </Badge>
            )}
          </div>
        </Card>
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Students Possible to Improve</p>
          <p className="text-4xl font-black text-blue-400">+{formatNumber(studentsToImprove)}</p>
          <p className="text-xs text-slate-500 mt-1">Projected at {usageLevel} use · {formatNumber(effectiveStudentCount)} students</p>
          <Badge variant="blue" className="mt-2">Projected Gain</Badge>
        </Card>
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Total Students in Scope</p>
          <p className="text-4xl font-black text-slate-100">{formatNumber(filteredTotalStudents)}</p>
          <p className="text-xs text-slate-500 mt-1">{scopeLabel}</p>
          <Badge variant="gray" className="mt-2">
            {!showAllGroups ? "Demographic Subset" : campus !== "All Campuses" ? "Campus Total" : grade !== "All" ? `Grade ${grade} Total` : "District Total"}
          </Badge>
        </Card>
        <Card glow>
          <p className="text-xs text-slate-400 mb-1">Est. Grant ROI</p>
          <p className="text-4xl font-black text-emerald-400">{roi}x</p>
          <p className="text-xs text-slate-500 mt-1">Projected / Baseline proficiency ratio</p>
          <Badge variant="green" className="mt-2">Impact Multiplier</Badge>
        </Card>
      </div>

      {/* Projection Calculator + Before/After Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card glow>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Projection Calculator</CardTitle>
                <CardSubtitle>Adjust BeeSmart deployment assumptions</CardSubtitle>
              </div>
              <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                Estimated Impact Scenario
              </span>
            </div>
          </CardHeader>

          <div className="space-y-5">
            {/* Student slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Students Using BeeSmart</label>
                <input
                  type="number" min={100} max={filteredTotalStudents} step={Math.max(1, Math.round(filteredTotalStudents / 1000) * 10)}
                  value={effectiveStudentCount}
                  onChange={(e) => {
                    const v = Math.max(100, Math.min(filteredTotalStudents, Number(e.target.value)));
                    if (!isNaN(v)) setStudentCount(v);
                  }}
                  className="w-24 text-right text-amber-400 font-bold text-sm bg-slate-700/60 border border-slate-600 rounded-lg px-2 py-0.5 focus:outline-none focus:border-amber-500"
                />
              </div>
              <input type="range" min={100} max={filteredTotalStudents} step={Math.max(1, Math.round(filteredTotalStudents / 1000) * 10)}
                value={effectiveStudentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full" />
              <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                <span>100</span><span>{formatNumber(filteredTotalStudents)}</span>
              </div>
            </div>

            {/* Current proficiency display */}
            <div className="flex items-center justify-between bg-slate-700/30 rounded-lg px-3 py-2.5">
              <span className="text-xs text-slate-400">Current Literacy Proficiency %</span>
              <span className="text-sm font-bold text-slate-200">{baselinePercent}%</span>
            </div>

            {/* Usage level */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">BeeSmart Usage Intensity</label>
              <div className="grid grid-cols-3 gap-2">
                {USAGE_LEVELS.map((lvl) => (
                  <button key={lvl} onClick={() => { setUsageLevel(lvl); setUseCustom(false); }}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                      usageLevel === lvl && !useCustom
                        ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                        : "bg-slate-700/40 border-slate-600 text-slate-400 hover:border-slate-500"
                    }`}>
                    <div>{lvl} Use</div>
                    <div className="text-[10px] opacity-70 mt-0.5">{USAGE_IMPROVEMENT[lvl].min}–{USAGE_IMPROVEMENT[lvl].max}%</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Improvement slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Improvement Assumption</label>
                <div className="flex items-center gap-1">
                  <span className="text-emerald-400 font-bold text-sm">+</span>
                  <input
                    type="number" min={0.5} max={30} step={0.5}
                    value={useCustom ? customImprove : Number(((USAGE_IMPROVEMENT[usageLevel].min + USAGE_IMPROVEMENT[usageLevel].max) / 2).toFixed(1))}
                    onChange={(e) => {
                      const v = Math.max(0.5, Math.min(30, Number(e.target.value)));
                      if (!isNaN(v)) { setCustomImprove(v); setUseCustom(true); }
                    }}
                    className="w-16 text-right text-emerald-400 font-bold text-sm bg-slate-700/60 border border-slate-600 rounded-lg px-2 py-0.5 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-emerald-400 font-bold text-sm">%</span>
                </div>
              </div>
              <input type="range" min={0.5} max={30} step={0.5}
                value={useCustom ? customImprove : (USAGE_IMPROVEMENT[usageLevel].min + USAGE_IMPROVEMENT[usageLevel].max) / 2}
                onChange={(e) => { setCustomImprove(Number(e.target.value)); setUseCustom(true); }}
                className="w-full" />
              <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                <span>0.5%</span><span>Custom: resets usage level selection</span><span>30%</span>
              </div>
            </div>

            {/* Result boxes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/40 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">Before BeeSmart</p>
                <p className="text-xl font-bold text-slate-300">{formatPercent(projection.baselinePercent)}</p>
                <p className="text-[10px] text-slate-500">{formatNumber(projection.baselineStudents)} students meeting standard</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
                <p className="text-xs text-amber-400 mb-1">After BeeSmart (Projected)</p>
                <p className="text-xl font-bold text-amber-300">{formatPercent(projection.projectedPercent)}</p>
                <p className="text-[10px] text-slate-500">{formatNumber(projection.projectedStudents)} students meeting standard</p>
              </div>
            </div>
            <div className="text-center bg-emerald-500/10 border border-emerald-500/20 rounded-lg py-2">
              <span className="text-xs text-slate-400">Additional Students Projected to Improve: </span>
              <span className="text-emerald-400 font-bold">+{formatNumber(projection.additionalStudents)}</span>
            </div>

            {/* Save scenario */}
            <button onClick={handleSave}
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-bold transition-colors">
              {savedMsg ? "✅ Scenario Saved!" : "💾 Save Scenario"}
            </button>
          </div>
        </Card>

        {/* Before vs After chart */}
        <Card>
          <CardHeader>
            <CardTitle>Before vs. After Projection</CardTitle>
            <CardSubtitle>Literacy proficiency % comparison</CardSubtitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={beforeAfterData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="value" name="Proficiency %" radius={[6, 6, 0, 0]}
                fill="#f5a800"
                label={{ position: "top", fill: "#94a3b8", fontSize: 13, fontWeight: "bold",
                  formatter: (v: unknown) => `${Number(v).toFixed(1)}%` }} />
            </BarChart>
          </ResponsiveContainer>

          {/* Summary table below chart */}
          <div className="mt-4 border-t border-slate-700/50 pt-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-1.5 px-2 text-slate-400">Metric</th>
                  <th className="text-right py-1.5 px-2 text-slate-400">Before</th>
                  <th className="text-right py-1.5 px-2 text-amber-400">After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                <tr>
                  <td className="py-1.5 px-2 text-slate-300">Students in Scenario</td>
                  <td className="py-1.5 px-2 text-right text-slate-300">{formatNumber(effectiveStudentCount)}</td>
                  <td className="py-1.5 px-2 text-right text-amber-300">{formatNumber(effectiveStudentCount)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 text-slate-300">Proficiency %</td>
                  <td className="py-1.5 px-2 text-right text-slate-300">{formatPercent(projection.baselinePercent)}</td>
                  <td className="py-1.5 px-2 text-right text-amber-300">{formatPercent(projection.projectedPercent)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 text-slate-300">Meeting Standard</td>
                  <td className="py-1.5 px-2 text-right text-slate-300">{formatNumber(projection.baselineStudents)}</td>
                  <td className="py-1.5 px-2 text-right text-amber-300">{formatNumber(projection.projectedStudents)}</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 text-slate-300">Additional Improved</td>
                  <td className="py-1.5 px-2 text-right text-slate-400">—</td>
                  <td className="py-1.5 px-2 text-right text-emerald-300 font-semibold">+{formatNumber(projection.additionalStudents)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Grade-level line chart + Student group bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Literacy % by Grade Level</CardTitle>
            <CardSubtitle>STAAR RLA proficiency vs. Texas state average by grade · {district}</CardSubtitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={gradeChartDataWithProjection} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="grade" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis domain={[20, 90]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
              <Line type="monotone" dataKey={campus !== "All Campuses" ? campus.split(" ")[0] : district.replace(" ISD", "")}
                stroke="#f5a800" strokeWidth={2.5} dot={{ fill: "#f5a800", r: 4 }}
                name={campus !== "All Campuses" ? campus.split(" ")[0] : district.replace(" ISD", "")} />
              <Line type="monotone" dataKey="After BeeSmart"
                stroke="#ef4444" strokeWidth={2.5} dot={{ fill: "#ef4444", r: 4 }}
                strokeDasharray="6 2" name="After BeeSmart (Projected)" />
              <Line type="monotone" dataKey="TX State"
                stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4 4" dot={{ fill: "#3b82f6", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proficiency by Student Group</CardTitle>
            <CardSubtitle>STAAR RLA % by demographic · {district} · {year}</CardSubtitle>
          </CardHeader>
          {groupChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={Math.max(260, groupChartData.length * 52)}>
              <BarChart data={groupChartData} layout="vertical" barCategoryGap="20%" barGap={3}
                margin={{ top: 5, right: 52, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="group" tick={{ fill: "#94a3b8", fontSize: 10 }} width={100} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-xs shadow-xl">
                        <p className="font-semibold text-slate-200 mb-1">{label}</p>
                        {payload.map((p) => (
                          <p key={p.name} style={{ color: p.color ?? "#94a3b8" }}>
                            {p.name}: {p.value}%
                            {p.name === "After BeeSmart" && typeof p.payload?.before === "number"
                              ? ` (+${(Number(p.value) - p.payload.before).toFixed(1)}pp)`
                              : ""}
                          </p>
                        ))}
                      </div>
                    );
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
                  formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>}
                />
                <ReferenceLine x={baselinePercent} stroke="#f5a800" strokeDasharray="4 4"
                  label={{ value: "Dist Avg", fill: "#f5a800", fontSize: 9, position: "top" }} />
                <Bar dataKey="before" name="Before BeeSmart" radius={[0, 3, 3, 0]}
                  label={{ position: "right", fill: "#94a3b8", fontSize: 9, formatter: (v: unknown) => `${v}%` }}
                  shape={(props: { x?: number; y?: number; width?: number; height?: number; index?: number }) => {
                    const { x = 0, y = 0, width = 0, height = 0, index = 0 } = props;
                    const entry = groupChartData[index];
                    const hi = entry?.highlighted ?? true;
                    return <rect x={x} y={y} width={width} height={height} fill={hi ? "#f5a800" : "#1e3a5f"} opacity={hi ? 1 : 0.45} rx={3} ry={3} />;
                  }}
                />
                <Bar dataKey="after" name="After BeeSmart" radius={[0, 3, 3, 0]}
                  label={{ position: "right", fill: "#10b981", fontSize: 9, fontWeight: "bold", formatter: (v: unknown) => `${v}%` }}
                  shape={(props: { x?: number; y?: number; width?: number; height?: number; index?: number }) => {
                    const { x = 0, y = 0, width = 0, height = 0, index = 0 } = props;
                    const entry = groupChartData[index];
                    const hi = entry?.highlighted ?? true;
                    return <rect x={x} y={y} width={width} height={height} fill={hi ? "#10b981" : "#064e3b"} opacity={hi ? 1 : 0.45} rx={3} ry={3} />;
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-500 text-sm">
              No student group data for this district/year
            </div>
          )}
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl px-5 py-3">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-400">Important:</span> All projections use configurable intervention assumptions and are not guaranteed outcomes.
          Data sources: TEA TAPR, STAAR Aggregate, HISD Reports, NAEP. BeeSmart pilot data will replace assumptions once available.
          These projections are for grant planning and school program evaluation purposes only.
        </p>
      </div>
    </div>
  );
}
