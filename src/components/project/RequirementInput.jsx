import React, { useState, useMemo } from "react";
import Input from "../common/Input.jsx";
import { Sparkles, Lightbulb, Cpu, Layers, Palette, CheckCircle2, ArrowRight } from "lucide-react";
import { detectDomainTheme, THEME_OPTIONS } from "../design/ProjectIllustration.jsx";

const DOMAIN_STACK_MAP = {
  drones: {
    stack: "Rust / Go • TimescaleDB • MAVLink & WebSockets • NATS",
    category: "Robotics & Autonomous Systems",
    icon: "🛸",
    accent: "text-sky-400 border-sky-500/40 bg-sky-950/40",
    summary: "Bespoke avionics telemetry pipeline with sub-20ms BVLOS control and geo-fenced flight path dispatch."
  },
  security: {
    stack: "Go / Rust • ClickHouse & TimescaleDB • eBPF & Kafka • gRPC",
    category: "Cybersecurity & Threat Defense",
    icon: "🛡️",
    accent: "text-rose-400 border-rose-500/40 bg-rose-950/40",
    summary: "Zero-trust SIEM ingest engine with real-time anomaly detection, MITRE ATT&CK mapping, and automated firewall remediation."
  },
  blockchain: {
    stack: "Solidity / Rust • PostgreSQL & IPFS • JSON-RPC & Ethers.js • The Graph",
    category: "Web3 & Decentralized Ledger",
    icon: "⛓️",
    accent: "text-amber-400 border-amber-500/40 bg-amber-950/40",
    summary: "Decentralized liquidity pool and multi-sig vault with smart contract event indexers and gas-optimized settlement."
  },
  streaming: {
    stack: "Go / C++ • ScyllaDB & Redis • WebRTC / HLS • Kafka Event Bus",
    category: "Ultra-Low Latency Media",
    icon: "📡",
    accent: "text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-950/40",
    summary: "Adaptive bitrate (ABR) transcoding mesh with edge CDN distribution and real-time interactive audience chat."
  },
  gaming: {
    stack: "C++ / Rust / Node • Redis Cluster & MongoDB • UDP / WebSockets • Agones K8s",
    category: "Game Servers & Real-Time Tick",
    icon: "🎮",
    accent: "text-purple-400 border-purple-500/40 bg-purple-950/40",
    summary: "128Hz authoritative physics tick loop, ELO skill-based matchmaking, and zero-downtime server scaling."
  },
  logistics: {
    stack: "Go / Java Spring • PostgreSQL (PostGIS) & Redis • MQTT / Kafka • GIS Engine",
    category: "Supply Chain & Route Optimization",
    icon: "📦",
    accent: "text-orange-400 border-orange-500/40 bg-orange-950/40",
    summary: "Multi-stop vehicle routing algorithm (VRP) with real-time waypoint geofencing and warehouse inventory synchronization."
  },
  iot: {
    stack: "Go / C • TimescaleDB & InfluxDB • MQTT / CoAP • EMQX Cluster",
    category: "Hardware Telemetry & Sensor Networks",
    icon: "🛰️",
    accent: "text-teal-400 border-teal-500/40 bg-teal-950/40",
    summary: "High-throughput sensor ingestion pipeline with edge firmware OTA rollout and threshold trigger alerts."
  },
  devops: {
    stack: "Go • Prometheus & Thanos • OpenTelemetry & gRPC • Kubernetes Operators",
    category: "Cloud Infrastructure & SRE",
    icon: "☸️",
    accent: "text-blue-400 border-blue-500/40 bg-blue-950/40",
    summary: "Multi-cloud control plane with synthetic health probes, auto-remediation playbooks, and distributed tracing."
  },
  event: {
    stack: "Node.js / Express • PostgreSQL & Redis • WebSockets • Stripe Webhooks",
    category: "Event Ticketing & Verification",
    icon: "🎟️",
    accent: "text-indigo-400 border-indigo-500/40 bg-indigo-950/40",
    summary: "Concurrency-safe seat reservation lock, dynamic QR admission pass generation, and offline attendee validation."
  },
  food: {
    stack: "Node.js / Java • PostgreSQL & Redis • WebSockets • Google Maps Fleet",
    category: "On-Demand Food Logistics",
    icon: "🍔",
    accent: "text-amber-400 border-amber-500/40 bg-amber-950/40",
    summary: "Tri-party dispatch orchestration connecting customers, restaurant kitchen display systems (KDS), and rider GPS tracking."
  },
  ecommerce: {
    stack: "Next.js / Node • PostgreSQL & Redis • Elasticsearch • Stripe & Stripe Connect",
    category: "High-Scale Digital Commerce",
    icon: "🛍️",
    accent: "text-pink-400 border-pink-500/40 bg-pink-950/40",
    summary: "High-concurrency inventory reservation with faceted catalog search, payment idempotency, and fulfillment logistics."
  },
  healthcare: {
    stack: "Python FastAPI / Node • PostgreSQL (HIPAA TDE) & Redis • WebRTC • FHIR/HL7",
    category: "Digital Health & Telemedicine",
    icon: "🩺",
    accent: "text-teal-400 border-teal-500/40 bg-teal-950/40",
    summary: "HIPAA-compliant encrypted electronic health records (EHR) with scheduled WebRTC video consultations and prescription audits."
  },
  rides: {
    stack: "Go / Node • PostgreSQL (PostGIS) & Redis GEO • WebSockets • Kafka Queue",
    category: "Geospatial Mobility & Ride Hailing",
    icon: "🚖",
    accent: "text-yellow-400 border-yellow-500/40 bg-yellow-950/40",
    summary: "H3 hexagonal spatial indexer for real-time driver matching, dynamic surge pricing algorithms, and live GPS route snapping."
  },
  education: {
    stack: "React / Node • PostgreSQL & AWS S3 • WebRTC • Canvas LTI",
    category: "EdTech & Learning Management",
    icon: "🎓",
    accent: "text-blue-400 border-blue-500/40 bg-blue-950/40",
    summary: "Interactive virtual classroom with proctored assessments, SCORM/LTI content delivery, and student progress analytics."
  },
  fintech: {
    stack: "Java Spring Boot / Go • PostgreSQL (ACID Double-Entry) & Redis • Kafka • PCI-DSS",
    category: "Financial Ledger & Payment Gateways",
    icon: "💳",
    accent: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40",
    summary: "Immutable double-entry balance ledger with sub-50ms fraud rule evaluation, webhook idempotency, and ISO-20022 compliance."
  },
  social: {
    stack: "Node.js / Go • Cassandra & PostgreSQL • Redis Pub/Sub • S3 & CloudFront",
    category: "Social Graphs & Real-Time Feeds",
    icon: "💬",
    accent: "text-violet-400 border-violet-500/40 bg-violet-950/40",
    summary: "Fan-out feed generation architecture with WebSocket presence tracking, end-to-end media encryption, and content moderation."
  },
  realestate: {
    stack: "Next.js / Python • PostgreSQL (PostGIS) & Redis • Mapbox GL • ElasticSearch",
    category: "Property Marketplaces & MLS",
    icon: "🏡",
    accent: "text-amber-400 border-amber-500/40 bg-amber-950/40",
    summary: "Polygon map bounding search, 3D virtual tour asset caching, automated mortgage estimation, and escrow document workflows."
  },
  fitness: {
    stack: "Node.js / Python • TimescaleDB & Redis • BLE Device Sync • WebSockets",
    category: "Wearable Health & Biometrics",
    icon: "💪",
    accent: "text-rose-400 border-rose-500/40 bg-rose-950/40",
    summary: "Time-series biometric ingest (heart rate, cadence, GPS) with automated PR milestones and leaderboards."
  },
  ai: {
    stack: "Python FastAPI / Node • Qdrant / pgvector & PostgreSQL • Gemini 3.8 Flash • Redis",
    category: "AI SaaS & Vector Agents",
    icon: "⚡",
    accent: "text-cyan-400 border-cyan-500/40 bg-cyan-950/40",
    summary: "Hybrid lexical/dense vector retrieval (RAG) with background agent tool-calling queues and streaming token responses."
  },
  general: {
    stack: "Node.js / Go • PostgreSQL & Redis • REST & gRPC • Docker & Kubernetes",
    category: "Distributed Cloud Platform",
    icon: "🌐",
    accent: "text-indigo-400 border-indigo-500/40 bg-indigo-950/40",
    summary: "Standard high-availability microservices architecture with unified API gateway, structured database schemas, and cloud deployment."
  }
};

export function RequirementInput({
  title,
  setTitle,
  description,
  setDescription,
  titleError,
  disabled = false
}) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  const samplePresets = [
    {
      categoryGroup: "hardware",
      domainKey: "drones",
      title: "Autonomous Drone Fleet & Telemetry Hub",
      desc: "Distributed UAV fleet management platform with real-time 60Hz telemetry ingestion, MAVLink mission waypoint dispatch, obstacle avoidance video streams, and automated no-fly zone compliance."
    },
    {
      categoryGroup: "security",
      domainKey: "security",
      title: "Zero-Trust Cybersecurity SIEM Platform",
      desc: "Enterprise security information and event management engine with distributed eBPF kernel event probes, automated IOC threat intelligence ingestion, and sub-second SOAR quarantine webhooks."
    },
    {
      categoryGroup: "media",
      domainKey: "streaming",
      title: "Global 4K Live Video Streaming & WebRTC Mesh",
      desc: "Ultra-low-latency live broadcasting network with distributed WebRTC ingest edge nodes, HLS fallback transcoding, dynamic viewer chat synchronization, and viewer DRM encryption."
    },
    {
      categoryGroup: "fintech",
      domainKey: "fintech",
      title: "High-Frequency FinTech Payment & Ledger",
      desc: "Sub-50ms multi-currency transaction processing engine with immutable double-entry ledgering, PCI-DSS tokenization vaults, automated FX rate hedging, and real-time fraud mitigation."
    },
    {
      categoryGroup: "web3",
      domainKey: "blockchain",
      title: "Web3 DeFi Liquidity Pool & Smart Contract Vault",
      desc: "Automated market maker (AMM) decentralized exchange with ERC-20 token swap routing, slippage calculation algorithms, IPFS metadata pinning, and multi-sig treasury governance."
    },
    {
      categoryGroup: "iot",
      domainKey: "iot",
      title: "Smart Industrial IoT Telemetry & Predictive Maintenance",
      desc: "Industrial sensor network tracking 50,000 factory edge nodes via MQTT, ingesting vibration and temperature time-series to predict bearing failures with automated work-order dispatch."
    },
    {
      categoryGroup: "health",
      domainKey: "healthcare",
      title: "HIPAA-Compliant Telehealth & Clinical EHR",
      desc: "Encrypted healthcare portal with doctor scheduling, WebRTC video consultation rooms, HL7/FHIR lab report interoperability, digital prescription signing, and patient history charts."
    },
    {
      categoryGroup: "commerce",
      domainKey: "food",
      title: "On-Demand Food Delivery & Real-Time Fleet",
      desc: "Tri-party ordering and dispatch ecosystem with customer mobile menus, restaurant kitchen display status, dynamic driver routing with live GPS map breadcrumbs, and payment gateway."
    }
  ];

  const handleApplyPreset = (preset) => {
    if (disabled) return;
    setTitle(preset.title);
    setDescription(preset.desc);
  };

  // Live detection based on currently typed title and description
  const detectedThemeId = useMemo(() => {
    if (!title && !description) return "general";
    return detectDomainTheme({ title, description }, null);
  }, [title, description]);

  const domainDetails = DOMAIN_STACK_MAP[detectedThemeId] || DOMAIN_STACK_MAP.general;
  const themeMeta = THEME_OPTIONS.find((t) => t.id === detectedThemeId) || THEME_OPTIONS[0];

  const filteredPresets = useMemo(() => {
    if (selectedCategoryFilter === "all") return samplePresets;
    return samplePresets.filter((p) => p.categoryGroup === selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  return (
    <div className="space-y-6">
      {/* Title Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            Project Title <span className="text-rose-400">*</span>
          </span>
          <span className="text-[11px] font-normal text-slate-400">
            Topic drives the technical stack & output visual
          </span>
        </label>
        <input
          type="text"
          placeholder="e.g. Autonomous Drone Fleet Hub, Zero-Trust Cybersecurity SIEM, Web3 DEX..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabled}
          className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#0d121f] text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all ${
            titleError
              ? "border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/20"
              : "border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
          }`}
        />
        {titleError && (
          <p className="text-xs text-rose-400 mt-1 font-medium">{titleError}</p>
        )}
      </div>

      {/* Description Textarea */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Project Description & Functional Requirements (Optional)</span>
          <span className="text-[11px] font-normal text-indigo-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Gemini AI synthesizes domain-specific architecture
          </span>
        </label>
        <textarea
          rows={4}
          placeholder="Describe your system: e.g. latency constraints, specialized hardware or protocols (e.g. WebSockets, MQTT, gRPC), target scale, database requirements, or user roles..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disabled}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-[#0d121f] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-y"
        />
      </div>

      {/* Live AI Domain & Technical Stack Derivation Preview */}
      {(title.trim().length > 2 || description.trim().length > 5) && (
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-blue-950/30 via-slate-900/60 to-purple-950/30 p-3.5 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-lg">{domainDetails.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-tight">
                    Detected Domain: {domainDetails.category}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                    AI ADAPTIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Output structure and visual mockup will be tailored specifically for this project topic.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-300 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700/80">
              <Palette className="w-3 h-3 text-cyan-400" />
              <span>{themeMeta.badge} Visual</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-start gap-1.5 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Derived Tech Stack Focus
                </span>
                <span className="text-[11px] font-semibold text-slate-200">
                  {domainDetails.stack}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-1.5 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
              <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Domain Architecture Pattern
                </span>
                <span className="text-[11px] font-normal text-slate-300 line-clamp-2">
                  {domainDetails.summary}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Architecture Templates */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Select a Distinct Domain to Test AI Derivation:</span>
          </div>

          {/* Category Filter Chips */}
          <div className="hidden sm:flex items-center gap-1 text-[10px]">
            {[
              { id: "all", label: "All (8)" },
              { id: "hardware", label: "Robotics/Drones" },
              { id: "security", label: "Cybersecurity" },
              { id: "media", label: "Streaming" },
              { id: "fintech", label: "FinTech" },
              { id: "web3", label: "Web3" }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                  selectedCategoryFilter === cat.id
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredPresets.map((preset) => {
            const domainMeta = DOMAIN_STACK_MAP[preset.domainKey] || DOMAIN_STACK_MAP.general;
            const isCurrent = title === preset.title;

            return (
              <button
                key={preset.title}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                disabled={disabled}
                className={`p-3 rounded-xl border text-left transition-all group cursor-pointer relative overflow-hidden ${
                  isCurrent
                    ? "bg-indigo-950/60 border-indigo-500/70 shadow-md ring-1 ring-indigo-500/30"
                    : "bg-[#0d121f] border-slate-800/80 hover:bg-slate-800/60 hover:border-indigo-500/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{domainMeta.icon}</span>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {preset.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono shrink-0">
                    + Load
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {preset.desc}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="truncate max-w-[190px] text-indigo-300 font-medium">
                    ⚡ {domainMeta.stack.split("•")[0]}
                  </span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-0.5">
                    <span>{domainMeta.category.split(" ")[0]}</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RequirementInput;
