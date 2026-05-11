"use client";

import { researchStats } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ResearchPanel() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card glow className="col-span-full lg:col-span-1 bg-linear-to-br from-amber-500/10 to-slate-800/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">📊</div>
            <div>
              <p className="font-bold text-slate-100">NAEP National Benchmark</p>
              <p className="text-xs text-slate-400">U.S. Dept. of Education · 2024</p>
            </div>
          </div>
          <p className="text-5xl font-black text-amber-400 mb-1">~33%</p>
          <p className="text-sm text-slate-300">of U.S. 4th graders read <span className="text-red-400 font-semibold">below basic proficiency</span></p>
          <p className="text-xs text-slate-500 mt-3">Source: National Assessment of Educational Progress (NAEP) Reading Report Card</p>
        </Card>

        <Card className="bg-linear-to-br from-blue-500/10 to-slate-800/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">🎮</div>
            <div>
              <p className="font-bold text-slate-100">Gamification Impact</p>
              <p className="text-xs text-slate-400">EdTech Magazine / Education Week</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Student Engagement</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width: "47%" }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Traditional: 40–55%</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "82%" }} />
                  </div>
                  <p className="text-xs text-amber-400 mt-0.5">Gamified: 75–90%</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width: "65%" }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Completion: 60–70%</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "90%" }} />
                  </div>
                  <p className="text-xs text-emerald-400 mt-0.5">Gamified: 85–95%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-linear-to-br from-emerald-500/10 to-slate-800/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl">⏱️</div>
            <div>
              <p className="font-bold text-slate-100">Practice Time</p>
              <p className="text-xs text-slate-400">National Literacy Trust · 2023–24</p>
            </div>
          </div>
          <p className="text-5xl font-black text-emerald-400 mb-1">2–3×</p>
          <p className="text-sm text-slate-300">increase in <span className="text-emerald-400 font-semibold">voluntary practice time</span> with gamified learning</p>
          <p className="text-xs text-slate-500 mt-3">Students self-initiate more learning sessions vs. traditional drill methods</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Research Comparison — Traditional vs. Gamified Learning</CardTitle>
          <CardSubtitle>Evidence base supporting BeeSmart instructional approach</CardSubtitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2.5 px-3 text-slate-400 font-medium">Metric</th>
                <th className="text-center py-2.5 px-3 text-slate-400 font-medium">Traditional Methods</th>
                <th className="text-center py-2.5 px-3 text-amber-400 font-medium">Gamified Learning</th>
                <th className="text-left py-2.5 px-3 text-slate-400 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {researchStats.map((stat) => (
                <tr key={stat.label} className="hover:bg-slate-700/20 transition-colors">
                  <td className="py-2.5 px-3 text-slate-300 font-medium">{stat.label}</td>
                  <td className="py-2.5 px-3 text-center text-slate-400">{stat.traditional}</td>
                  <td className="py-2.5 px-3 text-center text-amber-300 font-semibold">{stat.gamified}</td>
                  <td className="py-2.5 px-3 text-xs text-slate-500">{stat.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Why Gamification Works</CardTitle>
            <CardSubtitle>Evidence-based instructional principles behind BeeSmart</CardSubtitle>
          </CardHeader>
          <div className="space-y-3">
            {[
              { icon: "⚡", title: "Immediate Reinforcement", desc: "Instant feedback improves memory retention, pattern recognition, and confidence development" },
              { icon: "🎯", title: "Goal-Oriented Progression", desc: "Unlockables and avatars create positive reinforcement loops and self-motivated learning" },
              { icon: "👁️", title: "Multisensory Learning", desc: "Visual + audio + interactive practice supports stronger literacy acquisition than single-method instruction" },
              { icon: "🛡️", title: "Reduced Learning Anxiety", desc: "Gamified systems lower fear of failure, allowing students to practice more frequently" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-3 rounded-lg bg-slate-700/30">
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>BeeSmart Features → Measurable Outcomes</CardTitle>
            <CardSubtitle>Feature-to-outcome mapping for grant documentation</CardSubtitle>
          </CardHeader>
          <div className="space-y-2">
            {[
              { feature: "Gamified Spelling Quizzes", outcome: "Engagement rate +35–50%", badge: "yellow" as const },
              { feature: "Voice Pronunciation System", outcome: "Phonetic/RLA score lift", badge: "blue" as const },
              { feature: "Teacher Progress Tracking", outcome: "Completion rate +25–35%", badge: "green" as const },
              { feature: "Daily Challenges", outcome: "Voluntary practice 2–3×", badge: "green" as const },
              { feature: "Classroom Competitions", outcome: "Participation rate increase", badge: "yellow" as const },
              { feature: "Avatar Reward System", outcome: "Retention & motivation boost", badge: "orange" as const },
              { feature: "Multi-format Word Import", outcome: "Teacher adoption ease", badge: "gray" as const },
            ].map((item) => (
              <div key={item.feature} className="flex items-center justify-between py-2 border-b border-slate-700/40 last:border-0">
                <span className="text-sm text-slate-300">{item.feature}</span>
                <Badge variant={item.badge}>{item.outcome}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
