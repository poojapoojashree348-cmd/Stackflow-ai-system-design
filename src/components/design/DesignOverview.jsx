import React from "react";
import { Sparkles, CheckCircle2, Gauge, Clock, Database, Server } from "lucide-react";
import SystemFlow from "./SystemFlow.jsx";

export function DesignOverview({ design }) {
  if (!design) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
        No design summary data available.
      </div>
    );
  }

  const stats = design.systemStats || {
    estimatedRPS: "1,500 req/sec",
    latencyTarget: "< 120ms p95",
    databaseSize: "250 GB/year",
    scalabilityTier: "Horizontal Auto-scaling"
  };

  return (
    <div className="space-y-6">
      {/* Summary Box */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Executive System Architecture Summary</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-normal">{design.summary}</p>
      </div>

      {/* System Engineering Metrics & SLA Targets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
            <Gauge className="w-3.5 h-3.5 text-indigo-600" />
            <span>Target Throughput</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{stats.estimatedRPS}</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Latency Target</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{stats.latencyTarget}</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
            <Database className="w-3.5 h-3.5 text-purple-600" />
            <span>DB Storage Volume</span>
          </div>
          <p className="text-base font-extrabold text-slate-900">{stats.databaseSize}</p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
            <Server className="w-3.5 h-3.5 text-amber-600" />
            <span>Scaling Architecture</span>
          </div>
          <p className="text-xs font-bold text-slate-900 truncate" title={stats.scalabilityTier}>
            {stats.scalabilityTier}
          </p>
        </div>
      </div>

      {/* Key Architectural Features */}
      {design.keyFeatures && design.keyFeatures.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 mb-3">Core Architectural Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {design.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-xs text-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Flow Diagram */}
      <SystemFlow />
    </div>
  );
}

export default DesignOverview;
