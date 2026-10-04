import React, { useState } from "react";
import { ChevronDown, ChevronUp, Lock, Copy, Check } from "lucide-react";

export function ApiList({ apis = [] }) {
  const [expandedApi, setExpandedApi] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  if (!apis || apis.length === 0) {
    return (
      <div className="p-8 text-center bg-[#0d121f] rounded-xl border border-slate-800 text-slate-400 text-sm">
        No API endpoints available.
      </div>
    );
  }

  const toggleExpand = (id) => {
    setExpandedApi((prev) => (prev === id ? null : id));
  };

  const handleCopyEndpoint = (id, endpoint) => {
    navigator.clipboard?.writeText(endpoint);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const methodBadges = {
    GET: "bg-sky-950/60 text-sky-400 border-sky-500/40",
    POST: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40",
    PUT: "bg-amber-950/60 text-amber-400 border-amber-500/40",
    DELETE: "bg-rose-950/60 text-rose-400 border-rose-500/40",
    PATCH: "bg-purple-950/60 text-purple-400 border-purple-500/40"
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-white tracking-tight">REST API Endpoint Specification</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Complete interface contracts including HTTP verbs, authorization requirements, and payload models.
        </p>
      </div>

      <div className="space-y-2.5">
        {apis.map((api) => {
          const isExpanded = expandedApi === api.id;
          const badgeClass = methodBadges[api.method] || "bg-slate-800 text-slate-300 border-slate-700";

          return (
            <div
              key={api.id || api.endpoint}
              className="rounded-xl border border-slate-800 bg-[#0d121f] overflow-hidden transition-all hover:border-slate-700"
            >
              {/* API Header Bar */}
              <div
                onClick={() => toggleExpand(api.id)}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 cursor-pointer hover:bg-slate-900/40 transition-colors gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${badgeClass}`}>
                    {api.method}
                  </span>

                  <span className="font-mono text-xs sm:text-sm font-semibold text-slate-200 truncate">
                    {api.endpoint}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyEndpoint(api.id, api.endpoint);
                    }}
                    className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
                    title="Copy path"
                  >
                    {copiedId === api.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="truncate text-slate-400">{api.description}</span>
                  {api.authRequired && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded font-medium">
                      <Lock className="w-3 h-3" />
                      <span>Auth</span>
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-4 border-t border-slate-800 bg-slate-900/30 space-y-3 text-xs">
                  {api.requestBody && (
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Request Body Sample:
                      </span>
                      <pre className="p-2.5 rounded-lg bg-black/40 border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto">
                        {typeof api.requestBody === "string"
                          ? api.requestBody
                          : JSON.stringify(api.requestBody, null, 2)}
                      </pre>
                    </div>
                  )}

                  {api.responseSample && (
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Response Payload ({api.responseStatus || 200}):
                      </span>
                      <pre className="p-2.5 rounded-lg bg-black/40 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                        {typeof api.responseSample === "string"
                          ? api.responseSample
                          : JSON.stringify(api.responseSample, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApiList;
