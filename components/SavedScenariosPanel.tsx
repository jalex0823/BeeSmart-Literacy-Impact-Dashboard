"use client";

import { SavedScenario } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatPercent } from "@/lib/utils";

interface SavedScenariosPanelProps {
  scenarios: SavedScenario[];
}

export function SavedScenariosPanel({ scenarios }: SavedScenariosPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Saved Scenarios</h1>
        <p className="text-sm text-slate-400 mt-1">
          Impact projections you have saved from the dashboard for grant documentation and comparison
        </p>
      </div>

      {scenarios.length === 0 ? (
        <Card>
          <div className="text-center py-16">
            <div className="text-5xl mb-4">💾</div>
            <p className="text-slate-300 font-semibold text-lg">No saved scenarios yet</p>
            <p className="text-slate-500 text-sm mt-2">
              Go to the Impact Dashboard, configure a projection, and click <span className="text-amber-400">Save Scenario</span>
            </p>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <p className="text-xs text-slate-400 mb-1">Scenarios Saved</p>
              <p className="text-3xl font-bold text-amber-400">{scenarios.length}</p>
            </Card>
            <Card>
              <p className="text-xs text-slate-400 mb-1">Total Students Modeled</p>
              <p className="text-3xl font-bold text-slate-100">
                {formatNumber(scenarios.reduce((s, r) => s + r.studentCount, 0))}
              </p>
            </Card>
            <Card>
              <p className="text-xs text-slate-400 mb-1">Total Additional Students</p>
              <p className="text-3xl font-bold text-emerald-400">
                +{formatNumber(scenarios.reduce((s, r) => s + r.additionalStudents, 0))}
              </p>
            </Card>
            <Card>
              <p className="text-xs text-slate-400 mb-1">Avg Projected Gain</p>
              <p className="text-3xl font-bold text-blue-400">
                +{formatPercent(
                  scenarios.reduce((s, r) => s + (r.projectedPercent - r.baselinePercent), 0) / scenarios.length
                )}
              </p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Saved Scenarios</CardTitle>
              <CardSubtitle>Use these for grant packet documentation and program comparisons</CardSubtitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2.5 px-3 text-slate-400 font-medium">Scenario Name</th>
                    <th className="text-left py-2.5 px-3 text-slate-400 font-medium">District</th>
                    <th className="text-right py-2.5 px-3 text-slate-400 font-medium">Students</th>
                    <th className="text-center py-2.5 px-3 text-slate-400 font-medium">Usage Level</th>
                    <th className="text-right py-2.5 px-3 text-slate-400 font-medium">Baseline</th>
                    <th className="text-right py-2.5 px-3 text-amber-400 font-medium">Projected</th>
                    <th className="text-right py-2.5 px-3 text-emerald-400 font-medium">+Students</th>
                    <th className="text-left py-2.5 px-3 text-slate-400 font-medium">Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {scenarios.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="py-2.5 px-3 text-slate-200 font-medium">{s.name}</td>
                      <td className="py-2.5 px-3 text-slate-400">{s.district}</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{formatNumber(s.studentCount)}</td>
                      <td className="py-2.5 px-3 text-center">
                        <Badge variant={s.usageLevel === "Intensive" ? "green" : s.usageLevel === "Moderate" ? "yellow" : "blue"}>
                          {s.usageLevel}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-400">{formatPercent(s.baselinePercent)}</td>
                      <td className="py-2.5 px-3 text-right text-amber-300 font-semibold">{formatPercent(s.projectedPercent)}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-300 font-semibold">+{formatNumber(s.additionalStudents)}</td>
                      <td className="py-2.5 px-3 text-slate-500 text-xs">{s.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
