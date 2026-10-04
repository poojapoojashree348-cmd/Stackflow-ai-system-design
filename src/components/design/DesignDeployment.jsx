import React from "react";
import { Rocket, GitBranch, Box, Cloud, Activity } from "lucide-react";

export function DesignDeployment({ deployment = [] }) {
  if (!deployment || deployment.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
        No deployment pipeline details available.
      </div>
    );
  }

  const stageIcons = {
    Development: Box,
    GitHub: GitBranch,
    Build: Box,
    Deployment: Cloud,
    Production: Activity
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">CI/CD & Deployment Pipeline</h3>
        <p className="text-xs text-slate-500 mt-1">
          Automated stages for linting, testing, multi-stage container builds, and zero-downtime production deployment.
        </p>
      </div>

      <div className="space-y-4">
        {deployment.map((dep, idx) => {
          const Icon = stageIcons[dep.stage] || Rocket;

          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-indigo-200 transition-colors gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                      Phase 0{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{dep.step}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{dep.details}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  {dep.tool}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DesignDeployment;
