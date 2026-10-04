/**
 * StackFlow AI - Domain-Driven Architecture Generator
 * Derives unique, production-grade technical system designs, technical stacks,
 * database schemas, APIs, and visual themes tailored specifically to any project topic and description.
 */

export interface SystemDesignBlueprint {
  projectSummary: {
    projectName: string;
    projectType: string;
    architecture: string;
    frontend: string;
    backend: string;
    database: string;
    authentication: string;
    deployment: string;
  };
  visualTheme: string;
  visualCard: {
    badge: string;
    headline: string;
    accentColor: string;
    icon: string;
  };
  summary: string;
  keyFeatures: string[];
  systemStats: {
    estimatedRPS: string;
    latencyTarget: string;
    databaseSize: string;
    scalabilityTier: string;
  };
  functionalModules: Array<{
    id: string;
    name: string;
    color: string;
    items: string[];
  }>;
  modules: Array<{
    id: string;
    name: string;
    description: string;
    responsibilities: string[];
    dependencies?: string[];
  }>;
  database: {
    databaseType: string;
    tables: Array<{
      id: string;
      name: string;
      description: string;
      fields: Array<{
        name: string;
        type: string;
        isPrimaryKey?: boolean;
        isForeignKey?: boolean;
        references?: string;
        isNullable?: boolean;
        description: string;
      }>;
    }>;
    relationships: Array<{
      fromTable: string;
      fromField: string;
      toTable: string;
      toField: string;
      type: "1:1" | "1:N" | "N:M";
      description: string;
    }>;
  };
  apis: Array<{
    id: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    endpoint: string;
    description: string;
    authentication: boolean;
    requestBody?: string;
    responseBody?: string;
    statusCodes: number[];
  }>;
  architecture: {
    pattern: string;
    components: Array<{
      id: string;
      name: string;
      layer: "Client" | "Gateway" | "Service" | "Database" | "AI" | "Cache" | "Queue";
      technology: string;
      description: string;
    }>;
    connections: Array<{
      from: string;
      to: string;
      label: string;
      protocol: string;
    }>;
  };
  technologyStack: Array<{
    category: "Frontend" | "Backend" | "Database" | "Authentication" | "AI" | "Deployment" | "Caching" | "DevOps" | "Messaging";
    name: string;
    reason: string;
    alternatives: string[];
  }>;
  recommendations: Array<{
    category: "Architecture" | "Security" | "Performance" | "Scalability" | "Development";
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
  }>;
  deployment: Array<{
    stage: string;
    step: string;
    tool: string;
    details: string;
  }>;
}

export function generateDomainArchitecture(rawTitle: string, rawDesc: string): SystemDesignBlueprint {
  const cleanTitle = (rawTitle || "Custom Software Architecture").trim();
  const desc = (rawDesc || "").trim();
  const combined = `${cleanTitle} ${desc}`.toLowerCase();

  // Helper flags
  const isIoT = combined.includes("iot") || combined.includes("drone") || combined.includes("sensor") || combined.includes("hardware") || combined.includes("embedded") || combined.includes("robot") || combined.includes("agriculture") || combined.includes("greenhouse") || combined.includes("telemetry") || combined.includes("esp32") || combined.includes("arduino") || combined.includes("device") || combined.includes("smart home");
  const isAI = combined.includes("ai") || combined.includes("intelligence") || combined.includes("ml") || combined.includes("machine learning") || combined.includes("llm") || combined.includes("gpt") || combined.includes("neural") || combined.includes("agent") || combined.includes("vision") || combined.includes("model") || combined.includes("rag") || combined.includes("vector") || combined.includes("deep learning") || combined.includes("prompt");
  const isCrypto = combined.includes("crypto") || combined.includes("blockchain") || combined.includes("bitcoin") || combined.includes("eth") || combined.includes("web3") || combined.includes("token") || combined.includes("nft") || combined.includes("smart contract") || combined.includes("wallet") || combined.includes("defi") || combined.includes("arbitrage") || combined.includes("solidity");
  const isGaming = combined.includes("game") || combined.includes("gaming") || combined.includes("multiplayer") || combined.includes("esport") || combined.includes("matchmaking") || combined.includes("lobby") || combined.includes("unity") || combined.includes("unreal") || combined.includes("rpg") || combined.includes("quest");
  const isFinance = combined.includes("bank") || combined.includes("payment") || combined.includes("loan") || combined.includes("finance") || combined.includes("stock") || combined.includes("trade") || combined.includes("trading") || combined.includes("invoice") || combined.includes("accounting") || combined.includes("fintech") || combined.includes("billing") || combined.includes("credit") || combined.includes("ledger");
  const isHealth = combined.includes("health") || combined.includes("hospital") || combined.includes("patient") || combined.includes("doctor") || combined.includes("clinic") || combined.includes("medical") || combined.includes("telehealth") || combined.includes("telemedicine") || combined.includes("med") || combined.includes("pharma") || combined.includes("prescription") || combined.includes("ehr") || combined.includes("emr");
  const isEdu = combined.includes("school") || combined.includes("college") || combined.includes("student") || combined.includes("learn") || combined.includes("course") || combined.includes("education") || combined.includes("lms") || combined.includes("academy") || combined.includes("university") || combined.includes("tutor") || combined.includes("exam") || combined.includes("campus");
  const isSocial = combined.includes("social") || combined.includes("chat") || combined.includes("message") || combined.includes("messaging") || combined.includes("feed") || combined.includes("community") || combined.includes("dating") || combined.includes("friend") || combined.includes("network") || combined.includes("forum");
  const isMedia = combined.includes("music") || combined.includes("audio") || combined.includes("song") || combined.includes("podcast") || combined.includes("stream") || combined.includes("video") || combined.includes("movie") || combined.includes("spotify") || combined.includes("netflix") || combined.includes("youtube") || combined.includes("broadcast");
  const isRides = combined.includes("ride") || combined.includes("taxi") || combined.includes("cab") || combined.includes("uber") || combined.includes("driver") || combined.includes("fleet") || combined.includes("transport") || combined.includes("transit") || combined.includes("logistics") || combined.includes("route") || combined.includes("courier");
  const isFood = combined.includes("food") || combined.includes("deliver") || combined.includes("restaurant") || combined.includes("swiggy") || combined.includes("zomato") || combined.includes("dine") || combined.includes("dish") || combined.includes("meal") || combined.includes("kitchen") || combined.includes("recipe") || combined.includes("cafe");
  const isEcom = combined.includes("shop") || combined.includes("cart") || combined.includes("store") || combined.includes("commerce") || combined.includes("ecommerce") || combined.includes("product") || combined.includes("market") || combined.includes("retail") || combined.includes("checkout") || combined.includes("merchant");
  const isSecurity = combined.includes("security") || combined.includes("firewall") || combined.includes("vulnerability") || combined.includes("zero trust") || combined.includes("pentest") || combined.includes("cyber") || combined.includes("breach") || combined.includes("auth") || combined.includes("shield");
  const isFitness = combined.includes("fitness") || combined.includes("gym") || combined.includes("workout") || combined.includes("sport") || combined.includes("calorie") || combined.includes("exercise") || combined.includes("trainer") || combined.includes("running");
  const isRealEstate = combined.includes("estate") || combined.includes("property") || combined.includes("house") || combined.includes("housing") || combined.includes("rental") || combined.includes("apartment") || combined.includes("hotel") || combined.includes("booking") || combined.includes("tenant");
  const isEvent = combined.includes("event") || combined.includes("registration") || combined.includes("workshop") || combined.includes("conference") || combined.includes("seminar") || combined.includes("ticket") || combined.includes("hackathon") || combined.includes("meetup");

  // 1. IOT / DRONES / ROBOTICS / SENSORS
  if (isIoT) {
    return {
      projectSummary: {
        projectName: cleanTitle,
        projectType: "IoT Edge & Telemetry Platform",
        architecture: "Event-Driven Edge & Ingestion Pipeline",
        frontend: "React.js + WebGL / Leaflet GIS",
        backend: "Go & Python (FastAPI)",
        database: "TimescaleDB (Time-Series) + Redis",
        authentication: "Hardware mTLS + JWT",
        deployment: "AWS IoT Core + Docker on EKS"
      },
      visualTheme: "iot",
      visualCard: {
        badge: "IoT Telemetry",
        headline: cleanTitle,
        accentColor: "cyan",
        icon: "cpu"
      },
      summary: `${cleanTitle} is an industrial-grade IoT telemetry and edge orchestration platform. It connects remote edge sensors and hardware nodes over MQTT, ingests high-frequency sensor payloads into an optimized time-series database, and triggers automated alerts with geospatial fleet visualization.`,
      keyFeatures: [
        "Sub-50ms MQTT/CoAP telemetry ingestion with QoS level 1/2 reliability",
        "Edge anomaly detection and automated threshold thresholding",
        "Geospatial hardware asset tracking with live boundary fencing",
        "Over-The-Air (OTA) secure cryptographic firmware rollouts",
        "Time-series historical rollups and sensor health telemetry"
      ],
      systemStats: {
        estimatedRPS: "25,000 events/sec",
        latencyTarget: "< 35ms p95",
        databaseSize: "1.2 TB / year",
        scalabilityTier: "AWS IoT Core + Kafka Cluster Auto-scaler"
      },
      functionalModules: [
        {
          id: "ingestion",
          name: "Edge Sensor Ingestion Module",
          color: "blue",
          items: ["MQTT Broker Bridge", "Hardware mTLS Handshake", "Packet Decompression", "Data Normalization & Validation", "Dead-Letter Buffer"]
        },
        {
          id: "telemetry",
          name: "Telemetry & Time-Series Engine",
          color: "cyan",
          items: ["TimescaleDB Influx Partitioning", "Rolling Averages & Windowing", "GeoJSON Spatial Indexing", "Threshold Alert Rules", "Predictive Failure Signals"]
        },
        {
          id: "fleet",
          name: "Fleet Management & OTA Console",
          color: "green",
          items: ["Device Provisioning & Keys", "Remote Firmware Versioning", "Reboot & Calibration Commands", "Battery & Signal Telemetry", "Audited Operator Logs"]
        },
        {
          id: "dashboard",
          name: "Command Center Dashboard",
          color: "amber",
          items: ["Real-time SVG Sensor Dials", "Live Fleet Map Overlay", "Custom Incident Alerts", "CSV / Parquet Raw Data Export", "Role-Based Device Permissions"]
        }
      ],
      modules: [
        {
          id: "mod_edge_gw",
          name: "EMQX MQTT Gateway Service",
          description: "Terminates bidirectional device sessions, decodes protobuf/JSON payloads, and publishes to Kafka.",
          responsibilities: ["Session termination", "QoS guarantee", "TLS certificate verification"]
        },
        {
          id: "mod_time_engine",
          name: "Telemetry Pipeline Service (Go)",
          description: "High-throughput stream processing worker batching sensor samples into TimescaleDB hyper-tables.",
          responsibilities: ["Micro-batching", "Out-of-order deduplication", "Hypertable compaction"]
        },
        {
          id: "mod_alert_mgr",
          name: "Alert & Notification Engine",
          description: "Evaluates anomaly rules against sliding telemetry windows, dispatching webhooks and SMS alerts.",
          responsibilities: ["Sliding window evaluation", "PagerDuty/Twilio dispatch", "Incident suppression"]
        },
        {
          id: "mod_ota_svc",
          name: "Secure OTA Firmware Orchestrator",
          description: "Manages firmware artifacts in S3, creates chunked signed download URLs, and monitors flash progress.",
          responsibilities: ["Artifact signing", "Chunked delta delivery", "Rollback upon flash failure"]
        }
      ],
      database: {
        databaseType: "TimescaleDB (PostgreSQL 16) + Redis 7",
        tables: [
          {
            id: "tbl_devices",
            name: "Devices",
            description: "Physical sensors and hardware edge units",
            fields: [
              { name: "device_id", type: "UUID", isPrimaryKey: true, description: "Unique hardware identity" },
              { name: "hardware_model", type: "VARCHAR(64)", description: "Hardware revision" },
              { name: "mac_address", type: "VARCHAR(32)", description: "Unique MAC identity" },
              { name: "firmware_version", type: "VARCHAR(32)", description: "Active firmware" },
              { name: "status", type: "VARCHAR(24)", description: "ONLINE | OFFLINE | ALERT" },
              { name: "last_heartbeat", type: "TIMESTAMPTZ", description: "Last ping timestamp" }
            ]
          },
          {
            id: "tbl_telemetry",
            name: "Sensor_Telemetry",
            description: "Partitioned time-series telemetry metrics",
            fields: [
              { name: "telemetry_id", type: "UUID", isPrimaryKey: true, description: "Sample identifier" },
              { name: "device_id", type: "UUID", isForeignKey: true, description: "Reporting sensor FK" },
              { name: "metric_type", type: "VARCHAR(64)", description: "temperature | pressure | vibration | gps" },
              { name: "numeric_value", type: "NUMERIC(10,4)", description: "Recorded measurement" },
              { name: "unit", type: "VARCHAR(16)", description: "Measurement unit" },
              { name: "recorded_at", type: "TIMESTAMPTZ", description: "Hardware timestamp" }
            ]
          },
          {
            id: "tbl_alerts",
            name: "Incident_Alerts",
            description: "Triggered threshold violations and hardware warnings",
            fields: [
              { name: "alert_id", type: "UUID", isPrimaryKey: true, description: "Alert ID" },
              { name: "device_id", type: "UUID", isForeignKey: true, description: "Associated device FK" },
              { name: "severity", type: "VARCHAR(16)", description: "CRITICAL | WARNING | INFO" },
              { name: "message", type: "TEXT", description: "Incident description" },
              { name: "resolved", type: "BOOLEAN", description: "Resolution flag" },
              { name: "created_at", type: "TIMESTAMPTZ", description: "Triggered time" }
            ]
          },
          {
            id: "tbl_firmware",
            name: "Firmware_Releases",
            description: "Cryptographically signed binary updates",
            fields: [
              { name: "firmware_id", type: "UUID", isPrimaryKey: true, description: "Firmware ID" },
              { name: "version_tag", type: "VARCHAR(32)", description: "Semantic release tag" },
              { name: "binary_hash", type: "VARCHAR(64)", description: "SHA-256 integrity hash" },
              { name: "storage_uri", type: "TEXT", description: "S3 encrypted bundle URL" },
              { name: "released_at", type: "TIMESTAMPTZ", description: "Rollout date" }
            ]
          },
          {
            id: "tbl_locations",
            name: "Device_Coordinates",
            description: "Geospatial coordinate logs for moving hardware",
            fields: [
              { name: "coord_id", type: "UUID", isPrimaryKey: true, description: "Coordinate ID" },
              { name: "device_id", type: "UUID", isForeignKey: true, description: "Device FK" },
              { name: "latitude", type: "NUMERIC(10,6)", description: "GPS Latitude" },
              { name: "longitude", type: "NUMERIC(10,6)", description: "GPS Longitude" },
              { name: "altitude_m", type: "NUMERIC(8,2)", description: "Altitude in meters" },
              { name: "recorded_at", type: "TIMESTAMPTZ", description: "GPS lock timestamp" }
            ]
          }
        ],
        relationships: [
          { fromTable: "Sensor_Telemetry", fromField: "device_id", toTable: "Devices", toField: "device_id", type: "1:N", description: "Sensors produce continuous telemetry" },
          { fromTable: "Incident_Alerts", fromField: "device_id", toTable: "Devices", toField: "device_id", type: "1:N", description: "Devices log anomaly alerts" },
          { fromTable: "Device_Coordinates", fromField: "device_id", toTable: "Devices", toField: "device_id", type: "1:N", description: "Moving devices report GPS tracks" }
        ]
      },
      apis: [
        { id: "api_1", method: "POST", endpoint: "/api/v1/telemetry/ingest", description: "Batch ingest edge sensor packets", authentication: true, statusCodes: [202, 400] },
        { id: "api_2", method: "GET", endpoint: "/api/v1/devices", description: "List connected fleet devices", authentication: true, statusCodes: [200] },
        { id: "api_3", method: "GET", endpoint: "/api/v1/devices/:id/telemetry", description: "Query time-series window for device", authentication: true, statusCodes: [200, 404] },
        { id: "api_4", method: "POST", endpoint: "/api/v1/devices/:id/commands", description: "Dispatch remote control command to edge", authentication: true, statusCodes: [200, 400] },
        { id: "api_5", method: "GET", endpoint: "/api/v1/alerts/active", description: "Retrieve active threshold incidents", authentication: true, statusCodes: [200] },
        { id: "api_6", method: "POST", endpoint: "/api/v1/firmware/ota/deploy", description: "Trigger targeted OTA update across fleet", authentication: true, statusCodes: [201, 403] }
      ],
      architecture: {
        pattern: "Event-Driven Edge Ingestion & Time-Series Microservices",
        components: [
          { id: "c_edge", name: "Edge Devices / Sensors", layer: "Client", technology: "C++ / MicroPython / ESP32", description: "Hardware sensors capturing physical metrics" },
          { id: "c_mqtt", name: "MQTT Broker (EMQX)", layer: "Gateway", technology: "EMQX Enterprise / TLS", description: "Pub/Sub message broker with mTLS auth" },
          { id: "c_pipe", name: "Ingestion Worker Service", layer: "Service", technology: "Go (High Concurrency)", description: "Consumes MQTT topics and validates packets" },
          { id: "c_db", name: "TimescaleDB Hypertable", layer: "Database", technology: "PostgreSQL 16 + TimescaleDB", description: "Partitioned time-series sensor storage" },
          { id: "c_cache", name: "Redis 7 Real-time State", layer: "Cache", technology: "Redis 7 Cluster", description: "Device online/offline state and geohashes" },
          { id: "c_ui", name: "Telemetry Web Console", layer: "Client", technology: "React.js + WebGL Canvas", description: "Real-time command center interface" }
        ],
        connections: [
          { from: "c_edge", to: "c_mqtt", label: "MQTT / TLS", protocol: "MQTT" },
          { from: "c_mqtt", to: "c_pipe", label: "Kafka Stream", protocol: "Kafka" },
          { from: "c_pipe", to: "c_db", label: "Bulk Inserts", protocol: "TCP" },
          { from: "c_pipe", to: "c_cache", label: "State Sync", protocol: "RESP" },
          { from: "c_ui", to: "c_cache", label: "WebSocket Sub", protocol: "WSS" }
        ]
      },
      technologyStack: [
        { category: "Frontend", name: "React.js", reason: "Hardware telemetry dashboards with high-frequency WebGL rendering.", alternatives: ["Vue.js", "Grafana Panels"] },
        { category: "Backend", name: "Go", reason: "Compiled low-latency runtime capable of processing 25,000+ MQTT packets/sec.", alternatives: ["Rust", "Python"] },
        { category: "Database", name: "TimescaleDB", reason: "Automatic time-based chunking with SQL query power for sensor rollups.", alternatives: ["InfluxDB", "ClickHouse"] },
        { category: "Messaging", name: "EMQX MQTT Broker", reason: "Industry standard for massive concurrent IoT persistent sessions.", alternatives: ["Mosquitto", "AWS IoT Core"] },
        { category: "Caching", name: "Redis 7", reason: "Sub-millisecond device online state tracking and geospatial lookup.", alternatives: ["Memcached"] },
        { category: "Deployment", name: "Docker on AWS EKS", reason: "Containerized autoscaling microservices handling peak sensor bursts.", alternatives: ["AWS IoT Greengrass"] }
      ],
      recommendations: [
        { category: "Performance", title: "Continuous Data Compaction", description: "Enable TimescaleDB columnar compression on telemetry older than 7 days to save 85% storage.", priority: "High" },
        { category: "Security", title: "Mutual TLS Hardware Identity", description: "Enforce X.509 device certificates generated during manufacturing to reject spoofed sensors.", priority: "High" },
        { category: "Architecture", title: "Circuit Breakers on Ingestion", description: "Buffer incoming MQTT bursts in Kafka to protect database connection pools from starvation.", priority: "High" }
      ],
      deployment: [
        { stage: "Edge", step: "Firmware Provisioning", tool: "PlatformIO / C++", details: "Compile and flash TLS certificates on sensor microcontrollers" },
        { stage: "Gateway", step: "MQTT Broker Hosting", tool: "EMQX Cluster on AWS", details: "Configure multi-node MQTT broker with auto-healing" },
        { stage: "Database", step: "TimescaleDB Setup", tool: "Timescale Cloud / RDS", details: "Provision multi-AZ time-series database with retention policies" },
        { stage: "Production", step: "Kubernetes Deploy", tool: "AWS EKS + Helm", details: "Continuous deployment of Go ingestion workers and React web console" }
      ]
    };
  }

  // 2. AI / MACHINE LEARNING / LLM / VECTOR / RAG
  if (isAI) {
    return {
      projectSummary: {
        projectName: cleanTitle,
        projectType: "AI & Machine Learning Serving Platform",
        architecture: "Microservices with Vector Search & Ray Workers",
        frontend: "Next.js 15 + Tailwind CSS",
        backend: "Python (FastAPI) & Go",
        database: "PostgreSQL 16 (pgvector) + Milvus",
        authentication: "OAuth 2.0 / API Keys with Token Quotas",
        deployment: "Kubernetes (EKS) with GPU Nodes (NVIDIA A100)"
      },
      visualTheme: "ai",
      visualCard: {
        badge: "AI & Neural Engine",
        headline: cleanTitle,
        accentColor: "indigo",
        icon: "zap"
      },
      summary: `${cleanTitle} is a production-grade AI platform engineered for low-latency inference, dynamic retrieval-augmented generation (RAG), and asynchronous model training pipelines. It couples a high-concurrency gateway with specialized GPU acceleration nodes.`,
      keyFeatures: [
        "Sub-80ms semantic vector similarity search across millions of embeddings",
        "Asynchronous task queue with GPU-aware worker scheduling via Ray / Celery",
        "Fine-grained token metering and rate-limiting per API consumer",
        "Automated model versioning and A/B canary routing",
        "Audit logging of prompt inputs and safety guardrail enforcement"
      ],
      systemStats: {
        estimatedRPS: "6,000 req/sec",
        latencyTarget: "< 75ms p95",
        databaseSize: "800 GB / year",
        scalabilityTier: "Kubernetes KEDA + Ray Cluster GPU Auto-scaler"
      },
      functionalModules: [
        {
          id: "inference",
          name: "Model Inference & Gateway Module",
          color: "blue",
          items: ["REST & Streaming SSE Gateway", "Token Quota Validation", "Prompt Guardrail Sanitizer", "Model Router (v1/v2)", "Latency Benchmarking"]
        },
        {
          id: "rag",
          name: "RAG & Knowledge Vector Pipeline",
          color: "purple",
          items: ["Document Ingestion & Chunking", "Embedding Vectorization (OpenAI/Gemini)", "Milvus Approximate Nearest Neighbor Search", "Context Injection & Reranking", "Knowledge Base Sync"]
        },
        {
          id: "worker",
          name: "Async GPU Compute & Fine-tuning",
          color: "green",
          items: ["Ray Worker Cluster Scheduler", "Batch Inference Job Queue", "LoRA Adapter Checkpoint Vault", "Dataset Validation", "Telemetry Metrics Exporter"]
        },
        {
          id: "admin",
          name: "AI Ops & Token Analytics Console",
          color: "amber",
          items: ["Per-User Token Consumption Meters", "Accuracy & Drift Analytics", "API Key Management", "Model Latency Heatmaps", "Audit Trail Vault"]
        }
      ],
      modules: [
        {
          id: "mod_api_gw",
          name: "FastAPI Core Gateway",
          description: "High-performance asynchronous gateway handling auth, streaming tokens, and proxying.",
          responsibilities: ["Rate limiting", "SSE token streaming", "Prompt sanitization"]
        },
        {
          id: "mod_vector_svc",
          name: "Vector Retrieval Service",
          description: "Performs dense vector index lookups using Milvus / pgvector with cosine distance scoring.",
          responsibilities: ["Semantic search", "Metadata filtering", "Reranking"]
        },
        {
          id: "mod_worker_node",
          name: "Ray Distributed Model Server",
          description: "Orchestrates GPU model instances (Triton / vLLM) with continuous batching.",
          responsibilities: ["Continuous batching", "GPU memory management", "KV cache optimization"]
        }
      ],
      database: {
        databaseType: "PostgreSQL 16 (pgvector) + Milvus Vector DB + Redis 7",
        tables: [
          {
            id: "tbl_users",
            name: "API_Consumers",
            description: "Developers and organizations utilizing AI services",
            fields: [
              { name: "consumer_id", type: "UUID", isPrimaryKey: true, description: "Primary Key" },
              { name: "organization_name", type: "VARCHAR(128)", description: "Company or user" },
              { name: "api_key_hash", type: "VARCHAR(64)", description: "SHA-256 key hash" },
              { name: "monthly_token_quota", type: "BIGINT", description: "Allocated monthly quota" },
              { name: "tokens_used", type: "BIGINT", description: "Current period usage" },
              { name: "tier", type: "VARCHAR(32)", description: "ENTERPRISE | PRO | FREE" }
            ]
          },
          {
            id: "tbl_documents",
            name: "Knowledge_Documents",
            description: "Indexed source documents for RAG context",
            fields: [
              { name: "document_id", type: "UUID", isPrimaryKey: true, description: "Document ID" },
              { name: "title", type: "VARCHAR(255)", description: "Document title" },
              { name: "total_chunks", type: "INTEGER", description: "Number of vector chunks" },
              { name: "checksum", type: "VARCHAR(64)", description: "Content MD5" },
              { name: "created_at", type: "TIMESTAMPTZ", description: "Upload timestamp" }
            ]
          },
          {
            id: "tbl_chunks",
            name: "Document_Chunks",
            description: "Embedded document segments with vector representations",
            fields: [
              { name: "chunk_id", type: "UUID", isPrimaryKey: true, description: "Chunk ID" },
              { name: "document_id", type: "UUID", isForeignKey: true, description: "Parent document FK" },
              { name: "chunk_text", type: "TEXT", description: "Raw chunk content" },
              { name: "embedding_dim", type: "INTEGER", description: "Vector dimension (1536/768)" },
              { name: "token_count", type: "INTEGER", description: "Segment tokens" }
            ]
          },
          {
            id: "tbl_runs",
            name: "Inference_Runs",
            description: "Detailed inference telemetry and prompt token audits",
            fields: [
              { name: "run_id", type: "UUID", isPrimaryKey: true, description: "Run identifier" },
              { name: "consumer_id", type: "UUID", isForeignKey: true, description: "Calling consumer FK" },
              { name: "model_version", type: "VARCHAR(64)", description: "Model checkpoint tag" },
              { name: "tokens_prompt", type: "INTEGER", description: "Input tokens" },
              { name: "tokens_generated", type: "INTEGER", description: "Output tokens" },
              { name: "latency_ms", type: "NUMERIC(8,2)", description: "End-to-end execution time" },
              { name: "created_at", type: "TIMESTAMPTZ", description: "Execution timestamp" }
            ]
          }
        ],
        relationships: [
          { fromTable: "Document_Chunks", fromField: "document_id", toTable: "Knowledge_Documents", toField: "document_id", type: "1:N", description: "Documents split into vector chunks" },
          { fromTable: "Inference_Runs", fromField: "consumer_id", toTable: "API_Consumers", toField: "consumer_id", type: "1:N", description: "Consumers execute tracked model runs" }
        ]
      },
      apis: [
        { id: "api_1", method: "POST", endpoint: "/api/v1/inference/generate", description: "Stream LLM token completions (SSE)", authentication: true, statusCodes: [200, 429] },
        { id: "api_2", method: "POST", endpoint: "/api/v1/vector/search", description: "Perform semantic vector similarity query", authentication: true, statusCodes: [200, 400] },
        { id: "api_3", method: "POST", endpoint: "/api/v1/knowledge/upload", description: "Ingest and vectorize raw document source", authentication: true, statusCodes: [201, 413] },
        { id: "api_4", method: "GET", endpoint: "/api/v1/models/active", description: "List available model checkpoints & health", authentication: true, statusCodes: [200] },
        { id: "api_5", method: "GET", endpoint: "/api/v1/usage/analytics", description: "Retrieve token quotas and spend metrics", authentication: true, statusCodes: [200] }
      ],
      architecture: {
        pattern: "Distributed Microservices with GPU Inference Mesh & Vector Search",
        components: [
          { id: "c_client", name: "Client Application", layer: "Client", technology: "Next.js 15 Web & SDK", description: "Frontend and client SDKs consuming AI endpoints" },
          { id: "c_gw", name: "API Gateway (FastAPI)", layer: "Gateway", technology: "Python / FastAPI / Traefik", description: "Routes requests, validates auth, meters tokens" },
          { id: "c_vector", name: "Vector Index (Milvus)", layer: "Database", technology: "Milvus / pgvector", description: "High-speed dense vector index" },
          { id: "c_triton", name: "GPU Serving Cluster", layer: "AI", technology: "Ray / vLLM on NVIDIA A100", description: "Distributed model inference instances" },
          { id: "c_db", name: "Relational Ledger DB", layer: "Database", technology: "PostgreSQL 16 Multi-AZ", description: "User quotas, documents, audit logs" },
          { id: "c_redis", name: "Redis Semantic Cache", layer: "Cache", technology: "Redis 7 (LRU)", description: "Caches frequent prompt embedding responses" }
        ],
        connections: [
          { from: "c_client", to: "c_gw", label: "HTTPS / SSE", protocol: "HTTPS" },
          { from: "c_gw", to: "c_redis", label: "Cache Check", protocol: "RESP" },
          { from: "c_gw", to: "c_vector", label: "gRPC Vector Search", protocol: "gRPC" },
          { from: "c_gw", to: "c_triton", label: "Inference Call", protocol: "gRPC" },
          { from: "c_gw", to: "c_db", label: "Quota Check", protocol: "TCP" }
        ]
      },
      technologyStack: [
        { category: "Frontend", name: "Next.js 15", reason: "React Server Components with fast streaming SSR token rendering.", alternatives: ["React.js", "Vue.js"] },
        { category: "Backend", name: "Python (FastAPI)", reason: "Asynchronous ASGI framework with native ML ecosystem interoperability.", alternatives: ["Go", "Node.js"] },
        { category: "Database", name: "PostgreSQL 16 + pgvector", reason: "Unified ACID metadata storage combined with HNSW vector indexing.", alternatives: ["Pinecone", "Qdrant"] },
        { category: "AI", name: "vLLM / Triton Server", reason: "PagedAttention and continuous batching yielding 4x higher token throughput.", alternatives: ["HuggingFace TGI", "Ollama"] },
        { category: "Caching", name: "Redis 7", reason: "Semantic caching of prompt embeddings avoiding repeated inference costs.", alternatives: ["Dragonfly"] },
        { category: "Deployment", name: "AWS EKS with GPU Nodes", reason: "Kubernetes autoscaling based on GPU memory and queue saturation.", alternatives: ["GCP GKE", "RunPod"] }
      ],
      recommendations: [
        { category: "Performance", title: "Continuous Batching & PagedAttention", description: "Enable vLLM continuous batching to maximize GPU hardware utilization.", priority: "High" },
        { category: "Security", title: "Prompt Injection & Exfiltration Firewall", description: "Pass inputs through LlamaGuard / NeMo Guardrails prior to model ingestion.", priority: "High" },
        { category: "Architecture", title: "Semantic Response Caching", description: "Cache query embeddings in Redis to serve identical questions with 0ms GPU cost.", priority: "High" }
      ],
      deployment: [
        { stage: "Frontend", step: "Frontend Rollout", tool: "Vercel / CloudFront", details: "Global CDN delivery of Next.js chat & developer console" },
        { stage: "Gateway", step: "API Gateway Deployment", tool: "Docker on AWS EKS", details: "FastAPI gateway with auto-scaling based on HTTP requests" },
        { stage: "GPU Cluster", step: "Model Worker Scaling", tool: "Ray on AWS GPU instances", details: "Kubernetes KEDA scaling NVIDIA A100 GPU worker pods" },
        { stage: "Database", step: "Vector DB Hosting", tool: "Milvus Distributed Cluster", details: "Deploy standalone vector search cluster with persistent EBS" }
      ]
    };
  }

  // 3. FINTECH / BANKING / CRYPTO / LEDGER
  if (isCrypto || isFinance) {
    const isWeb3 = isCrypto;
    return {
      projectSummary: {
        projectName: cleanTitle,
        projectType: isWeb3 ? "Web3 Decentralized FinTech Platform" : "Core Banking & Transaction Ledger",
        architecture: "CQRS with Event Sourcing & ACID Relational Core",
        frontend: "React.js + Tailwind CSS",
        backend: "Go & Java (Spring Boot)",
        database: "PostgreSQL 16 (Strict ACID) + Redis",
        authentication: isWeb3 ? "Web3 Wallet Signature (EIP-4361) + JWT" : "OAuth 2.0 / mTLS with Multi-Factor Auth",
        deployment: "Multi-Region AWS RDS + EKS (PCI-DSS Hardened)"
      },
      visualTheme: isWeb3 ? "crypto" : "fintech",
      visualCard: {
        badge: isWeb3 ? "Crypto & Web3" : "FinTech Ledger",
        headline: cleanTitle,
        accentColor: "emerald",
        icon: "shield"
      },
      summary: `${cleanTitle} is a fault-tolerant financial platform architected for zero-loss double-entry transaction ledgers, sub-50ms balance reconciliations, and real-time AML fraud scoring. It complies with strict PCI-DSS and regulatory audit standards.`,
      keyFeatures: [
        "Immutable double-entry balance bookkeeping with cryptographic ledger hashes",
        "Sub-30ms atomic transaction validation with strict serializable isolation",
        "Asynchronous event-driven payment reconciliation via Apache Kafka",
        "Real-time anti-fraud rule evaluation and velocity threshold alerts",
        "Automated multi-currency FX conversion and clearing house handshakes"
      ],
      systemStats: {
        estimatedRPS: "12,000 tx/sec",
        latencyTarget: "< 35ms p95",
        databaseSize: "600 GB / year",
        scalabilityTier: "AWS Multi-AZ Aurora PostgreSQL + Kafka Active-Active"
      },
      functionalModules: [
        {
          id: "ledger",
          name: "Double-Entry Accounting Ledger Module",
          color: "emerald",
          items: ["Immutable Ledger Entries", "Journal Debits & Credits", "Atomic Balance Locking", "Multi-Currency Exchange Rates", "Audit Hash Verification"]
        },
        {
          id: "transfers",
          name: "Payment Gateway & Clearing Module",
          color: "blue",
          items: ["Idempotent API Handshake", "ACH / Wire & SEPA Transfers", "Webhook Dispatch & Retry", "Stripe / Plaid Banking Bridge", "Settlement Batches"]
        },
        {
          id: "fraud",
          name: "Risk, AML & Compliance Module",
          color: "rose",
          items: ["Velocity Spike Detection", "Sanctions & OFAC Screener", "Geofence IP Anomaly Flags", "Automated Account Freezes", "Regulatory Compliance Reports"]
        },
        {
          id: "accounts",
          name: "Customer Accounts & Vault Module",
          color: "amber",
          items: ["KYC Identity Verification", "Multi-Factor Biometrics", "Virtual Cards & Wallet Balances", "Statement PDF Generation", "Role-Based Officer Access"]
        }
      ],
      modules: [
        {
          id: "mod_ledger_core",
          name: "Core Ledger Engine (Go)",
          description: "Executes strict ACID double-entry journal operations with optimistic concurrency control.",
          responsibilities: ["Debits/Credits balance enforcement", "Optimistic lock checks", "Ledger serialization"]
        },
        {
          id: "mod_clearing_svc",
          name: "Payment Clearing Service",
          description: "Connects to banking payment rails with exponential backoff and idempotent retry tokens.",
          responsibilities: ["Idempotency verification", "Payment network protocol bridge", "Clearing reconciliation"]
        },
        {
          id: "mod_aml_engine",
          name: "Fraud & AML Telemetry Engine",
          description: "Real-time stream worker assessing incoming transactions against velocity rules.",
          responsibilities: ["Velocity window checks", "Machine learning anomaly score", "Suspicious activity reporting"]
        }
      ],
      database: {
        databaseType: "PostgreSQL 16 (Serializable ACID) + Redis 7",
        tables: [
          {
            id: "tbl_accounts",
            name: "Accounts",
            description: "Customer financial wallets and internal ledger accounts",
            fields: [
              { name: "account_id", type: "UUID", isPrimaryKey: true, description: "Account ID" },
              { name: "account_number", type: "VARCHAR(34)", description: "IBAN or Account Number" },
              { name: "currency", type: "VARCHAR(3)", description: "ISO 4217 Currency (USD, EUR)" },
              { name: "current_balance", type: "NUMERIC(18,4)", description: "Real-time cleared balance" },
              { name: "status", type: "VARCHAR(16)", description: "ACTIVE | FROZEN | CLOSED" },
              { name: "created_at", type: "TIMESTAMPTZ", description: "Creation date" }
            ]
          },
          {
            id: "tbl_journal",
            name: "Journal_Entries",
            description: "Immutable double-entry financial transactions",
            fields: [
              { name: "entry_id", type: "UUID", isPrimaryKey: true, description: "Entry ID" },
              { name: "idempotency_key", type: "VARCHAR(64)", description: "Client deduplication key" },
              { name: "source_account_id", type: "UUID", isForeignKey: true, description: "Debited account" },
              { name: "destination_account_id", type: "UUID", isForeignKey: true, description: "Credited account" },
              { name: "amount", type: "NUMERIC(18,4)", description: "Transaction value" },
              { name: "status", type: "VARCHAR(16)", description: "POSTED | PENDING | REVERSED" },
              { name: "executed_at", type: "TIMESTAMPTZ", description: "Timestamp of execution" }
            ]
          },
          {
            id: "tbl_aml",
            name: "AML_Audit_Logs",
            description: "Fraud screening results and compliance audit records",
            fields: [
              { name: "log_id", type: "UUID", isPrimaryKey: true, description: "Log ID" },
              { name: "entry_id", type: "UUID", isForeignKey: true, description: "Associated transaction" },
              { name: "risk_score", type: "NUMERIC(5,2)", description: "Calculated risk (0-100)" },
              { name: "flagged_reason", type: "TEXT", description: "Rule trigger description" },
              { name: "reviewed_by", type: "VARCHAR(64)", description: "Compliance officer ID" },
              { name: "created_at", type: "TIMESTAMPTZ", description: "Evaluation time" }
            ]
          }
        ],
        relationships: [
          { fromTable: "Journal_Entries", fromField: "source_account_id", toTable: "Accounts", toField: "account_id", type: "1:N", description: "Account initiates debit entries" },
          { fromTable: "Journal_Entries", fromField: "destination_account_id", toTable: "Accounts", toField: "account_id", type: "1:N", description: "Account receives credit entries" },
          { fromTable: "AML_Audit_Logs", fromField: "entry_id", toTable: "Journal_Entries", toField: "entry_id", type: "1:1", description: "Transactions undergo AML audits" }
        ]
      },
      apis: [
        { id: "api_1", method: "POST", endpoint: "/api/v1/transfers/execute", description: "Execute atomic balance transfer with idempotency", authentication: true, statusCodes: [200, 400, 409] },
        { id: "api_2", method: "GET", endpoint: "/api/v1/accounts/:id/balance", description: "Fetch certified current account balance", authentication: true, statusCodes: [200, 404] },
        { id: "api_3", method: "GET", endpoint: "/api/v1/accounts/:id/statement", description: "Retrieve paginated double-entry ledger history", authentication: true, statusCodes: [200] },
        { id: "api_4", method: "POST", endpoint: "/api/v1/webhooks/clearing", description: "Process inbound clearing house webhook", authentication: true, statusCodes: [200, 401] }
      ],
      architecture: {
        pattern: "CQRS with Event Sourcing & Strict ACID Database Core",
        components: [
          { id: "c_client", name: "FinTech Banking Client", layer: "Client", technology: "React.js + Mobile SDK", description: "Customer wallet and officer portal" },
          { id: "c_gw", name: "API Gateway & TLS", layer: "Gateway", technology: "Envoy / AWS ALB", description: "Mutual TLS and hardware security module" },
          { id: "c_ledger", name: "Core Ledger Service", layer: "Service", technology: "Go (High Reliability)", description: "Strict ACID double-entry balance manager" },
          { id: "c_kafka", name: "Financial Event Bus", layer: "Queue", technology: "Apache Kafka", description: "Immutable stream of all transaction events" },
          { id: "c_db", name: "PostgreSQL Primary", layer: "Database", technology: "AWS RDS PostgreSQL Multi-AZ", description: "ACID serializable persistence" },
          { id: "c_cache", name: "Balance Redis Cache", layer: "Cache", technology: "Redis 7 Cluster", description: "Sub-millisecond balance reads with TTL" }
        ],
        connections: [
          { from: "c_client", to: "c_gw", label: "HTTPS / TLS 1.3", protocol: "HTTPS" },
          { from: "c_gw", to: "c_ledger", label: "gRPC", protocol: "gRPC" },
          { from: "c_ledger", to: "c_db", label: "ACID Commit", protocol: "TCP" },
          { from: "c_ledger", to: "c_kafka", label: "Publish Event", protocol: "Kafka" },
          { from: "c_ledger", to: "c_cache", label: "Sync Balance", protocol: "RESP" }
        ]
      },
      technologyStack: [
        { category: "Frontend", name: "React.js", reason: "Responsive financial dashboard with encrypted field validation.", alternatives: ["Vue.js", "Angular"] },
        { category: "Backend", name: "Go", reason: "Memory-safe compiled performance for high-throughput financial transactions.", alternatives: ["Java (Spring Boot)", "Rust"] },
        { category: "Database", name: "PostgreSQL 16", reason: "Rock-solid ACID serializable transactions preventing double-spend anomalies.", alternatives: ["CockroachDB", "Oracle"] },
        { category: "Messaging", name: "Apache Kafka", reason: "Immutable event log enabling exact audit reconstruction and replay.", alternatives: ["AWS SQS", "RabbitMQ"] },
        { category: "Caching", name: "Redis 7", reason: "Fast balance inquiries offloading read pressure from core databases.", alternatives: ["Aerospike"] },
        { category: "Deployment", name: "AWS Multi-AZ RDS + EKS", reason: "PCI-DSS certified cloud environment with automatic failover.", alternatives: ["Google Cloud", "On-Premise"] }
      ],
      recommendations: [
        { category: "Security", title: "Mandatory Idempotency Keys", description: "Require unique UUID client idempotency tokens on all transfer APIs to prevent double debits.", priority: "High" },
        { category: "Architecture", title: "Double-Entry Balance Constraint", description: "Enforce zero-sum database checks: total debits must always equal total credits per journal transaction.", priority: "High" },
        { category: "Performance", title: "Read Replica Isolation", description: "Route all historical PDF statement generation to read replicas to safeguard write transactions.", priority: "High" }
      ],
      deployment: [
        { stage: "Security", step: "PCI-DSS Hardening", tool: "AWS Secrets Manager + KMS", details: "Encrypt database at rest and store API certificates in hardware HSM" },
        { stage: "Backend", step: "Ledger Containerization", tool: "Docker on AWS EKS", details: "Deploy Go microservices with PodDisruptionBudgets across 3 AZs" },
        { stage: "Database", step: "Multi-AZ PostgreSQL", tool: "AWS RDS PostgreSQL", details: "Provision primary and synchronous standby replica with auto-failover" },
        { stage: "Production", step: "Event Bus Rollout", tool: "Amazon MSK (Kafka)", details: "Multi-broker Kafka cluster with continuous encrypted snapshotting" }
      ]
    };
  }

  // 4. GAMING / REALTIME MULTIPLAYER / ESPORTS
  if (isGaming) {
    return {
      projectSummary: {
        projectName: cleanTitle,
        projectType: "Real-Time Multiplayer Game & Matchmaking Platform",
        architecture: "Low-Latency UDP / WebSocket Mesh with Dedicated Game Servers",
        frontend: "Unreal / Unity SDK + React Web Portal",
        backend: "C++ & Go (Agones)",
        database: "ScyllaDB / DynamoDB + Redis 7",
        authentication: "Session Ticket & OAuth 2.0 (Steam/Discord)",
        deployment: "Kubernetes (Agones) on AWS / GCP Edge Nodes"
      },
      visualTheme: "gaming",
      visualCard: {
        badge: "Game Backend",
        headline: cleanTitle,
        accentColor: "purple",
        icon: "activity"
      },
      summary: `${cleanTitle} is a low-latency game backend delivering real-time player matchmaking, state synchronization via UDP/WebSockets, inventory trading, and anti-cheat telemetry.`,
      keyFeatures: [
        "Sub-20ms tick-rate game state replication and reconciliation",
        "Skill-based matchmaking (SBMM / ELO) with regional latency grouping",
        "Dedicated containerized game server allocation via Google Agones",
        "Real-time anti-cheat telemetry ingestion and player ban enforcement",
        "Microtransaction store with atomic virtual inventory item trading"
      ],
      systemStats: {
        estimatedRPS: "30,000 packets/sec",
        latencyTarget: "< 25ms p95",
        databaseSize: "500 GB / year",
        scalabilityTier: "Agones Kubernetes Dedicated Game Server Auto-scaler"
      },
      functionalModules: [
        {
          id: "matchmaking",
          name: "Matchmaking & Lobby Engine",
          color: "purple",
          items: ["ELO Skill-Based Rating", "Regional Ping Grouping", "Party Management & Invites", "Lobby Chat & Voice Signaling", "Server Allocation Request"]
        },
        {
          id: "gamestate",
          name: "Real-time State Synchronization",
          color: "blue",
          items: ["UDP Packet Delta Compression", "Client Prediction & Lag Compensation", "Hit Registration Validation", "Spectator Stream Relay", "Match Replay Recorder"]
        },
        {
          id: "economy",
          name: "Player Economy & Inventory Module",
          color: "amber",
          items: ["Virtual Item Inventory", "Loot Drops & Rewards", "Battle Pass Progression", "In-Game Marketplace", "Currency Balance Protection"]
        },
        {
          id: "anticheat",
          name: "Anti-Cheat & Telemetry Vault",
          color: "rose",
          items: ["Aim & Movement Anomaly Detection", "Hardware Ban Enforcement", "Speed Hack Telemetry Checks", "Player Report Triage", "Audited Admin Action Logs"]
        }
      ],
      modules: [
        {
          id: "mod_matchmaker",
          name: "Open Match Matchmaker (Go)",
          description: "Pools queued players, evaluates latency brackets, and issues game server allocations.",
          responsibilities: ["Match pool evaluation", "Regional ticket sorting", "Agones server claim"]
        },
        {
          id: "mod_game_server",
          name: "Dedicated Game Server (C++)",
          description: "Authoritative physics and game state runner communicating with clients via UDP.",
          responsibilities: ["Authoritative state simulation", "Client prediction sync", "Match outcome reporting"]
        }
      ],
      database: {
        databaseType: "ScyllaDB (NoSQL) + Redis 7 + PostgreSQL 16",
        tables: [
          {
            id: "tbl_players",
            name: "Players",
            description: "Player profiles, skill ratings, and bans",
            fields: [
              { name: "player_id", type: "UUID", isPrimaryKey: true, description: "Player ID" },
              { name: "username", type: "VARCHAR(48)", description: "Gamer tag" },
              { name: "elo_rating", type: "INTEGER", description: "Matchmaking skill rating" },
              { name: "region", type: "VARCHAR(16)", description: "NA | EU | APAC" },
              { name: "is_banned", type: "BOOLEAN", description: "Anti-cheat ban flag" }
            ]
          },
          {
            id: "tbl_matches",
            name: "Matches",
            description: "Completed match records and outcome statistics",
            fields: [
              { name: "match_id", type: "UUID", isPrimaryKey: true, description: "Match ID" },
              { name: "server_ip", type: "VARCHAR(64)", description: "Hosting node" },
              { name: "duration_sec", type: "INTEGER", description: "Match length" },
              { name: "winner_team", type: "VARCHAR(32)", description: "Winning faction" },
              { name: "ended_at", type: "TIMESTAMPTZ", description: "Match end timestamp" }
            ]
          }
        ],
        relationships: []
      },
      apis: [
        { id: "api_1", method: "POST", endpoint: "/api/v1/matchmaking/queue", description: "Queue player for matchmaking ticket", authentication: true, statusCodes: [200, 403] },
        { id: "api_2", method: "GET", endpoint: "/api/v1/inventory", description: "Retrieve player skins and unlocked items", authentication: true, statusCodes: [200] },
        { id: "api_3", method: "POST", endpoint: "/api/v1/anticheat/report", description: "Submit client movement telemetry sample", authentication: true, statusCodes: [202] }
      ],
      architecture: {
        pattern: "Agones Kubernetes Game Server Mesh with Redis State",
        components: [
          { id: "c_client", name: "Game Client (Unity/Unreal)", layer: "Client", technology: "Unreal Engine / Unity C#", description: "Player game client" },
          { id: "c_agones", name: "Agones Dedicated Servers", layer: "Service", technology: "C++ on Agones (K8s)", description: "Authoritative match simulation" },
          { id: "c_redis", name: "Matchmaking State", layer: "Cache", technology: "Redis 7 Cluster", description: "Queues and active session tickets" },
          { id: "c_db", name: "Player & Inventory DB", layer: "Database", technology: "PostgreSQL 16", description: "Persistent accounts and cosmetic gear" }
        ],
        connections: [
          { from: "c_client", to: "c_agones", label: "UDP / WebSockets", protocol: "UDP" },
          { from: "c_agones", to: "c_redis", label: "Heartbeat", protocol: "RESP" },
          { from: "c_agones", to: "c_db", label: "Save Outcome", protocol: "TCP" }
        ]
      },
      technologyStack: [
        { category: "Frontend", name: "React.js + Game SDK", reason: "Web player portal and game companion apps.", alternatives: ["Vue.js"] },
        { category: "Backend", name: "Go & C++", reason: "Sub-millisecond game state updates and scalable matchmakers.", alternatives: ["Rust"] },
        { category: "Database", name: "PostgreSQL + Redis", reason: "ACID inventory combined with in-memory matchmaking queues.", alternatives: ["ScyllaDB"] },
        { category: "Deployment", name: "Agones on Kubernetes", reason: "Standard open-source orchestrator for dedicated game servers.", alternatives: ["AWS GameLift"] }
      ],
      recommendations: [
        { category: "Performance", title: "UDP Fast-Path Transport", description: "Use UDP with delta compression rather than TCP to avoid head-of-line blocking.", priority: "High" }
      ],
      deployment: [
        { stage: "Cluster", step: "Agones Provisioning", tool: "Google Cloud GKE / AWS EKS", details: "Deploy Agones game server CRDs and regional node pools" }
      ]
    };
  }

  // 5. DEFAULT INTELLIGENT DOMAIN SYNTHESIZER
  // Dynamically parses the user's specific title and creates customized subsystem modules
  const topicWords = cleanTitle.split(/\s+/).filter(w => w.length > 2);
  const primaryTopic = topicWords[0] || "Core";
  const secondaryTopic = topicWords[1] || "System";

  let detectedTheme = "general";
  let detectedBadge = "Cloud System";
  let detectedAccent = "indigo";
  let detectedIcon = "terminal";

  if (isHealth) {
    detectedTheme = "healthcare";
    detectedBadge = "Health & Clinic";
    detectedAccent = "emerald";
    detectedIcon = "activity";
  } else if (isEdu) {
    detectedTheme = "education";
    detectedBadge = "Edu & Campus";
    detectedAccent = "blue";
    detectedIcon = "globe";
  } else if (isSocial) {
    detectedTheme = "social";
    detectedBadge = "Social & Chat";
    detectedAccent = "purple";
    detectedIcon = "globe";
  } else if (isMedia) {
    detectedTheme = "media";
    detectedBadge = "Media & Stream";
    detectedAccent = "rose";
    detectedIcon = "activity";
  } else if (isRides) {
    detectedTheme = "rides";
    detectedBadge = "Rides & Fleet";
    detectedAccent = "amber";
    detectedIcon = "globe";
  } else if (isFood) {
    detectedTheme = "food";
    detectedBadge = "Food & Dining";
    detectedAccent = "amber";
    detectedIcon = "activity";
  } else if (isEcom) {
    detectedTheme = "ecommerce";
    detectedBadge = "E-Commerce";
    detectedAccent = "rose";
    detectedIcon = "database";
  } else if (isEvent) {
    detectedTheme = "event";
    detectedBadge = "Event & Tickets";
    detectedAccent = "purple";
    detectedIcon = "shield";
  } else if (isRealEstate) {
    detectedTheme = "realestate";
    detectedBadge = "Real Estate";
    detectedAccent = "sky";
    detectedIcon = "globe";
  } else if (isFitness) {
    detectedTheme = "fitness";
    detectedBadge = "Fitness & Health";
    detectedAccent = "rose";
    detectedIcon = "activity";
  } else if (isSecurity) {
    detectedTheme = "cybersecurity";
    detectedBadge = "Cybersecurity";
    detectedAccent = "cyan";
    detectedIcon = "shield";
  }

  return {
    projectSummary: {
      projectName: cleanTitle,
      projectType: "Modern Scalable Distributed Application",
      architecture: "Microservices Architecture with API Gateway",
      frontend: "React.js + Tailwind CSS",
      backend: "Node.js (Express) & Go",
      database: "PostgreSQL 16 + Redis 7",
      authentication: "OAuth 2.0 / JWT with RBAC",
      deployment: "Docker Containers on AWS EKS"
    },
    visualTheme: detectedTheme,
    visualCard: {
      badge: detectedBadge,
      headline: cleanTitle,
      accentColor: detectedAccent,
      icon: detectedIcon
    },
    summary: `${cleanTitle} is a production-grade software platform engineered specifically for ${cleanTitle.toLowerCase()}. It couples a responsive client interface with modular microservices, an indexed relational database, in-memory caching, and automated cloud scaling.`,
    keyFeatures: [
      `Dedicated domain orchestration engine tailored for ${cleanTitle}`,
      "Role-Based Access Control (RBAC) with secure cryptographic token validation",
      "Sub-80ms p95 response times backed by Redis in-memory query caching",
      "Automated asynchronous task processing and audit telemetry logging",
      "Multi-AZ database persistence with automated zero-downtime backups"
    ],
    systemStats: {
      estimatedRPS: "4,000 req/sec",
      latencyTarget: "< 60ms p95",
      databaseSize: "350 GB / year",
      scalabilityTier: "AWS ECS / Docker Kubernetes Cluster Auto-scaler"
    },
    functionalModules: [
      {
        id: "mod_core",
        name: `${primaryTopic} Management Module`,
        color: "blue",
        items: [`${primaryTopic} Registration & Identity`, `Browse & Search ${secondaryTopic}`, "Workflow Status Tracking", "Resource Operations", "User Notifications"]
      },
      {
        id: "mod_ops",
        name: `${secondaryTopic} Operations Module`,
        color: "green",
        items: ["Partner & Operator Portal", "Inventory / Resource Scheduling", "Transaction Processing", "Real-Time Telemetry Updates", "Automated Billing & Invoices"]
      },
      {
        id: "mod_admin",
        name: "Admin Governance & Analytics Module",
        color: "amber",
        items: ["Executive Dashboard", "Role & Permission Management", "Audit Event Logs", "Platform Security Compliance", "Reports & Aggregated Metrics"]
      }
    ],
    modules: [
      {
        id: "mod_user_svc",
        name: `${primaryTopic} Core Service`,
        description: `Handles primary operational business rules and transaction orchestration for ${cleanTitle}.`,
        responsibilities: ["Domain business rules", "Workflow state transitions", "Validation logic"]
      },
      {
        id: "mod_notify_svc",
        name: "Notification & Event Service",
        description: "Dispatches asynchronous email, SMS, and push notifications upon workflow transitions.",
        responsibilities: ["Event queue consumption", "Multi-channel delivery", "Template rendering"]
      },
      {
        id: "mod_analytics_svc",
        name: "Reporting & Analytics Service",
        description: "Aggregates metrics and generates operational KPIs for management dashboards.",
        responsibilities: ["Metric rollups", "Scheduled exports", "Anomaly alerts"]
      }
    ],
    database: {
      databaseType: "PostgreSQL 16 (Relational Core) + Redis 7",
      tables: [
        {
          id: "tbl_users",
          name: "Users",
          description: "System user profiles, credentials, and access roles",
          fields: [
            { name: "user_id", type: "UUID", isPrimaryKey: true, description: "Primary Key" },
            { name: "full_name", type: "VARCHAR(128)", description: "User full name" },
            { name: "email", type: "VARCHAR(255)", description: "Unique email" },
            { name: "role", type: "VARCHAR(32)", description: "ADMIN | OPERATOR | USER" },
            { name: "created_at", type: "TIMESTAMPTZ", description: "Account creation date" }
          ]
        },
        {
          id: "tbl_entities",
          name: `${primaryTopic}_Records`,
          description: `Core data entities for ${cleanTitle}`,
          fields: [
            { name: "record_id", type: "UUID", isPrimaryKey: true, description: "Record ID" },
            { name: "user_id", type: "UUID", isForeignKey: true, description: "Owner user FK" },
            { name: "title", type: "VARCHAR(255)", description: "Record name/title" },
            { name: "status", type: "VARCHAR(32)", description: "ACTIVE | PENDING | ARCHIVED" },
            { name: "metadata", type: "JSONB", description: "Dynamic attributes" },
            { name: "created_at", type: "TIMESTAMPTZ", description: "Creation timestamp" }
          ]
        },
        {
          id: "tbl_tx",
          name: "Activity_Transactions",
          description: "Operational transactions and audit history",
          fields: [
            { name: "tx_id", type: "UUID", isPrimaryKey: true, description: "Transaction ID" },
            { name: "record_id", type: "UUID", isForeignKey: true, description: "Associated record FK" },
            { name: "action_type", type: "VARCHAR(64)", description: "Action performed" },
            { name: "performed_by", type: "UUID", isForeignKey: true, description: "User FK" },
            { name: "timestamp", type: "TIMESTAMPTZ", description: "Audit execution time" }
          ]
        }
      ],
      relationships: [
        { fromTable: `${primaryTopic}_Records`, fromField: "user_id", toTable: "Users", toField: "user_id", type: "1:N", description: "Users own multiple domain records" },
        { fromTable: "Activity_Transactions", fromField: "record_id", toTable: `${primaryTopic}_Records`, toField: "record_id", type: "1:N", description: "Records accumulate audit transactions" }
      ]
    },
    apis: [
      { id: "api_1", method: "POST", endpoint: "/api/v1/auth/login", description: "Authenticate user and issue JWT", authentication: false, statusCodes: [200, 401] },
      { id: "api_2", method: "GET", endpoint: "/api/v1/records", description: `Query paginated ${primaryTopic} records`, authentication: true, statusCodes: [200] },
      { id: "api_3", method: "POST", endpoint: "/api/v1/records", description: `Create new ${primaryTopic} record`, authentication: true, statusCodes: [201, 400] },
      { id: "api_4", method: "GET", endpoint: "/api/v1/records/:id", description: "Fetch specific record details", authentication: true, statusCodes: [200, 404] },
      { id: "api_5", method: "PUT", endpoint: "/api/v1/records/:id/status", description: "Update operational workflow status", authentication: true, statusCodes: [200, 400] }
    ],
    architecture: {
      pattern: "Microservices Architecture with API Gateway",
      components: [
        { id: "c_client", name: "Client UI", layer: "Client", technology: "React.js + Tailwind", description: "Responsive web client" },
        { id: "c_gw", name: "API Gateway (Nginx)", layer: "Gateway", technology: "Nginx Gateway", description: "Reverse proxy, rate limiting, and TLS" },
        { id: "c_core", name: `${primaryTopic} Service`, layer: "Service", technology: "Node.js (Express)", description: "Core domain business logic" },
        { id: "c_db", name: "PostgreSQL Database", layer: "Database", technology: "PostgreSQL 16", description: "Persistent relational store" },
        { id: "c_cache", name: "Redis Cache", layer: "Cache", technology: "Redis 7", description: "Query caching and session store" }
      ],
      connections: [
        { from: "c_client", to: "c_gw", label: "HTTPS / REST", protocol: "HTTPS" },
        { from: "c_gw", to: "c_core", label: "Route Request", protocol: "HTTP" },
        { from: "c_core", to: "c_db", label: "Persist", protocol: "TCP" },
        { from: "c_core", to: "c_cache", label: "Cache Read/Write", protocol: "RESP" }
      ]
    },
    technologyStack: [
      { category: "Frontend", name: "React.js", reason: "Component-based architecture with reactive state.", alternatives: ["Vue.js", "Next.js"] },
      { category: "Backend", name: "Node.js (Express)", reason: "Asynchronous I/O handling concurrent REST APIs.", alternatives: ["Go", "FastAPI"] },
      { category: "Database", name: "PostgreSQL 16", reason: "ACID compliance, JSONB support, and indexing reliability.", alternatives: ["MySQL", "MongoDB"] },
      { category: "Caching", name: "Redis 7", reason: "Sub-millisecond query caching and rate-limiting storage.", alternatives: ["Memcached"] },
      { category: "Deployment", name: "Docker on AWS", reason: "Standardized container orchestration.", alternatives: ["Google Cloud", "Azure"] }
    ],
    recommendations: [
      { category: "Architecture", title: "Automated Horizontal Scaling", description: "Configure CPU and memory target tracking autoscaling on container tasks.", priority: "High" },
      { category: "Security", title: "Zero Trust Token Verification", description: "Sign all API requests with asymmetric RSA-256 JWTs with 15-minute TTLs.", priority: "High" }
    ],
    deployment: [
      { stage: "Frontend", step: "Frontend Deployment", tool: "AWS S3 + CloudFront", details: "Global CDN distribution of static assets" },
      { stage: "Backend", step: "Backend Microservices", tool: "Docker on AWS EKS", details: "Containerized autoscaling service pods" },
      { stage: "Database", step: "Database Hosting", tool: "AWS RDS PostgreSQL", details: "Multi-AZ relational database deployment" }
    ]
  };
}
