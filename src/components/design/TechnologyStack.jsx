import React from "react";
import { Cpu, CheckCircle2 } from "lucide-react";

export function TechnologyStack({ technologyStack = [] }) {
  if (!technologyStack || technologyStack.length === 0) {
    return (
      <div className="p-8 text-center bg-[#0d121f] rounded-xl border border-slate-800 text-slate-400 text-sm">
        No technology stack data available.
      </div>
    );
  }

  const categoryColors = {
    Frontend: "bg-cyan-950/60 text-cyan-400 border-cyan-500/40",
    Backend: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40",
    Database: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40",
    Authentication: "bg-purple-950/60 text-purple-400 border-purple-500/40",
    Deployment: "bg-amber-950/60 text-amber-400 border-amber-500/40",
    Caching: "bg-rose-950/60 text-rose-400 border-rose-500/40"
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-white tracking-tight">Technology Stack & Architectural Choices</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Carefully selected languages, frameworks, databases, and deployment platforms justified by domain workload requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {technologyStack.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0d121f] p-4 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    categoryColors[item.category] || "bg-slate-800 text-slate-300 border-slate-700"
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-500">Tier 0{idx + 1}</span>
              </div>

              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{item.name}</span>
              </h4>

              <div className="mt-2.5 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  Justification:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{item.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnologyStack;
