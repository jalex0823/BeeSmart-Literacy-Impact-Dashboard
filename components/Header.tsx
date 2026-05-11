"use client";

export function Header() {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-xl font-black text-slate-900 yellow-glow">
            🐝
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 leading-none">
              BeeSmart
              <span className="text-amber-400 ml-1">Literacy Impact</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs text-amber-300 font-medium">Projection Mode</span>
          </div>
          <div className="text-xs text-slate-500 hidden lg:block">
            Data: TEA TAPR · STAAR · HISD · NAEP
          </div>
        </div>
      </div>
    </header>
  );
}
