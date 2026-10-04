import React, { useState, useMemo } from "react";
import {
  Activity,
  Flame,
  Zap,
  Server,
  Database,
  Cpu,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Sliders,
  TrendingUp,
  Radio,
  Sparkles,
  ArrowRight
} from "lucide-react";

export function ResilienceSimulator({ project, design }) {
  // Simulator State
  const [rps, setRps] = useState(2500);
  const [activeUsers, setActiveUsers] = useState(50000);
  const [cacheDown, setCacheDown] = useState(false);
  const [dbFailover, setDbFailover] = useState(false);
  const [trafficSpike, setTrafficSpike] = useState(false);
  const [networkJitter, setNetworkJitter] = useState(false);

  // Dynamic calculations based on load & chaos toggles
  const metrics = useMemo(() => {
    let effectiveRps = trafficSpike ? rps * 3.5 : rps;
    let baseLatency = 45; // ms
    let baseErrorRate = 0.01; // %
    let baseCpu = 25; // %
    let basePods = Math.max(2, Math.ceil(effectiveRps / 1200));

    // Chaos penalties
    if (cacheDown) {
      baseLatency += 140;
      baseCpu += 40;
      baseErrorRate += 2.8;
    }

    if (dbFailover) {
      baseLatency += 320;
      baseCpu += 30;
      baseErrorRate += 8.5;
    }

    if (networkJitter) {
      baseLatency += 190;
      baseErrorRate += 1.5;
    }

    if (trafficSpike) {
      baseLatency += 80;
      baseCpu += 25;
      basePods = Math.min(64, basePods * 2.5);
    }

    // High RPS pressure
    if (effectiveRps > 15000) {
      const overage = (effectiveRps - 15000) / 10000;
      baseLatency += overage * 60;
      baseCpu += overage * 15;
      baseErrorRate += overage * 1.8;
      basePods += Math.ceil(overage * 6);
    }

    const finalLatency = Math.min(2500, Math.round(baseLatency));
    const finalCpu = Math.min(100, Math.round(baseCpu));
    const finalErrorRate = Math.min(100, parseFloat(baseErrorRate.toFixed(2)));
    const finalPods = Math.min(80, Math.max(2, Math.round(basePods)));

    let status = "OPTIMAL";
    let statusColor = "text-emerald-400 bg-emerald-950/70 border-emerald-500/40";
    let statusText = "System Operating within SLA limits";

    if (finalErrorRate > 5 || finalLatency > 600 || finalCpu > 90) {
      status = "CRITICAL";
      statusColor = "text-rose-400 bg-rose-950/70 border-rose-500/40 animate-pulse";
      statusText = "Circuit Breakers Active • Severe Degradation";
    } else if (finalErrorRate > 1 || finalLatency > 200 || finalCpu > 75) {
      status = "DEGRADED";
      statusColor = "text-amber-400 bg-amber-950/70 border-amber-500/40";
      statusText = "Elevated latency • Auto-scaler responding";
    }

    return {
      effectiveRps,
      latency: finalLatency,
      cpu: finalCpu,
      errorRate: finalErrorRate,
      pods: finalPods,
      status,
      statusColor,
      statusText
    };
  }, [rps, activeUsers, cacheDown, dbFailover, trafficSpike, networkJitter]);

  const handleReset = () => {
    setRps(2500);
    setActiveUsers(50000);
    setCacheDown(false);
    setDbFailover(false);
    setTrafficSpike(false);
    setNetworkJitter(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-[#0f1422] to-slate-900/80 p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950/70 border border-indigo-500/40 text-indigo-300">
            <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Interactive Chaos Engineering Lab</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Traffic & Resilience Simulator
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Stress-test this system architecture in real-time. Inject synthetic failure modes, adjust concurrency loads,
            and observe latency budgets, error rates, and automated container auto-scaling behavior.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="shrink-0 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-slate-700/80 transition-all cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Laboratory</span>
        </button>
      </div>

      {/* Main Grid: Controls & Chaos Injection on Left, Real-Time HUD on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Workload Sliders Card */}
          <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-5 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Synthetic Inbound Load</span>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                {metrics.effectiveRps.toLocaleString()} RPS
              </span>
            </div>

            {/* RPS Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Target Request Throughput</span>
                <span className="text-indigo-400 font-mono font-semibold">{rps.toLocaleString()} req/s</span>
              </div>
              <input
                type="range"
                min="100"
                max="30000"
                step="250"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>100 RPS (Dev)</span>
                <span>10k RPS</span>
                <span>30k RPS (Peak)</span>
              </div>
            </div>

            {/* Active Users Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Simulated Daily Active Users (DAU)</span>
                <span className="text-indigo-400 font-mono font-semibold">{activeUsers.toLocaleString()} DAU</span>
              </div>
              <input
                type="range"
                min="1000"
                max="500000"
                step="5000"
                value={activeUsers}
                onChange={(e) => setActiveUsers(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>1,000 DAU</span>
                <span>250,000 DAU</span>
                <span>500,000 DAU</span>
              </div>
            </div>
          </div>

          {/* Chaos Fault Injection Card */}
          <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-5 shadow-md space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Chaos Engineering Triggers</span>
            </span>

            {/* Chaos 1: Redis Crash */}
            <div
              onClick={() => setCacheDown(!cacheDown)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                cacheDown
                  ? "bg-rose-950/40 border-rose-500/60 ring-1 ring-rose-500/30"
                  : "bg-[#121826] border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    cacheDown ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Redis Cache Stampede</p>
                  <p className="text-[11px] text-slate-400">Simulate 100% cache miss forcing direct DB queries</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  cacheDown ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                {cacheDown ? "CRASHED" : "HEALTHY"}
              </span>
            </div>

            {/* Chaos 2: DB Failover */}
            <div
              onClick={() => setDbFailover(!dbFailover)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                dbFailover
                  ? "bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/30"
                  : "bg-[#121826] border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    dbFailover ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Primary DB Replica Promotion</p>
                  <p className="text-[11px] text-slate-400">Simulates RDS Multi-AZ failover election lag</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  dbFailover ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                {dbFailover ? "FAILOVER" : "STANDBY"}
              </span>
            </div>

            {/* Chaos 3: Flash Traffic Surge */}
            <div
              onClick={() => setTrafficSpike(!trafficSpike)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                trafficSpike
                  ? "bg-purple-950/40 border-purple-500/60 ring-1 ring-purple-500/30"
                  : "bg-[#121826] border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    trafficSpike ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Viral Flash Surge (3.5x)</p>
                  <p className="text-[11px] text-slate-400">Tests rapid HPA container scale-out reaction</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  trafficSpike ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                {trafficSpike ? "ACTIVE" : "OFF"}
              </span>
            </div>

            {/* Chaos 4: Network Jitter */}
            <div
              onClick={() => setNetworkJitter(!networkJitter)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                networkJitter
                  ? "bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/30"
                  : "bg-[#121826] border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    networkJitter ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Cross-AZ Latency (+190ms)</p>
                  <p className="text-[11px] text-slate-400">Degraded network switches and packet drops</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  networkJitter ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                {networkJitter ? "JITTER" : "LOW"}
              </span>
            </div>
          </div>
        </div>

        {/* Real-time HUD Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Health Status Banner */}
          <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-5 shadow-md flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                System Telemetry & Health Status
              </span>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${metrics.statusColor}`}>
                  {metrics.status}
                </span>
                <span className="text-xs font-medium text-slate-300">{metrics.statusText}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 block font-mono">Simulated Pods</span>
              <span className="text-xl font-bold font-mono text-white">{metrics.pods} replicas</span>
            </div>
          </div>

          {/* 4 Telemetry Gauges Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* P95 Latency */}
            <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>P95 End-to-End Latency</span>
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-2xl font-bold font-mono ${
                    metrics.latency > 500
                      ? "text-rose-400"
                      : metrics.latency > 150
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                >
                  {metrics.latency}ms
                </span>
                <span className="text-[10px] text-slate-500 font-mono">target &lt;100ms</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    metrics.latency > 500 ? "bg-rose-500" : metrics.latency > 150 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(100, (metrics.latency / 1000) * 100)}%` }}
                />
              </div>
            </div>

            {/* Error Rate */}
            <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>HTTP 5xx Error Rate</span>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-2xl font-bold font-mono ${
                    metrics.errorRate > 3
                      ? "text-rose-400"
                      : metrics.errorRate > 0.5
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                >
                  {metrics.errorRate}%
                </span>
                <span className="text-[10px] text-slate-500 font-mono">SLA &lt;0.05%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    metrics.errorRate > 3 ? "bg-rose-500" : metrics.errorRate > 0.5 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(100, metrics.errorRate * 10)}%` }}
                />
              </div>
            </div>

            {/* CPU Utilization */}
            <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Cluster CPU Load</span>
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-2xl font-bold font-mono ${
                    metrics.cpu > 80 ? "text-rose-400" : metrics.cpu > 60 ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {metrics.cpu}%
                </span>
                <span className="text-[10px] text-slate-500 font-mono">threshold 75%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    metrics.cpu > 80 ? "bg-rose-500" : metrics.cpu > 60 ? "bg-amber-500" : "bg-indigo-500"
                  }`}
                  style={{ width: `${metrics.cpu}%` }}
                />
              </div>
            </div>

            {/* Container Scaling */}
            <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Auto-Scaler HPA</span>
                <Server className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-white">
                  {metrics.pods}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">of 64 max nodes</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (metrics.pods / 64) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Resilience Recommendations & Diagnostics */}
          <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-5 space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Architectural Diagnostics & Failure Mitigation</span>
            </span>

            <div className="space-y-2 text-xs">
              {cacheDown && (
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-200 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Cache Stampede Detected:</span> Direct database query flood.
                    <p className="text-[11px] text-rose-300/80 mt-0.5">
                      Mitigation: Implement probabilistic early cache recomputation (XFetch algorithm) or a distributed Redis Cluster with auto-failover read replicas.
                    </p>
                  </div>
                </div>
              )}

              {dbFailover && (
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200 flex items-start gap-2.5">
                  <Database className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">DB Failover Lag:</span> Replication heartbeat paused write requests.
                    <p className="text-[11px] text-amber-300/80 mt-0.5">
                      Mitigation: Enable connection pooling via AWS RDS Proxy / PgBouncer with exponential backoff retries and circuit breakers (Resilience4j / Opossum).
                    </p>
                  </div>
                </div>
              )}

              {!cacheDown && !dbFailover && (
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Architecture Resiliency Verified:</span> System handles current load with sub-100ms P95 latency.
                    <p className="text-[11px] text-emerald-300/80 mt-0.5">
                      Redundant Nginx gateways, auto-scaled ECS tasks, and Redis caching protect the core PostgreSQL persistence layer.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResilienceSimulator;
