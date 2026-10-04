import React, { useState } from "react";
import {
  Network,
  Server,
  Layers,
  Database,
  Cpu,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Info
} from "lucide-react";

export function ArchitectureCanvas({ architecture }) {
  const [selectedNode, setSelectedNode] = useState(null);

  if (!architecture || !architecture.components) {
    return (
      <div className="p-8 text-center bg-[#0d121f] rounded-xl border border-slate-800 text-slate-400 text-sm">
        No architecture data available.
      </div>
    );
  }

  const layerIcons = {
    Client: Globe,
    Gateway: Shield,
    Service: Server,
    Database: Database,
    AI: Cpu,
    Cache: Zap,
    Queue: Layers
  };

  const layerColors = {
    Client: "border-sky-500/40 bg-sky-950/40 text-sky-400",
    Gateway: "border-purple-500/40 bg-purple-950/40 text-purple-400",
    Service: "border-indigo-500/40 bg-indigo-950/40 text-indigo-400",
    Database: "border-emerald-500/40 bg-emerald-950/40 text-emerald-400",
    AI: "border-amber-500/40 bg-amber-950/40 text-amber-400",
    Cache: "border-rose-500/40 bg-rose-950/40 text-rose-400",
    Queue: "border-cyan-500/40 bg-cyan-950/40 text-cyan-400"
  };

  const activeNode = architecture.components.find((c) => c.id === selectedNode) || architecture.components[0];

  return (
    <div className="space-y-6">
      {/* Pattern Banner */}
      <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <Network className="w-4 h-4" />
          <span>System Topology & Design Pattern</span>
        </div>
        <h3 className="text-base font-bold text-white tracking-tight">
          {architecture.pattern || "Distributed Microservices Architecture"}
        </h3>
      </div>

      {/* Visual Canvas Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Component Topology Nodes */}
        <div className="lg:col-span-8 bg-[#0d121f] border border-slate-800 rounded-xl p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">
            Component Hierarchy (Click node to inspect)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {architecture.components.map((comp) => {
              const Icon = layerIcons[comp.layer] || Server;
              const isSelected = activeNode?.id === comp.id;
              const colorClass = layerColors[comp.layer] || "border-slate-700 bg-slate-800 text-slate-300";

              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedNode(comp.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "ring-2 ring-indigo-500 bg-slate-900 border-indigo-500 shadow-md"
                      : "bg-[#121826] border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-white truncate">{comp.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${colorClass}`}>
                      {comp.layer}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {comp.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-indigo-400 text-[10px]">{comp.technology}</span>
                    <span className="text-slate-500 text-[10px]">Tier {comp.tier || 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Inspector */}
        <div className="lg:col-span-4 bg-[#0d121f] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span>Component Inspector</span>
            </div>

            {activeNode ? (
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-base font-bold text-white">{activeNode.name}</h4>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold border bg-indigo-950/40 text-indigo-300 border-indigo-500/30">
                    {activeNode.layer} Layer
                  </span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  {activeNode.description}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Technology:</span>
                    <span className="font-mono text-indigo-300">{activeNode.technology || "Node.js"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Protocol:</span>
                    <span className="font-mono text-slate-200">{activeNode.protocol || "HTTP/REST / gRPC"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Scalability:</span>
                    <span className="text-slate-200">{activeNode.scalability || "Horizontal auto-scale"}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Select any component to view detailed specifications.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchitectureCanvas;
