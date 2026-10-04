import React, { useState, useEffect } from "react";
import {
  Loader2,
  Sparkles,
  Database,
  Layers,
  Network,
  Cpu,
  CheckCircle2,
  Server,
  Cloud,
  Code2
} from "lucide-react";

export function Loader({
  message = "Loading...",
  subMessage = "",
  size = "md",
  isAIGeneration = false,
  className = ""
}) {
  const steps = [
    {
      number: "1",
      title: "1. Project Scope & Domain Architecture",
      icon: Sparkles,
      desc: "Analyzing project description, scale constraints, domain boundaries, and visual theme"
    },
    {
      number: "2",
      title: "2. Domain Functional Modules",
      icon: Layers,
      desc: "Synthesizing domain-specific core services, processing pipelines, and user role modules"
    },
    {
      number: "3",
      title: "3. Bespoke Database Schema",
      icon: Database,
      desc: "Structuring primary domain tables, relational or time-series keys, and indexing strategy"
    },
    {
      number: "4",
      title: "4. Specialized API Specifications",
      icon: Code2,
      desc: "Specifying REST / gRPC endpoints, payloads, HTTP verbs, and security authorizations"
    },
    {
      number: "5",
      title: "5. System Topology & Protocol Flow",
      icon: Network,
      desc: "Connecting gateways, load balancers, event brokers (Kafka/RabbitMQ), and database clusters"
    },
    {
      number: "6",
      title: "6. Tailored Technology Stack",
      icon: Cpu,
      desc: "Selecting purpose-built frameworks (Rust/Go/Node/Python, PostgreSQL/TimescaleDB/ClickHouse)"
    },
    {
      number: "7",
      title: "7. AI Recommendations & Hardening",
      icon: Server,
      desc: "Formulating low-latency caching, event-driven pub/sub, zero-trust security, and resilience"
    },
    {
      number: "8",
      title: "8. Cloud Deployment & Orchestration",
      icon: Cloud,
      desc: "Architecting cloud infrastructure (K8s, serverless containers, edge CDN, and CI/CD pipelines)"
    }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!isAIGeneration) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(interval);
  }, [isAIGeneration]);

  if (isAIGeneration) {
    const currentStep = steps[currentStepIndex];
    const StepIcon = currentStep.icon;
    const percent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

    return (
      <div className={`w-full max-w-3xl mx-auto p-4 sm:p-6 ${className}`}>
        {/* Header Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 mb-3 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <StepIcon className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Synthesizing System Architecture Blueprint
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
            StackFlow AI is engineering the 8 technical architecture dimensions matching your requirements.
          </p>

          {/* Progress bar */}
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-indigo-400">Generation Progress</span>
              <span className="text-slate-300">{percent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-300 shadow-sm"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 8-Step Grid matching the 8 Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#0d121f] p-4 rounded-xl border border-slate-800">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const IconComponent = step.icon;

            return (
              <div
                key={step.title}
                className={`p-3 rounded-lg border transition-all flex items-start gap-3 ${
                  isCompleted
                    ? "bg-emerald-950/20 border-emerald-500/30 text-slate-300"
                    : isCurrent
                    ? "bg-indigo-950/30 border-indigo-500/50 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30"
                    : "bg-[#111726]/50 border-slate-800/80 text-slate-500 opacity-60"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 text-[9px] flex items-center justify-center text-slate-500 font-mono">
                      {step.number}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-semibold truncate ${isCurrent ? "text-indigo-300" : ""}`}>
                    {step.title}
                  </p>
                  <p className="text-[10.5px] text-slate-400 mt-0.5 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const spinnerSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10"
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 gap-3 text-center ${className}`}>
      <Loader2 className={`${spinnerSizes[size] || spinnerSizes.md} animate-spin text-indigo-400`} />
      {message && <p className="text-sm font-medium text-slate-200">{message}</p>}
      {subMessage && <p className="text-xs text-slate-400">{subMessage}</p>}
    </div>
  );
}

export default Loader;
