import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import {
  Scale,
  ArrowRight,
  Sparkles,
  CheckCircle,
  XCircle,
  Server,
  Zap,
  DollarSign,
  Activity,
  Layers,
  Shield,
  Clock,
  ArrowLeft
} from "lucide-react";
import { foodDeliveryDesign } from "../data/dummyDesign.js";

const ARCHETYPE_PATTERNS = {
  microservices: {
    id: "microservices",
    name: "Distributed Microservices Architecture",
    description: "Independent loosely-coupled services communicating via REST/gRPC and Kafka event streams.",
    rps: "10,000 - 50,000+ RPS",
    latency: "< 70ms p95",
    cost: "$450 - $1,800 / mo",
    complexity: "High (Requires Kubernetes, service mesh, distributed tracing)",
    velocity: "Medium (Fast once team reaches scale, overhead initially)",
    blastRadius: "Low (Isolated service failure does not crash whole system)",
    dbStrategy: "Database-per-service (PostgreSQL + Redis)",
    spof: "Very Low (Redundant stateless pods and multi-AZ database)",
    pros: [
      "Independent deployments without global downtime",
      "Tailored scaling for high-traffic services",
      "Technology polyglot flexibility across services"
    ],
    cons: [
      "Complex distributed transactions (Saga pattern required)",
      "High operational DevOps overhead",
      "Cross-service network latency hops"
    ]
  },
  monolith: {
    id: "monolith",
    name: "Modular Monolith Architecture",
    description: "Single unified codebase with strictly isolated internal domain modules and single relational database.",
    rps: "2,000 - 8,000 RPS",
    latency: "< 35ms p95 (Zero inter-service network hops)",
    cost: "$120 - $350 / mo",
    complexity: "Low (Single Docker container, standard CI/CD, simple deployment)",
    velocity: "Very High for initial MVPs and small engineering teams",
    blastRadius: "High (Memory leaks or fatal crashes affect entire application)",
    dbStrategy: "Single shared ACID PostgreSQL database",
    spof: "Medium (Single application process failure)",
    pros: [
      "Extremely simple local development and debugging",
      "Instant ACID database joins with zero network latency",
      "Minimal cloud hosting costs and simple monitoring"
    ],
    cons: [
      "Cannot scale individual hot paths independently",
      "Deployments restart the entire service stack",
      "Risk of spaghetti code without strict module boundaries"
    ]
  },
  serverless: {
    id: "serverless",
    name: "Serverless Event-Driven (FaaS + EventBridge)",
    description: "Stateless ephemeral functions (AWS Lambda / Cloud Run) triggered by queues and API gateways.",
    rps: "1,000 - 100,000+ RPS (Near-infinite instantaneous burst)",
    latency: "80ms - 350ms p95 (Cold starts on unprimed instances)",
    cost: "Scale-to-zero ($15/mo dev up to pay-per-execution)",
    complexity: "Medium (Vendor lock-in, IAM permission policies)",
    velocity: "High (No server patching or OS provisioning needed)",
    blastRadius: "Very Low (Each invocation runs in isolated sandbox)",
    dbStrategy: "Managed DynamoDB / Aurora Serverless v2",
    spof: "Extremely Low (Managed multi-AZ cloud provider resilience)",
    pros: [
      "Zero idle costs during low or night-time traffic",
      "Automatic elastic scaling from 0 to 10,000 concurrent executions",
      "No OS security patching or cluster capacity planning"
    ],
    cons: [
      "Cold start latency spikes on infrequent endpoints",
      "Strict execution timeouts (e.g. 15 minute limit)",
      "Vendor lock-in to AWS/GCP proprietary event systems"
    ]
  }
};

export function CompareArchitecture() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { projects } = useProject();

  const initialProjectId = searchParams.get("project") || projects[0]?.id || "proj_food_delivery";
  const [leftProjectId, setLeftProjectId] = useState(initialProjectId);
  const [rightChoice, setRightChoice] = useState("monolith"); // "monolith" | "serverless" | "microservices" or a project id

  // Resolve left project
  const leftProject = projects.find((p) => p.id === leftProjectId) || {
    id: "proj_food_delivery",
    title: "Online Food Delivery System",
    description: "Cloud-native food delivery platform with customer mobile ordering, restaurant partner management, real-time courier tracking, and payment processing.",
    design: foodDeliveryDesign
  };

  // Resolve right side (either an archetype or another user project)
  const isRightArchetype = Object.keys(ARCHETYPE_PATTERNS).includes(rightChoice);
  const rightArchetype = isRightArchetype ? ARCHETYPE_PATTERNS[rightChoice] : null;
  const rightProject = !isRightArchetype ? projects.find((p) => p.id === rightChoice) : null;

  const leftStats = leftProject?.design?.systemStats || {
    estimatedRPS: "4,500 req/sec",
    latencyTarget: "< 90ms p95",
    scalabilityTier: "AWS ECS Cluster Auto-scaler"
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-indigo-400 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Architecture Comparator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950/70 border border-indigo-500/40 text-indigo-300">
              Side-by-Side Trade-off Matrix
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluate your synthesized system blueprint against alternative architecture paradigms or compare two project designs.
          </p>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0d121f] border border-slate-800 rounded-xl p-4 shadow-md">
        {/* Left Side Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Base Architecture (Left)
          </label>
          <select
            value={leftProjectId}
            onChange={(e) => setLeftProjectId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#121826] border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {projects.length > 0 ? (
              projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))
            ) : (
              <option value="proj_food_delivery">Online Food Delivery System (Sample)</option>
            )}
          </select>
        </div>

        {/* Right Side Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Benchmark Against (Right)
          </label>
          <select
            value={rightChoice}
            onChange={(e) => setRightChoice(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#121826] border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <optgroup label="Enterprise Architecture Paradigms">
              <option value="monolith">Modular Monolith Architecture</option>
              <option value="serverless">Serverless Event-Driven (Lambda / EventBridge)</option>
              <option value="microservices">Distributed Microservices Architecture</option>
            </optgroup>
            {projects.length > 1 && (
              <optgroup label="Compare with Another Project">
                {projects
                  .filter((p) => p.id !== leftProjectId)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      Project: {p.title}
                    </option>
                  ))}
              </optgroup>
            )}
          </select>
        </div>
      </div>

      {/* Comparison Scorecards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="rounded-xl border border-indigo-500/40 bg-[#0f1422] p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                Synthesized Project
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{leftProject.title}</h3>
            </div>
            <button
              onClick={() => navigate(`/projects/${leftProject.id}`)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {leftProject.description || "Microservices-based cloud platform with independent scaling and API gateway routing."}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>RPS Capacity</span>
              </span>
              <span className="font-mono font-bold text-white">{leftStats.estimatedRPS || "4,500 req/sec"}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>P95 Latency Target</span>
              </span>
              <span className="font-mono font-bold text-emerald-400">{leftStats.latencyTarget || "< 90ms p95"}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-400" />
                <span>Estimated Cloud Cost</span>
              </span>
              <span className="font-mono font-bold text-white">$240 - $680 / mo</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Database Strategy</span>
              </span>
              <span className="font-mono font-semibold text-slate-200 text-[11px]">
                {leftProject.design?.database?.databaseType || "PostgreSQL 16 + Redis"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>Single Point of Failure (SPOF)</span>
              </span>
              <span className="font-semibold text-emerald-400 text-xs">Low (Multi-AZ)</span>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="rounded-xl border border-slate-800 bg-[#0f1422] p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {isRightArchetype ? "Architectural Archetype" : "Comparison Project"}
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {rightArchetype?.name || rightProject?.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {rightArchetype?.description || rightProject?.description}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>RPS Capacity</span>
              </span>
              <span className="font-mono font-bold text-white">
                {rightArchetype?.rps || rightProject?.design?.systemStats?.estimatedRPS || "3,000 req/sec"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>P95 Latency Target</span>
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {rightArchetype?.latency || rightProject?.design?.systemStats?.latencyTarget || "< 80ms p95"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-400" />
                <span>Estimated Cloud Cost</span>
              </span>
              <span className="font-mono font-bold text-white">
                {rightArchetype?.cost || "$180 - $450 / mo"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Database Strategy</span>
              </span>
              <span className="font-mono font-semibold text-slate-200 text-[11px]">
                {rightArchetype?.dbStrategy || rightProject?.design?.database?.databaseType || "PostgreSQL 16"}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#121826] border border-slate-800/80 text-xs">
              <span className="text-slate-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Single Point of Failure (SPOF)</span>
              </span>
              <span className="font-semibold text-amber-400 text-xs">
                {rightArchetype?.spof || "Medium"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trade-offs & Pros/Cons Matrix (if Archetype selected) */}
      {rightArchetype && (
        <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Architectural Trade-Off Analysis: {rightArchetype.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Pros */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Key Advantages</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {rightArchetype.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 shrink-0 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Disadvantages & Constraints</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {rightArchetype.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 shrink-0 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareArchitecture;
