import React from "react";
import { UserCheck, Shield, Server, Database, ArrowDown, ArrowRight, Zap } from "lucide-react";

export function SystemFlow() {
  const steps = [
    {
      step: 1,
      title: "Client Trigger",
      desc: "User or Diner performs action (e.g. Scans QR or Submits Cart)",
      icon: UserCheck,
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      step: 2,
      title: "API Gateway & Auth",
      desc: "Nginx / Envoy terminates TLS, validates JWT tokens, and rate limits",
      icon: Shield,
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      step: 3,
      title: "Microservice Core",
      desc: "Node.js service executes business rules, state machine, and orchestrator",
      icon: Server,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      step: 4,
      title: "Persistence & Pub/Sub",
      desc: "PostgreSQL commits transaction; Redis emits WebSocket event to KDS",
      icon: Database,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      step: 5,
      title: "AI Synthesis & Async Alerts",
      desc: "Gemini AI analyzes telemetry and pushes predictive recommendations",
      icon: Zap,
      color: "bg-amber-50 text-amber-600 border-amber-200"
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="mb-6">
        <h4 className="text-base font-bold text-slate-900">End-to-End System Request Flow</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Step-by-step transaction lifecycle from initial client request to transactional database commit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;

          return (
            <div
              key={s.step}
              className="flex flex-col items-center text-center p-4 rounded-xl border border-slate-200/70 bg-slate-50/60 relative"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${s.color} mb-3 shadow-xs`}>
                <Icon className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                Step 0{s.step}
              </span>
              <h5 className="text-xs font-bold text-slate-900 mt-1 mb-1">{s.title}</h5>
              <p className="text-[11px] text-slate-500 leading-tight">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SystemFlow;
