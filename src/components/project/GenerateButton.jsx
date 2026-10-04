import React from "react";
import { Sparkles, Coins, AlertCircle } from "lucide-react";

export function GenerateButton({
  onClick,
  loading = false,
  credits = 85,
  disabled = false,
  className = ""
}) {
  const hasCredits = credits > 0;

  return (
    <div className="flex flex-col items-center gap-2.5">
      <button
        type="button"
        disabled={disabled || !hasCredits || loading}
        onClick={onClick}
        className={`w-full sm:w-auto min-w-[260px] py-3 px-6 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${className}`}
      >
        <Sparkles className="w-4 h-4 text-indigo-200" />
        <span>{loading ? "Synthesizing Architecture..." : "Generate System Design"}</span>
      </button>

      {/* Credit cost notice */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Coins className="w-3.5 h-3.5 text-amber-400" />
        <span>
          Cost: <strong className="text-slate-200">1 Credit</strong> (Balance:{" "}
          <span className={hasCredits ? "text-indigo-400 font-bold" : "text-rose-400 font-bold"}>
            {credits}
          </span>
          )
        </span>
      </div>

      {!hasCredits && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-500/30">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>You have 0 credits remaining. Please reset credits in Settings.</span>
        </div>
      )}
    </div>
  );
}

export default GenerateButton;
