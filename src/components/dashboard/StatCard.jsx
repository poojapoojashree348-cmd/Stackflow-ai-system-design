import React from "react";

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "indigo"
}) {
  const colorMap = {
    indigo: "bg-indigo-950/40 text-indigo-400 border-indigo-500/30",
    purple: "bg-purple-950/40 text-purple-400 border-purple-500/30",
    emerald: "bg-emerald-950/40 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-950/40 text-amber-400 border-amber-500/30"
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0f1422] p-4 sm:p-5 shadow-xs hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">{title}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${colorMap[color] || colorMap.indigo}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{value}</span>
        {subtitle && <span className="text-xs font-medium text-slate-400">{subtitle}</span>}
      </div>

      {trend && (
        <p className="mt-2 text-xs font-medium text-slate-400 flex items-center gap-1">
          {trend}
        </p>
      )}
    </div>
  );
}

export default StatCard;
