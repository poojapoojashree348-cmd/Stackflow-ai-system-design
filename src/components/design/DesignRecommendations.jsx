import React from "react";
import { ShieldCheck, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { getPriorityBadgeClass } from "../../utils/helpers.js";

export function DesignRecommendations({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="p-8 text-center bg-[#0d121f] rounded-xl border border-slate-800 text-slate-400 text-sm">
        No recommendations generated.
      </div>
    );
  }

  const categoryIcons = {
    Security: ShieldCheck,
    Performance: AlertTriangle,
    Architecture: Info,
    Scalability: CheckCircle,
    Development: Info
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-white tracking-tight">Architectural & Operational Recommendations</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Best practices for production security, latency optimization, and distributed failure tolerance.
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => {
          const Icon = categoryIcons[rec.category] || ShieldCheck;

          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-[#0d121f] p-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{rec.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                    {rec.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getPriorityBadgeClass(
                      rec.priority
                    )}`}
                  >
                    {rec.priority} Priority
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 pl-9 leading-relaxed">{rec.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DesignRecommendations;
