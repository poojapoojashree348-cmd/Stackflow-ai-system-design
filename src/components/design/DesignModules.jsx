import React from "react";
import { Layers, CheckCircle2 } from "lucide-react";

export function DesignModules({ modules }) {
  // Normalize modules into an array
  let modulesList = [];
  if (Array.isArray(modules)) {
    modulesList = modules;
  } else if (modules && typeof modules === "object") {
    modulesList = Object.entries(modules).map(([key, value]) => {
      if (Array.isArray(value)) {
        return {
          name: `${key.charAt(0).toUpperCase() + key.slice(1)} Module`,
          responsibilities: value,
          description: `Key functional capabilities for ${key}`
        };
      }
      return {
        name: value.name || key,
        description: value.description,
        responsibilities: value.responsibilities || value.features || []
      };
    });
  }

  if (modulesList.length === 0) {
    return (
      <div className="p-8 text-center bg-[#0d121f] rounded-xl border border-slate-800 text-slate-400 text-sm">
        No functional modules specified.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-white tracking-tight">Functional Modules & Services</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Decomposition of system capabilities into decoupled bounded contexts and service domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {modulesList.map((mod, idx) => (
          <div
            key={mod.name || idx}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0d121f] p-4 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-semibold text-white truncate">{mod.name}</h4>
              </div>

              {mod.description && (
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{mod.description}</p>
              )}
            </div>

            {mod.responsibilities && mod.responsibilities.length > 0 && (
              <div className="pt-3 border-t border-slate-800/80 bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Domain Responsibilities:
                </span>
                <ul className="space-y-1.5">
                  {mod.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignModules;
