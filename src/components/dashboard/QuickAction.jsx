import React from "react";
import { ChevronRight } from "lucide-react";

export function QuickAction({
  title,
  description,
  icon: Icon,
  onClick,
  color = "indigo"
}) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
  };

  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-indigo-200 hover:shadow-md transition-all text-left"
    >
      <div className="flex items-center gap-3.5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${colorMap[color] || colorMap.indigo}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{description}</p>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
    </button>
  );
}

export default QuickAction;
