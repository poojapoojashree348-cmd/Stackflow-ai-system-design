import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingDown,
  Layers,
  Server,
  Database,
  Zap,
  Globe,
  HardDrive,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Sliders,
  HelpCircle
} from "lucide-react";

export function CloudCostEstimator({ project, design }) {
  const [mau, setMau] = useState(100000);
  const [storageGb, setStorageGb] = useState(250);
  const [cloudProvider, setCloudProvider] = useState("aws");
  const [isReserved, setIsReserved] = useState(false);

  const costs = useMemo(() => {
    // Scaling formulas based on MAU and storage
    const computeFactor = mau / 50000;
    const computeCost = Math.round(75 + computeFactor * 85);
    const dbCost = Math.round(110 + (mau / 100000) * 90 + storageGb * 0.18);
    const cacheCost = Math.round(45 + (mau / 100000) * 35);
    const networkCost = Math.round(30 + (mau / 100000) * 45);
    const storageCost = Math.round(15 + storageGb * 0.023);
    const observabilityCost = Math.round(25 + (mau / 100000) * 20);

    const subtotal = computeCost + dbCost + cacheCost + networkCost + storageCost + observabilityCost;
    const discountMultiplier = isReserved ? 0.66 : 1.0; // 34% discount with 1-yr reserved
    const total = Math.round(subtotal * discountMultiplier);
    const annualTotal = total * 12;
    const savings = Math.round((subtotal - total) * 12);

    return {
      computeCost: Math.round(computeCost * discountMultiplier),
      dbCost: Math.round(dbCost * discountMultiplier),
      cacheCost: Math.round(cacheCost * discountMultiplier),
      networkCost: Math.round(networkCost * discountMultiplier),
      storageCost: Math.round(storageCost * discountMultiplier),
      observabilityCost: Math.round(observabilityCost * discountMultiplier),
      subtotal,
      total,
      annualTotal,
      savings
    };
  }, [mau, storageGb, isReserved]);

  const lineItems = [
    {
      name: "Compute (Container Cluster)",
      service: cloudProvider === "aws" ? "AWS ECS Fargate" : cloudProvider === "gcp" ? "Google Cloud Run" : "Azure Container Apps",
      desc: "Auto-scaled container microservices tasks",
      cost: costs.computeCost,
      icon: Server,
      color: "text-indigo-400 bg-indigo-950/60"
    },
    {
      name: "Managed Database",
      service: cloudProvider === "aws" ? "RDS PostgreSQL (Multi-AZ)" : cloudProvider === "gcp" ? "Cloud SQL Postgres" : "Azure Database for PG",
      desc: "High-availability relational database with automated backups",
      cost: costs.dbCost,
      icon: Database,
      color: "text-emerald-400 bg-emerald-950/60"
    },
    {
      name: "In-Memory Cache",
      service: cloudProvider === "aws" ? "ElastiCache Redis" : cloudProvider === "gcp" ? "Memorystore Redis" : "Azure Cache for Redis",
      desc: "Low-latency session store & query caching cluster",
      cost: costs.cacheCost,
      icon: Zap,
      color: "text-amber-400 bg-amber-950/60"
    },
    {
      name: "Gateway & Egress Network",
      service: cloudProvider === "aws" ? "Application Load Balancer + NAT" : cloudProvider === "gcp" ? "Cloud Load Balancing" : "Azure App Gateway",
      desc: "TLS termination, DDoS protection, and public egress",
      cost: costs.networkCost,
      icon: Globe,
      color: "text-purple-400 bg-purple-950/60"
    },
    {
      name: "Object Storage & Backups",
      service: cloudProvider === "aws" ? "Amazon S3 Standard" : cloudProvider === "gcp" ? "Cloud Storage" : "Azure Blob Storage",
      desc: "Static assets, media uploads, and snapshot archives",
      cost: costs.storageCost,
      icon: HardDrive,
      color: "text-sky-400 bg-sky-950/60"
    },
    {
      name: "Observability & Telemetry",
      service: cloudProvider === "aws" ? "CloudWatch + X-Ray" : cloudProvider === "gcp" ? "Cloud Trace + Ops" : "Azure Monitor",
      desc: "Log aggregation, metrics alerting, and APM tracing",
      cost: costs.observabilityCost,
      icon: Layers,
      color: "text-rose-400 bg-rose-950/60"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-[#0f1422] to-slate-900/80 p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Infrastructure Economics & Capacity Planning</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Cloud Cost Estimator
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Forecast your infrastructure operational expenses across major cloud providers.
            Adjust usage curves, storage tiers, and instance reservation plans to calculate monthly runway.
          </p>
        </div>

        {/* Total Cost Highlight Pill */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3.5 text-right shrink-0">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
            Estimated Monthly Spend
          </span>
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-2xl font-bold font-mono text-emerald-400">${costs.total}</span>
            <span className="text-xs text-slate-500">/ mo</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
            ${costs.annualTotal.toLocaleString()} projected annual
          </span>
        </div>
      </div>

      {/* Main Grid: Parameters & Sliders on Left (5 cols), Line items & Advisor on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-5 shadow-md space-y-5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Scale & Capacity Drivers</span>
            </span>

            {/* Provider Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Cloud Provider Target</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "aws", name: "AWS Cloud" },
                  { id: "gcp", name: "Google Cloud" },
                  { id: "azure", name: "Microsoft Azure" }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setCloudProvider(p.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      cloudProvider === p.id
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                        : "bg-[#121826] border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* MAU Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Monthly Active Users (MAU)</span>
                <span className="text-indigo-400 font-mono font-semibold">{mau.toLocaleString()} MAU</span>
              </div>
              <input
                type="range"
                min="10000"
                max="2000000"
                step="25000"
                value={mau}
                onChange={(e) => setMau(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>10k MAU</span>
                <span>1M MAU</span>
                <span>2M MAU</span>
              </div>
            </div>

            {/* Storage Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Total Primary & Media Storage</span>
                <span className="text-indigo-400 font-mono font-semibold">{storageGb} GB</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={storageGb}
                onChange={(e) => setStorageGb(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>50 GB</span>
                <span>1,000 GB</span>
                <span>2,000 GB</span>
              </div>
            </div>

            {/* Reservation Discount Toggle */}
            <div className="pt-3 border-t border-slate-800">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">1-Year Savings Plan / Reserved</span>
                  <span className="text-[11px] text-slate-400">Apply ~34% cloud commitment discount</span>
                </div>
                <input
                  type="checkbox"
                  checked={isReserved}
                  onChange={(e) => setIsReserved(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                />
              </label>
              {isReserved && (
                <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Saving ~${costs.savings.toLocaleString()} annually with compute commitments.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cost Line Items Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Detailed Breakdown Card */}
          <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-5 shadow-md space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between mb-2">
              <span>Cost Component Breakdown</span>
              <span className="text-[11px] font-mono text-slate-400">{cloudProvider.toUpperCase()} Pricing</span>
            </span>

            <div className="divide-y divide-slate-800/80">
              {lineItems.map((item, idx) => {
                const Icon = item.icon;
                const percentage = Math.round((item.cost / costs.total) * 100);

                return (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white truncate">{item.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.2 rounded bg-slate-800 hidden sm:inline">
                            {item.service}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{item.desc}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono text-white">${item.cost}</span>
                      <span className="text-[10px] text-slate-500 font-mono block">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architectural Cost Optimization Advisor */}
          <div className="rounded-xl border border-slate-800 bg-[#0d121f] p-5 space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Architectural Cost Optimization Tips</span>
            </span>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-[#121826] border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Enable Read Replica Offloading:</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Routing heavy reporting queries to cheap read replicas lets you downsize the primary database instance from db.m5.2xlarge to db.t4g.xlarge, cutting database expenses by ~40%.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#121826] border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">CloudFront Edge Caching:</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Cache static GET endpoints at CloudFront edges to absorb ~65% of API requests before reaching compute tasks, reducing Fargate task counts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CloudCostEstimator;
