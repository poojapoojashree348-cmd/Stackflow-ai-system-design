/**
 * Intelligent Domain Architecture Engine
 * Automatically derives customized, production-grade technical system designs,
 * architectures, technology stacks, databases, modules, and visual themes
 * strictly according to the specific project topic, domain, and description.
 */

export interface SystemDesignResult {
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
  visualBadge: string;
  visualCard?: {
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
    statusCodes: number[];
  }>;
  architecture: {
    pattern: string;
    components: Array<{
      id: string;
      name: string;
      layer: string;
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
    category: string;
    name: string;
    reason: string;
    alternatives: string[];
  }>;
  recommendations: Array<{
    category: string;
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

export function detectDomainCategory(title: string, description: string = ""): string {
  const text = `${title} ${description}`.toLowerCase();

  if (/drone|uav|quadcopter|aerial|flight|avionics|autopilot|rover|robot|swarm/.test(text)) return "drones";
  if (/ai\b|artificial intelligence|machine learning|llm|deep learning|computer vision|neural|nlp|rag|embeddings|agentic/.test(text)) return "ai";
  if (/cyber|security|threat|siem|soc|firewall|zero trust|vulnerability|malware|intrusion|cve|penetration|auth0|waf/.test(text)) return "security";
  if (/blockchain|crypto|web3|ethereum|solana|smart contract|nft|defi|token|dao|ledger|bitcoin/.test(text)) return "blockchain";
  if (/stream|video stream|live stream|audio stream|webrtc|hls|broadcasting|podcast|ott|rtmp/.test(text)) return "streaming";
  if (/game|gaming|multiplayer|matchmaking|metaverse|esport|unity|unreal|leaderboard|pvp/.test(text)) return "gaming";
  if (/logistics|supply chain|warehouse|freight|cargo|shipping|truck|fleet management|dispatch|route optimization|inventory/.test(text)) return "logistics";
  if (/iot|sensor|smart home|smart city|telemetry|microcontroller|mqtt|zigbee|embedded|scada|hardware/.test(text)) return "iot";
  if (/devops|cloud infra|kubernetes|ci\/cd|observability|docker|terraform|monitoring|cluster|sre/.test(text)) return "devops";
  if (/event|conference|ticket|registration|workshop|hackathon|seminar|summit|meetup/.test(text)) return "event";
  if (/food|restaurant|dine|dish|meal|swiggy|zomato|recipe|kitchen|order food/.test(text)) return "food";
  if (/shop|ecommerce|e-commerce|store|cart|retail|checkout|marketplace|catalog|merchandise/.test(text)) return "ecommerce";
  if (/health|doctor|clinic|patient|hospital|telemedicine|medical|medicine|pharma|ehr|fhir/.test(text)) return "healthcare";
  if (/ride|taxi|cab|uber|passenger|driver|commute|transport|fare/.test(text)) return "rides";
  if (/school|college|university|student|course|learn|education|lms|academy|curriculum|exam/.test(text)) return "education";
  if (/fintech|bank|payment|wallet|loan|stock|credit|invest|trading|wire transfer|clearing/.test(text)) return "fintech";
  if (/social|chat|message|feed|community|network|follow|forum|dating|post/.test(text)) return "social";
  if (/real estate|property|housing|apartment|tenant|lease|realty|mortgage|landlord/.test(text)) return "realestate";
  if (/fitness|gym|workout|exercise|calorie|athlete|trainer|running|sports/.test(text)) return "fitness";

  return "custom";
}

export function generateDomainDesign(title: string, description: string = ""): SystemDesignResult {
  const cleanTitle = title.trim();
  const domain = detectDomainCategory(cleanTitle, description);

  switch (domain) {
    case "drones":
      return {
        projectSummary: {
          projectName: cleanTitle,
          projectType: "Autonomous Robotics & Aerial Fleet Platform",
          architecture: "Edge-Distributed Event-Driven Architecture with Real-Time Telemetry Gateway",
          frontend: "React.js + WebGL / Deck.gl (3D Ground Control Console)",
          backend: "Rust (Avionics & Edge) + Go (High-Throughput Fleet Dispatch)",
          database: "TimescaleDB (Sensor Time-Series) + PostgreSQL 16",
          authentication: "mTLS + Hardware Enclave Tokens",
          deployment: "AWS IoT Greengrass + Hybrid Edge Nodes"
        },
        visualTheme: "drones",
        visualBadge: "Drone Fleet",
        visualCard: {
          badge: "Drone Fleet",
          headline: "Autonomous Aerial Control",
          accentColor: "#38bdf8",
          icon: "🛸"
        },
        summary: `${cleanTitle} is a mission-critical autonomous drone fleet management platform engineered for real-time aerial surveillance, automated route dispatching, and sub-50ms telemetry monitoring. It orchestrates BVLOS (Beyond Visual Line of Sight) flights through encrypted MQTT channels, onboard computer vision obstacle avoidance, and dynamic airspace geofencing.`,
        keyFeatures: [
          "Real-time 3D flight telemetry streaming at 60Hz with low-latency WebSocket & MQTT pipelines",
          "Automated waypoint generation with dynamic 3D airspace obstacle avoidance and weather telemetry",
          "Edge-based computer vision inferencing for object tracking and live target thermal detection",
          "Fail-safe return-to-launch (RTL) trigger protocols and emergency parachute deployment monitoring",
          "Automated battery hot-swap docking station scheduling and fleet health diagnostics"
        ],
        systemStats: {
          estimatedRPS: "12,000 req/sec",
          latencyTarget: "< 35ms p95",
          databaseSize: "1.2 TB / year",
          scalabilityTier: "Hybrid Edge-Cloud Kubernetes with AWS IoT Core"
        },
        functionalModules: [
          {
            id: "avionics",
            name: "Flight Avionics & Telemetry Stream",
            color: "blue",
            items: ["BVLOS Telemetry Ingestion", "6-DoF Gyroscope & GPS Sync", "Live Battery Voltage Telemetry", "Wind Shear & Thermal Drift Alert", "Emergency RTL Execution"]
          },
          {
            id: "dispatch",
            name: "Airspace Geofence & Mission Dispatch",
            color: "green",
            items: ["Multi-Waypoint Path Calculation", "No-Fly Zone Polygon Validation", "Autonomous Swarm Collision Avoidance", "Payload Release Controller", "Mission Replay & Blackbox Logging"]
          },
          {
            id: "operations",
            name: "Ground Station & Fleet Governance",
            color: "amber",
            items: ["Pilot Remote Override Console", "Docking Pad Battery Management", "FAA / CAA Regulatory Compliance", "Maintenance & Motor Wear Telemetry", "Encrypted HD Video Feed Dispatch"]
          }
        ],
        modules: [
          {
            id: "mod_avionics",
            name: "Flight Avionics & Telemetry Stream",
            description: "Direct UDP/MQTT ingestion daemon communicating with onboard flight controllers (PX4 / ArduPilot).",
            responsibilities: ["BVLOS Telemetry Ingestion", "6-DoF Gyroscope & GPS Sync", "Live Battery Voltage Telemetry", "Wind Shear Alert", "Emergency RTL Execution"]
          },
          {
            id: "mod_dispatch",
            name: "Airspace Geofence & Mission Dispatch",
            description: "Spatial path planning microservice coordinating multi-drone missions with terrain elevation data.",
            responsibilities: ["Multi-Waypoint Path Calculation", "No-Fly Zone Validation", "Swarm Collision Avoidance", "Payload Release Controller", "Mission Replay Logging"]
          },
          {
            id: "mod_operations",
            name: "Ground Station & Fleet Governance",
            description: "Centralized operator console with real-time video feeds, FAA compliance auditing, and hardware diagnostics.",
            responsibilities: ["Pilot Remote Override Console", "Docking Pad Battery Management", "FAA Compliance Audit", "Motor Wear Diagnostics", "HD Video Feed Dispatch"]
          }
        ],
        database: {
          databaseType: "TimescaleDB (Time-Series Sensor Store) + PostgreSQL (Metadata)",
          tables: [
            {
              id: "tbl_drones",
              name: "Drones",
              description: "Hardware registration, hardware serial, and onboard sensor capabilities.",
              fields: [
                { name: "drone_id", type: "UUID", isPrimaryKey: true, description: "Unique aircraft serial UUID" },
                { name: "model_type", type: "VARCHAR(50)", isNullable: false, description: "Quadcopter / Hexacopter / Fixed-wing" },
                { name: "battery_cycles", type: "INT", isNullable: false, description: "Battery charge count" },
                { name: "firmware_version", type: "VARCHAR(30)", isNullable: false, description: "Onboard PX4 firmware" },
                { name: "status", type: "VARCHAR(30)", isNullable: false, description: "Airborne / Charging / Standby / Maintenance" }
              ]
            },
            {
              id: "tbl_telemetry",
              name: "Sensor_Telemetry",
              description: "High-frequency time-series spatial coordinates, roll, pitch, yaw, and speed.",
              fields: [
                { name: "telemetry_id", type: "BIGINT", isPrimaryKey: true, description: "Sequential time-series log ID" },
                { name: "drone_id", type: "UUID", isForeignKey: true, references: "Drones.drone_id", description: "Aircraft reference" },
                { name: "latitude", type: "DECIMAL(10,7)", isNullable: false, description: "GPS Latitude" },
                { name: "longitude", type: "DECIMAL(10,7)", isNullable: false, description: "GPS Longitude" },
                { name: "altitude_m", type: "DECIMAL(6,2)", isNullable: false, description: "Altitude above ground level" },
                { name: "speed_mps", type: "DECIMAL(5,2)", isNullable: false, description: "Airspeed in m/s" },
                { name: "timestamp", type: "TIMESTAMP", isNullable: false, description: "UTC time-bucket sample" }
              ]
            },
            {
              id: "tbl_missions",
              name: "Flight_Missions",
              description: "Planned aerial paths, objective parameters, and completion records.",
              fields: [
                { name: "mission_id", type: "UUID", isPrimaryKey: true, description: "Mission identifier" },
                { name: "drone_id", type: "UUID", isForeignKey: true, references: "Drones.drone_id", description: "Assigned aircraft" },
                { name: "flight_plan", type: "JSONB", isNullable: false, description: "Polygon coordinates and waypoints" },
                { name: "scheduled_departure", type: "TIMESTAMP", isNullable: false, description: "Departure time" },
                { name: "mission_status", type: "VARCHAR(30)", isNullable: false, description: "Pending / In-Flight / Completed / Aborted" }
              ]
            },
            {
              id: "tbl_geofence",
              name: "Geofence_Zones",
              description: "Restricted no-fly zones, temporary flight restrictions, and elevation ceilings.",
              fields: [
                { name: "zone_id", type: "UUID", isPrimaryKey: true, description: "Zone identifier" },
                { name: "boundary_polygon", type: "GEOMETRY(POLYGON, 4326)", isNullable: false, description: "PostGIS spatial polygon" },
                { name: "max_altitude_m", type: "INT", isNullable: false, description: "Restricted altitude ceiling" },
                { name: "restriction_type", type: "VARCHAR(50)", isNullable: false, description: "Airport / Military / Temporary Event" }
              ]
            },
            {
              id: "tbl_docking",
              name: "Docking_Stations",
              description: "Automated ground charging nests, landing beacons, and replacement battery racks.",
              fields: [
                { name: "station_id", type: "UUID", isPrimaryKey: true, description: "Nest identifier" },
                { name: "lat_lng", type: "GEOMETRY(POINT, 4326)", isNullable: false, description: "Geographic position" },
                { name: "available_batteries", type: "INT", isNullable: false, description: "Charged spare batteries" },
                { name: "pad_status", type: "VARCHAR(30)", isNullable: false, description: "Clear / Occupied / Maintenance" }
              ]
            }
          ],
          relationships: [
            { fromTable: "Sensor_Telemetry", fromField: "drone_id", toTable: "Drones", toField: "drone_id", type: "1:N", description: "Drones emit time-series telemetry streams." },
            { fromTable: "Flight_Missions", fromField: "drone_id", toTable: "Drones", toField: "drone_id", type: "1:N", description: "Drones execute scheduled flight missions." }
          ]
        },
        apis: [
          { id: "api_plan", method: "POST", endpoint: "/api/v1/missions/plan", description: "Generate obstacle-free 3D flight plan", authentication: true, statusCodes: [201, 400] },
          { id: "api_telemetry", method: "GET", endpoint: "/api/v1/drones/{id}/telemetry", description: "Fetch live 60Hz telemetry stream", authentication: true, statusCodes: [200, 404] },
          { id: "api_abort", method: "POST", endpoint: "/api/v1/drones/{id}/abort", description: "Execute emergency Return-To-Launch (RTL)", authentication: true, statusCodes: [200, 409] },
          { id: "api_fleet", method: "GET", endpoint: "/api/v1/fleet/status", description: "Get active fleet operational positions", authentication: true, statusCodes: [200] },
          { id: "api_geofence", method: "POST", endpoint: "/api/v1/geofence/update", description: "Sync real-time FAA no-fly polygons", authentication: true, statusCodes: [200, 403] },
          { id: "api_dock", method: "PUT", endpoint: "/api/v1/docking/{id}/reserve", description: "Reserve charging nest for landing", authentication: true, statusCodes: [200, 409] }
        ],
        architecture: {
          pattern: "Edge-Distributed Event-Driven Architecture with Real-Time Telemetry Gateway",
          components: [
            { id: "c_uav", name: "Autonomous Drone (Onboard PX4)", layer: "Client", technology: "Rust + ROS2 (Robotics OS)", description: "Onboard flight controller and obstacle avoidance" },
            { id: "c_gw", name: "MQTT / WSS Telemetry Gateway", layer: "Gateway", technology: "EMQX + Envoy", description: "High-throughput telemetry ingestion & auth proxy" },
            { id: "c_disp", name: "Mission Dispatch & Geofence Engine", layer: "Service", technology: "Go (High Concurrency)", description: "Dynamic spatial 3D path planner and conflict solver" },
            { id: "c_video", name: "WebRTC Video Transcoder", layer: "Service", technology: "C++ / GStreamer", description: "Low-latency FPV video streaming to ground station" },
            { id: "c_db", name: "TimescaleDB + PostGIS", layer: "Database", technology: "TimescaleDB 2.14", description: "Spatial spatial queries and high-volume telemetry" }
          ],
          connections: [
            { from: "c_uav", to: "c_gw", label: "Encrypted MAVLink / MQTT", protocol: "MQTT" },
            { from: "c_gw", to: "c_disp", label: "gRPC Stream", protocol: "gRPC" },
            { from: "c_uav", to: "c_video", label: "H.265 FPV Stream", protocol: "WebRTC" },
            { from: "c_disp", to: "c_db", label: "SQL Telemetry Inserts", protocol: "TCP" }
          ]
        },
        technologyStack: [
          { category: "Edge & Avionics", name: "Rust + ROS2", reason: "Memory-safe, zero-cost abstraction runtime for real-time flight controllers.", alternatives: ["C++", "FreeRTOS"] },
          { category: "Backend Engine", name: "Go", reason: "Compiled concurrency optimized for handling 50k+ continuous telemetry streams.", alternatives: ["Rust", "Elixir"] },
          { category: "Telemetry Broker", name: "EMQX", reason: "Carrier-grade distributed MQTT broker supporting millions of concurrent device connections.", alternatives: ["RabbitMQ", "Apache Kafka"] },
          { category: "Time-Series Store", name: "TimescaleDB", reason: "Hypertables optimize spatial GPS coordinates with sub-second aggregate queries.", alternatives: ["InfluxDB", "ClickHouse"] },
          { category: "Frontend Map", name: "React.js + Deck.gl", reason: "Hardware-accelerated 3D geospatial rendering of multi-drone trajectories.", alternatives: ["Cesium.js", "Three.js"] },
          { category: "Deployment", name: "AWS IoT Greengrass", reason: "Seamless deployment of containerized compute to ground station edge hardware.", alternatives: ["K3s", "Balena"] }
        ],
        recommendations: [
          { category: "Safety", title: "Hardware Watchdog Timers", description: "Deploy hardware watchdogs to trigger automatic Return-To-Launch if software stalls for > 500ms.", priority: "High" },
          { category: "Performance", title: "Spatial R-Tree Indexing", description: "Use PostGIS R-Tree indexes on no-fly zone polygons to evaluate geofence breaches in < 2ms.", priority: "High" },
          { category: "Security", title: "MAVLink Encryption", description: "Enforce AES-256 GCM encryption on all command telemetry packets to eliminate GPS spoofing.", priority: "High" }
        ],
        deployment: [
          { stage: "Edge", step: "Avionics Firmware", tool: "AWS IoT Greengrass", details: "OTA Firmware → Deployed over 5G/SatCom" },
          { stage: "Cloud", step: "Dispatch Backend", tool: "AWS EKS (Kubernetes)", details: "Backend → Distributed Go pods across 3 AZs" },
          { stage: "Storage", step: "Spatial Database", tool: "AWS RDS PostgreSQL (TimescaleDB)", details: "Storage → Managed multi-AZ time-series cluster" },
          { stage: "CI/CD", step: "Simulation Testing", tool: "GitHub Actions + Gazebo", details: "CI/CD → Automated SITL (Software In The Loop) simulation runs" }
        ]
      };

    case "ai":
      return {
        projectSummary: {
          projectName: cleanTitle,
          projectType: "Enterprise AI & LLM Inference Platform",
          architecture: "Asynchronous Inference Pipeline with Vector Knowledge RAG Engine",
          frontend: "Next.js 14 + Tailwind CSS (Interactive Canvas)",
          backend: "Python (FastAPI + PyTorch) + Go (Token Proxy)",
          database: "Pinecone / Qdrant (Vector DB) + PostgreSQL (Metadata)",
          authentication: "OAuth2 + Fine-Grained API Token Vault",
          deployment: "Kubernetes (NVIDIA GPU Cluster) + AWS"
        },
        visualTheme: "ai",
        visualBadge: "AI Core",
        visualCard: {
          badge: "AI Core",
          headline: "Neural Model Pipeline",
          accentColor: "#06b6d4",
          icon: "⚡"
        },
        summary: `${cleanTitle} is a high-throughput generative AI infrastructure platform built for ultra-fast model inference, vector embedding retrieval (RAG), and multi-agent coordination. It orchestrates GPU hardware queues, streaming token outputs, and semantic caching to slash p99 latencies while upholding enterprise security and token governance.`,
        keyFeatures: [
          "Streaming token inference with HTTP Server-Sent Events (SSE) and WebSocket channels",
          "High-dimensional vector search across millions of enterprise documents with sub-20ms cosine similarity",
          "Semantic caching layer (GPTCache / Redis) achieving up to 40% reduction in GPU computing costs",
          "Multi-agent task orchestration with tool-calling function execution and self-healing retries",
          "Automated token usage governance, model cost allocation, and toxic prompt sanitization"
        ],
        systemStats: {
          estimatedRPS: "8,500 req/sec",
          latencyTarget: "< 60ms first-token",
          databaseSize: "2.4 TB / year",
          scalabilityTier: "AWS EKS GPU Cluster (A100 / H100 Auto-Scaler)"
        },
        functionalModules: [
          {
            id: "inference",
            name: "Model Inference & GPU Scheduler",
            color: "blue",
            items: ["Dynamic Tensor Batching", "vLLM / TensorRT Engine", "Streaming Token Generator", "Quantization (INT8/FP16)", "GPU Memory Paging (vLLM)"]
          },
          {
            id: "rag",
            name: "Vector Knowledge & RAG Engine",
            color: "green",
            items: ["Semantic Chunking Pipeline", "Dense Vector Embeddings", "HNSW Approximate Nearest Neighbor", "Hybrid BM25 Re-Ranking", "Knowledge Graph Augmentation"]
          },
          {
            id: "governance",
            name: "Agent Guardrails & Analytics",
            color: "amber",
            items: ["Prompt Injection Shield", "PII Redaction Engine", "Token Usage Rate Limiter", "Cost Attribution Dashboard", "Model Accuracy Benchmarking"]
          }
        ],
        modules: [
          {
            id: "mod_inference",
            name: "Model Inference & GPU Scheduler",
            description: "High-throughput serving layer leveraging vLLM / Triton Inference Server with dynamic continuous batching.",
            responsibilities: ["Dynamic Tensor Batching", "vLLM Engine", "Streaming Token Generator", "Quantization", "GPU Paging"]
          },
          {
            id: "mod_rag",
            name: "Vector Knowledge & RAG Engine",
            description: "Distributed document parsing and semantic retrieval pipeline connected to vector databases.",
            responsibilities: ["Semantic Chunking", "Dense Vector Embeddings", "HNSW Neighbor Search", "Hybrid Re-Ranking", "Knowledge Augmentation"]
          },
          {
            id: "mod_governance",
            name: "Agent Guardrails & Analytics",
            description: "Enterprise safety, cost accounting, and rate limiting proxy sitting in front of model workloads.",
            responsibilities: ["Prompt Injection Shield", "PII Redaction", "Token Rate Limiter", "Cost Attribution", "Accuracy Benchmarking"]
          }
        ],
        database: {
          databaseType: "Qdrant / Pinecone (Vector Index) + PostgreSQL 16 (Workspaces)",
          tables: [
            {
              id: "tbl_models",
              name: "Model_Deployments",
              description: "Registered foundational models, quantized checkpoints, and GPU allocation rules.",
              fields: [
                { name: "model_id", type: "UUID", isPrimaryKey: true, description: "Model deployment identifier" },
                { name: "model_name", type: "VARCHAR(100)", isNullable: false, description: "e.g. Gemini 3, Llama 3 70B" },
                { name: "context_window", type: "INT", isNullable: false, description: "Max context length in tokens" },
                { name: "quantization", type: "VARCHAR(20)", isNullable: false, description: "FP16 / INT4 / AWQ" },
                { name: "active_replicas", type: "INT", isNullable: false, description: "Current GPU instances running" }
              ]
            },
            {
              id: "tbl_embeddings",
              name: "Knowledge_Chunks",
              description: "Indexed text chunks, high-dimensional vector embeddings, and citation metadata.",
              fields: [
                { name: "chunk_id", type: "UUID", isPrimaryKey: true, description: "Vector chunk ID" },
                { name: "document_id", type: "UUID", isNullable: false, description: "Source document reference" },
                { name: "content_snippet", type: "TEXT", isNullable: false, description: "Raw context snippet" },
                { name: "embedding_dim_1536", type: "VECTOR(1536)", isNullable: false, description: "Dense vector coordinates" },
                { name: "created_at", type: "TIMESTAMP", isNullable: false, description: "Indexing timestamp" }
              ]
            },
            {
              id: "tbl_sessions",
              name: "Chat_Sessions",
              description: "Conversational threads, memory contexts, and user feedback ratings.",
              fields: [
                { name: "session_id", type: "UUID", isPrimaryKey: true, description: "Conversation session ID" },
                { name: "user_id", type: "UUID", isNullable: false, description: "User or API key owner" },
                { name: "total_prompt_tokens", type: "BIGINT", isNullable: false, description: "Cumulative input tokens" },
                { name: "total_completion_tokens", type: "BIGINT", isNullable: false, description: "Cumulative output tokens" },
                { name: "latency_ms", type: "INT", isNullable: false, description: "Average generation latency" }
              ]
            },
            {
              id: "tbl_cache",
              name: "Semantic_Cache_Keys",
              description: "Pre-computed query embeddings and verified deterministic completions.",
              fields: [
                { name: "cache_id", type: "UUID", isPrimaryKey: true, description: "Cache entry ID" },
                { name: "prompt_hash", type: "VARCHAR(64)", isNullable: false, description: "SHA-256 prompt hash" },
                { name: "embedding_vector", type: "VECTOR(768)", isNullable: false, description: "Query semantic vector" },
                { name: "cached_response", type: "TEXT", isNullable: false, description: "Stored LLM completion" },
                { name: "expires_at", type: "TIMESTAMP", isNullable: false, description: "Cache eviction deadline" }
              ]
            }
          ],
          relationships: [
            { fromTable: "Knowledge_Chunks", fromField: "document_id", toTable: "Chat_Sessions", toField: "session_id", type: "1:N", description: "Sessions retrieve relevant document chunks." }
          ]
        },
        apis: [
          { id: "api_generate", method: "POST", endpoint: "/api/v1/ai/generate", description: "Stream LLM token completions (SSE)", authentication: true, statusCodes: [200, 429] },
          { id: "api_rag", method: "POST", endpoint: "/api/v1/rag/search", description: "Semantic vector similarity search", authentication: true, statusCodes: [200, 400] },
          { id: "api_ingest", method: "POST", endpoint: "/api/v1/documents/embed", description: "Ingest and vectorize PDF/Docs", authentication: true, statusCodes: [202, 413] },
          { id: "api_usage", method: "GET", endpoint: "/api/v1/usage/tokens", description: "Inspect real-time token spend & cost", authentication: true, statusCodes: [200] },
          { id: "api_eval", method: "POST", endpoint: "/api/v1/eval/benchmark", description: "Run automated hallucination benchmarks", authentication: true, statusCodes: [200] }
        ],
        architecture: {
          pattern: "Asynchronous Inference Pipeline with Vector Knowledge RAG Engine",
          components: [
            { id: "c_client", name: "AI Studio Client (Next.js)", layer: "Client", technology: "Next.js 14 + SSE Client", description: "Streaming chat and workspace interface" },
            { id: "c_gw", name: "Token Proxy & Guardrail Gateway", layer: "Gateway", technology: "Go + Envoy", description: "Token metering, rate limiting, and prompt sanitization" },
            { id: "c_rag", name: "RAG Retrieval Service", layer: "Service", technology: "Python (LangChain / LlamaIndex)", description: "Hybrid vector search and context synthesizer" },
            { id: "c_inf", name: "Distributed GPU Inference Cluster", layer: "Service", technology: "vLLM on NVIDIA H100", description: "Continuous batching tensor execution engines" },
            { id: "c_vdb", name: "Qdrant / Pinecone Vector Store", layer: "Database", technology: "Qdrant Cluster", description: "HNSW high-dimensional embeddings" }
          ],
          connections: [
            { from: "c_client", to: "c_gw", label: "HTTPS / SSE Stream", protocol: "SSE" },
            { from: "c_gw", to: "c_rag", label: "gRPC Search", protocol: "gRPC" },
            { from: "c_rag", to: "c_inf", label: "Triton gRPC Batch", protocol: "gRPC" },
            { from: "c_rag", to: "c_vdb", label: "Cosine Search", protocol: "gRPC" }
          ]
        },
        technologyStack: [
          { category: "Model Serving", name: "vLLM", reason: "PagedAttention algorithm optimizes KV-cache memory, enabling 10x higher concurrency.", alternatives: ["Triton", "TGI"] },
          { category: "Backend Engine", name: "Python (FastAPI)", reason: "Native integration with machine learning libraries and asynchronous streaming primitives.", alternatives: ["Go", "Node.js"] },
          { category: "Vector Database", name: "Qdrant", reason: "Ultra-fast Rust-based vector search engine with payload filtering and high index scale.", alternatives: ["Pinecone", "Milvus"] },
          { category: "Cache Layer", name: "Redis + Semantic Cache", reason: "Caches semantically identical prompts to bypass GPU passes for repetitive questions.", alternatives: ["Memcached"] },
          { category: "Compute Tier", name: "AWS EKS GPU Nodes", reason: "Autoscaling node groups provisioning NVIDIA A100/H100 instances on demand.", alternatives: ["GCP GKE", "CoreWeave"] }
        ],
        recommendations: [
          { category: "Cost", title: "Semantic Prompt Caching", description: "Implement vector-based caching for frequent prompt templates to cut LLM inference expenses by 35%.", priority: "High" },
          { category: "Security", title: "Indirect Prompt Injection Shield", description: "Sanitize external web/document contexts with a dedicated lightweight guardrail model before prompt injection.", priority: "High" },
          { category: "Performance", title: "KV-Cache Offloading", description: "Use FlashAttention-3 and prefix caching to prevent re-calculating long document system prompts.", priority: "High" }
        ],
        deployment: [
          { stage: "Frontend", step: "Web Application", tool: "Vercel / CloudFront", details: "Client → Distributed edge global CDN" },
          { stage: "Inference", step: "GPU Cluster", tool: "Kubernetes on AWS", details: "Inference → Auto-scaling H100 node groups" },
          { stage: "Vector Store", step: "Database Hosting", tool: "Qdrant Cloud", details: "Vector DB → Managed high-availability cluster" },
          { stage: "CI/CD", step: "Model Evaluation", tool: "GitHub Actions + Ragas", details: "CI/CD → Automated RAG accuracy benchmarks on push" }
        ]
      };

    case "security":
      return {
        projectSummary: {
          projectName: cleanTitle,
          projectType: "Cybersecurity & SIEM Threat Detection System",
          architecture: "Stream-Processing Threat Intelligence Pipeline with eBPF Kernel Probes",
          frontend: "React.js + Tailwind CSS (SOC Security Operations Center)",
          backend: "Go (eBPF Agent & Stream Core) + Python (Anomaly Analytics)",
          database: "ClickHouse (Security Logs) + OpenSearch (SIEM Index)",
          authentication: "Zero-Trust mTLS + Hardware FIDO2 WebAuthn",
          deployment: "Kubernetes Hardened Enclaves + Cloud Security Posture (CSPM)"
        },
        visualTheme: "security",
        visualBadge: "Cyber Shield",
        visualCard: {
          badge: "Cyber Shield",
          headline: "Zero-Trust Defense",
          accentColor: "#ef4444",
          icon: "🛡️"
        },
        summary: `${cleanTitle} is an enterprise-grade cybersecurity threat detection and Security Operations Center (SOC) platform engineered for real-time intrusion monitoring, eBPF kernel event correlation, and automated zero-trust incident response. It analyzes millions of security events per second to neutralize zero-day vulnerabilities, lateral movement, and data exfiltration.`,
        keyFeatures: [
          "Kernel-level process, network, and file monitoring via low-overhead eBPF probes",
          "Automated MITRE ATT&CK framework mapping with real-time heuristic rule evaluation",
          "One-click automated endpoint quarantine, network isolation, and session revocation",
          "Decentralized immutable security audit ledger satisfying SOC2 Type II and ISO 27001",
          "Vulnerability scanner integration with continuous CVE patching and container image audits"
        ],
        systemStats: {
          estimatedRPS: "45,000 req/sec",
          latencyTarget: "< 20ms correlation",
          databaseSize: "4.5 TB / year",
          scalabilityTier: "Dedicated Hardened Kubernetes Multi-AZ Cluster"
        },
        functionalModules: [
          {
            id: "sensors",
            name: "eBPF Kernel Sensors & Log Ingest",
            color: "blue",
            items: ["eBPF Syscall Interception", "Network Packet Telemetry", "Kube-Audit Stream Ingest", "Syslog & CloudTrail Collector", "Tamper-Proof Agent Daemon"]
          },
          {
            id: "siem",
            name: "SIEM Correlation & Threat Engine",
            color: "green",
            items: ["MITRE ATT&CK Matrix Mapping", "Real-Time Sigma Rule Matcher", "Behavioral Anomaly Detector", "Lateral Movement Tracing", "C2 Beaconing Detection"]
          },
          {
            id: "soar",
            name: "SOAR Automated Incident Playbooks",
            color: "amber",
            items: ["Automated Endpoint Isolation", "Firewall Rule Push (iptables/WAF)", "Revoke Compromised Credentials", "Forensic Memory Snapshotting", "SOC Analyst Investigation Log"]
          }
        ],
        modules: [
          {
            id: "mod_sensors",
            name: "eBPF Kernel Sensors & Log Ingest",
            description: "Ultra-fast low-overhead kernel event interceptors gathering syscall, network socket, and file mutations.",
            responsibilities: ["eBPF Syscall Interception", "Network Packet Telemetry", "Kube-Audit Stream Ingest", "CloudTrail Collector", "Tamper-Proof Daemon"]
          },
          {
            id: "mod_siem",
            name: "SIEM Correlation & Threat Engine",
            description: "High-volume stream correlation processor matching real-time security events against known exploit signatures.",
            responsibilities: ["MITRE ATT&CK Mapping", "Sigma Rule Matcher", "Behavioral Anomaly Detector", "Lateral Movement Tracing", "C2 Detection"]
          },
          {
            id: "mod_soar",
            name: "SOAR Automated Incident Playbooks",
            description: "Security Orchestration, Automation, and Response workflow engine triggering automated defensive countermeasures.",
            responsibilities: ["Automated Endpoint Isolation", "Firewall Rule Push", "Revoke Credentials", "Forensic Memory Snapshot", "SOC Investigation Log"]
          }
        ],
        database: {
          databaseType: "ClickHouse (High-Speed Log Engine) + OpenSearch (SIEM Search)",
          tables: [
            {
              id: "tbl_events",
              name: "Security_Events",
              description: "High-volume raw telemetry emitted by endpoint agents and cloud providers.",
              fields: [
                { name: "event_id", type: "UUID", isPrimaryKey: true, description: "Unique event record UUID" },
                { name: "endpoint_id", type: "VARCHAR(64)", isNullable: false, description: "Host / Container identity" },
                { name: "process_name", type: "VARCHAR(255)", isNullable: false, description: "Executing process path" },
                { name: "event_type", type: "VARCHAR(50)", isNullable: false, description: "Syscall / Socket / Auth / File" },
                { name: "severity", type: "VARCHAR(20)", isNullable: false, description: "Critical / High / Medium / Low" },
                { name: "timestamp", type: "TIMESTAMP", isNullable: false, description: "Nanosecond event timestamp" }
              ]
            },
            {
              id: "tbl_alerts",
              name: "Threat_Incidents",
              description: "Correlated multi-event alerts mapped to MITRE ATT&CK threat tactics.",
              fields: [
                { name: "incident_id", type: "UUID", isPrimaryKey: true, description: "Incident tracking ticket" },
                { name: "mitre_tactic", type: "VARCHAR(50)", isNullable: false, description: "e.g. TA0008 Lateral Movement" },
                { name: "threat_score", type: "INT", isNullable: false, description: "Calculated risk score (0-100)" },
                { name: "status", type: "VARCHAR(30)", isNullable: false, description: "Active / Investigating / Contained / Closed" },
                { name: "assigned_analyst", type: "VARCHAR(100)", isNullable: true, description: "SOC triage engineer" }
              ]
            },
            {
              id: "tbl_endpoints",
              name: "Quarantined_Endpoints",
              description: "Compromised servers and developer machines isolated from internal VPC subnets.",
              fields: [
                { name: "quarantine_id", type: "UUID", isPrimaryKey: true, description: "Isolation action ID" },
                { name: "endpoint_ip", type: "INET", isNullable: false, description: "Target IP address" },
                { name: "isolated_by_rule", type: "VARCHAR(100)", isNullable: false, description: "Triggering SOAR policy" },
                { name: "isolated_at", type: "TIMESTAMP", isNullable: false, description: "Enforcement timestamp" }
              ]
            }
          ],
          relationships: [
            { fromTable: "Security_Events", fromField: "endpoint_id", toTable: "Threat_Incidents", toField: "incident_id", type: "1:N", description: "Raw events link to correlated threat incidents." }
          ]
        },
        apis: [
          { id: "api_ingest", method: "POST", endpoint: "/api/v1/events/ingest", description: "High-throughput eBPF event ingestion", authentication: true, statusCodes: [200, 400] },
          { id: "api_threats", method: "GET", endpoint: "/api/v1/threats/active", description: "Fetch live unresolved threat incidents", authentication: true, statusCodes: [200] },
          { id: "api_isolate", method: "POST", endpoint: "/api/v1/endpoints/{id}/isolate", description: "Trigger automated SOAR network quarantine", authentication: true, statusCodes: [200, 403] },
          { id: "api_rules", method: "PUT", endpoint: "/api/v1/rules/sigma", description: "Deploy new Sigma detection rules", authentication: true, statusCodes: [200, 400] }
        ],
        architecture: {
          pattern: "Stream-Processing Threat Intelligence Pipeline with eBPF Kernel Probes",
          components: [
            { id: "c_ebpf", name: "eBPF Host Sensor Agents", layer: "Client", technology: "Go + Cilium / Tetragon", description: "In-kernel non-blocking event telemetry" },
            { id: "c_kafka", name: "Security Event Log Stream", layer: "Broker", technology: "Apache Kafka", description: "Buffers 500k events/sec with zero packet loss" },
            { id: "c_corr", name: "Flink / Go Correlation Engine", layer: "Service", technology: "Apache Flink", description: "Real-time stateful sliding window threat detection" },
            { id: "c_soar", name: "SOAR Automated Remediation", layer: "Service", technology: "Go (Async Orchestration)", description: "Automated network isolation and identity revocation" },
            { id: "c_ch", name: "ClickHouse Log Data Warehouse", layer: "Database", technology: "ClickHouse Cluster", description: "Columnar petabyte storage with sub-second queries" }
          ],
          connections: [
            { from: "c_ebpf", to: "c_kafka", label: "gRPC Streaming", protocol: "gRPC" },
            { from: "c_kafka", to: "c_corr", label: "Event Ingest", protocol: "Kafka" },
            { from: "c_corr", to: "c_soar", label: "Trigger Alert", protocol: "gRPC" },
            { from: "c_corr", to: "c_ch", label: "Bulk Columnar Insert", protocol: "TCP" }
          ]
        },
        technologyStack: [
          { category: "Kernel Telemetry", name: "eBPF (Tetragon)", reason: "Safely intercepts kernel space activity without altering OS source or crashing pods.", alternatives: ["Falco", "Auditd"] },
          { category: "Log Database", name: "ClickHouse", reason: "Ultra-fast columnar analytics processing billions of event rows with 90% disk compression.", alternatives: ["OpenSearch", "Snowflake"] },
          { category: "Stream Processor", name: "Apache Kafka + Flink", reason: "Real-time stream correlation evaluating threat heuristics across temporal windows.", alternatives: ["RabbitMQ", "Spark"] },
          { category: "Backend Engine", name: "Go", reason: "Native integration with Linux network namespaces, iptables, and low memory footprints.", alternatives: ["Rust", "Python"] }
        ],
        recommendations: [
          { category: "Architecture", title: "Air-Gapped Audit Storage", description: "Mirror security audit logs to immutable WORM (Write Once Read Many) S3 buckets to thwart attacker log wiping.", priority: "High" },
          { category: "Performance", title: "ClickHouse Partition Pruning", description: "Partition security event tables by hour and tenant to skip scanning unneeded historical partitions.", priority: "High" }
        ],
        deployment: [
          { stage: "Agents", step: "DaemonSet Deployment", tool: "Kubernetes DaemonSet", details: "Sensors → Deployed on every cluster worker node" },
          { stage: "Pipeline", step: "Log Stream Ingestion", tool: "AWS MSK (Kafka)", details: "Stream → Managed multi-broker cluster" },
          { stage: "Storage", step: "Columnar Storage", tool: "ClickHouse Cloud", details: "Storage → Multi-AZ analytical database" }
        ]
      };

    default:
      // Dynamically synthesize a tailored architecture for custom or any other topic!
      return generateDynamicCustomDesign(cleanTitle, description);
  }
}

/**
 * Procedural Dynamic Custom Design Generator
 * Guarantees that ANY custom project name or description gets a uniquely tailored architecture,
 * real domain modules, specific tech stack, and relevant visual graphics!
 */
function generateDynamicCustomDesign(title: string, description: string = ""): SystemDesignResult {
  const cleanTitle = title.trim();
  const desc = description.trim() || `Enterprise distributed system for ${cleanTitle}`;
  const words = cleanTitle.split(/\s+/).filter(w => w.length > 2);

  // Extract key concept words
  const keyConcept1 = words[0] || "Core";
  const keyConcept2 = words[1] || "Platform";
  const keyConcept3 = words[words.length - 1] || "Service";

  const isDataHeavy = /data|analytics|warehouse|bi|intelligence|lake|etl|pipeline/.test(cleanTitle.toLowerCase());
  const isRealtime = /real-time|live|stream|chat|tracker|telemetry|sensor|instant/.test(cleanTitle.toLowerCase());
  const isFinance = /pay|money|bank|ledger|trade|crypto|token|credit|invoice/.test(cleanTitle.toLowerCase());

  const archPattern = isRealtime
    ? "Event-Driven Microservices with WebSocket Telemetry Gateway"
    : isDataHeavy
      ? "Lambda Architecture with Streaming & Batch Analytics Pipeline"
      : isFinance
        ? "CQRS & Event-Sourcing with ACID Distributed Ledger"
        : "Domain-Driven Modular Microservices Architecture";

  const backendTech = isRealtime
    ? "Go (High Concurrency Engine) + Node.js"
    : isDataHeavy
      ? "Python (FastAPI) + Apache Spark"
      : isFinance
        ? "Rust + Java (Spring Boot)"
        : "Node.js (NestJS) + Go";

  const dbTech = isRealtime
    ? "PostgreSQL 16 + Redis (In-Memory Pub/Sub)"
    : isDataHeavy
      ? "ClickHouse (Analytical) + PostgreSQL (Metadata)"
      : isFinance
        ? "PostgreSQL (Transactional) + Apache Kafka (Audit Log)"
        : "PostgreSQL 16 (Primary) + Redis (Cache)";

  const mod1Name = `${keyConcept1} Ingestion & Management`;
  const mod2Name = `${keyConcept2} Processing & Business Engine`;
  const mod3Name = `${keyConcept3} Governance & Analytics Console`;

  const entity1 = keyConcept1.replace(/[^a-zA-Z]/g, "") || "Items";
  const entity2 = keyConcept2.replace(/[^a-zA-Z]/g, "") || "Operations";
  const entity3 = "Transactions";

  return {
    projectSummary: {
      projectName: cleanTitle,
      projectType: "Modern Distributed Platform",
      architecture: archPattern,
      frontend: "React.js + Tailwind CSS",
      backend: backendTech,
      database: dbTech,
      authentication: "JWT + Role-Based Access Control (RBAC)",
      deployment: "Docker + AWS ECS / Kubernetes"
    },
    visualTheme: "general",
    visualBadge: `${keyConcept1} Sys`,
    visualCard: {
      badge: `${keyConcept1} Sys`,
      headline: `${cleanTitle} Architecture`,
      accentColor: "#6366f1",
      icon: "🌐"
    },
    summary: `${cleanTitle} is a production-grade software system engineered specifically to deliver resilient, scalable, and low-latency performance. ${desc}. It employs ${archPattern} to decouple compute services, enforce zero-trust boundary security, and optimize data throughput across high-concurrency workloads.`,
    keyFeatures: [
      `Dedicated domain-specific workflow engine tailored for ${cleanTitle} requirements`,
      `Horizontal autoscaling compute tier supporting high concurrent request volumes`,
      `ACID-compliant persistent data store with Redis caching for sub-50ms query responses`,
      `Comprehensive telemetry, structured logging, and distributed tracing across all services`,
      `Hardened security boundary featuring encrypted JWT authentication and role-based permissions`
    ],
    systemStats: {
      estimatedRPS: isRealtime ? "15,000 req/sec" : "5,000 req/sec",
      latencyTarget: isRealtime ? "< 40ms p95" : "< 80ms p95",
      databaseSize: "650 GB / year",
      scalabilityTier: "AWS ECS / Kubernetes Multi-AZ Cluster"
    },
    functionalModules: [
      {
        id: "mod_1",
        name: mod1Name,
        color: "blue",
        items: [
          `Register & Authenticate ${keyConcept1} Entities`,
          `Validate Incoming ${keyConcept1} Parameters`,
          `Query & Filter ${keyConcept1} Records`,
          `Emit Asynchronous Event Notifications`,
          `Manage Operational States & Transitions`
        ]
      },
      {
        id: "mod_2",
        name: mod2Name,
        color: "green",
        items: [
          `Process Core ${keyConcept2} Domain Workflows`,
          `Execute Business Rules & Conflict Validations`,
          `Coordinate Multi-Service State Sync`,
          `Maintain Real-Time Operational Cache`,
          `Dispatch Background Task Jobs`
        ]
      },
      {
        id: "mod_3",
        name: mod3Name,
        color: "amber",
        items: [
          `Central Governance & Administration Console`,
          `Manage Users, Roles & Security Permissions`,
          `Audit Transactional Ledgers & System Logs`,
          `Inspect Operational Performance & Latency Telemetry`,
          `Export Analytical Reports & Executive Insights`
        ]
      }
    ],
    modules: [
      {
        id: "mod_1",
        name: mod1Name,
        description: `Primary interface handling discovery, identity, and lifecycle operations for ${cleanTitle}.`,
        responsibilities: [
          `Register & Authenticate ${keyConcept1} Entities`,
          `Validate Incoming Parameters`,
          `Query & Filter Records`,
          `Emit Asynchronous Notifications`,
          `Manage Operational States`
        ]
      },
      {
        id: "mod_2",
        name: mod2Name,
        description: `Core domain logic coordinator orchestrating transactions and business validation rules.`,
        responsibilities: [
          `Process Core Workflows`,
          `Execute Business Rules`,
          `Coordinate Multi-Service State`,
          `Maintain Real-Time Cache`,
          `Dispatch Background Jobs`
        ]
      },
      {
        id: "mod_3",
        name: mod3Name,
        description: `Centralized platform governance, security enforcement, and business intelligence reporting.`,
        responsibilities: [
          `Central Governance Console`,
          `Manage Users & Permissions`,
          `Audit System Logs`,
          `Inspect Performance Telemetry`,
          `Export Analytical Reports`
        ]
      }
    ],
    database: {
      databaseType: dbTech,
      tables: [
        {
          id: "tbl_users",
          name: "Users",
          description: "System user profiles, access credentials, and assigned roles.",
          fields: [
            { name: "user_id", type: "UUID", isPrimaryKey: true, description: "Primary account UUID" },
            { name: "username", type: "VARCHAR(100)", isNullable: false, description: "Unique username" },
            { name: "email", type: "VARCHAR(255)", isNullable: false, description: "Verified email" },
            { name: "role", type: "VARCHAR(50)", isNullable: false, description: "RBAC authority role" },
            { name: "created_at", type: "TIMESTAMP", isNullable: false, description: "Creation timestamp" }
          ]
        },
        {
          id: "tbl_entity1",
          name: `${entity1}_Records`,
          description: `Primary operational records for ${cleanTitle}.`,
          fields: [
            { name: "record_id", type: "UUID", isPrimaryKey: true, description: "Record unique key" },
            { name: "user_id", type: "UUID", isForeignKey: true, references: "Users.user_id", description: "Creator reference" },
            { name: "title", type: "VARCHAR(255)", isNullable: false, description: "Entity title or name" },
            { name: "status", type: "VARCHAR(50)", isNullable: false, description: "Current operational status" },
            { name: "metadata", type: "JSONB", isNullable: true, description: "Flexible domain attributes" },
            { name: "updated_at", type: "TIMESTAMP", isNullable: false, description: "Last modified timestamp" }
          ]
        },
        {
          id: "tbl_entity2",
          name: `${entity2}_Workflows`,
          description: `Execution workflows and tasks for ${cleanTitle}.`,
          fields: [
            { name: "workflow_id", type: "UUID", isPrimaryKey: true, description: "Workflow run ID" },
            { name: "record_id", type: "UUID", isForeignKey: true, references: `${entity1}_Records.record_id`, description: "Associated record" },
            { name: "action_type", type: "VARCHAR(100)", isNullable: false, description: "Workflow action type" },
            { name: "payload", type: "JSONB", isNullable: false, description: "Processing parameters" },
            { name: "completed_at", type: "TIMESTAMP", isNullable: true, description: "Execution timestamp" }
          ]
        },
        {
          id: "tbl_audit",
          name: "Audit_Ledger",
          description: "Immutable compliance and security activity log.",
          fields: [
            { name: "audit_id", type: "BIGINT", isPrimaryKey: true, description: "Sequential log entry" },
            { name: "user_id", type: "UUID", isForeignKey: true, references: "Users.user_id", description: "Actor reference" },
            { name: "action", type: "VARCHAR(100)", isNullable: false, description: "Executed operation" },
            { name: "ip_address", type: "INET", isNullable: false, description: "Client source IP" },
            { name: "timestamp", type: "TIMESTAMP", isNullable: false, description: "Event timestamp" }
          ]
        }
      ],
      relationships: [
        { fromTable: `${entity1}_Records`, fromField: "user_id", toTable: "Users", toField: "user_id", type: "1:N", description: "Users create and own domain records." },
        { fromTable: `${entity2}_Workflows`, fromField: "record_id", toTable: `${entity1}_Records`, toField: "record_id", type: "1:N", description: "Records track multiple workflow executions." },
        { fromTable: "Audit_Ledger", fromField: "user_id", toTable: "Users", toField: "user_id", type: "1:N", description: "User actions recorded in the immutable audit ledger." }
      ]
    },
    apis: [
      { id: "api_auth", method: "POST", endpoint: "/api/v1/auth/login", description: "User authentication & JWT token issuance", authentication: false, statusCodes: [200, 401] },
      { id: "api_records_create", method: "POST", endpoint: `/api/v1/${entity1.toLowerCase()}`, description: `Create new ${entity1} entity`, authentication: true, statusCodes: [201, 400] },
      { id: "api_records_list", method: "GET", endpoint: `/api/v1/${entity1.toLowerCase()}`, description: `Search & list ${entity1} records`, authentication: true, statusCodes: [200] },
      { id: "api_records_get", method: "GET", endpoint: `/api/v1/${entity1.toLowerCase()}/{id}`, description: `Retrieve ${entity1} details`, authentication: true, statusCodes: [200, 404] },
      { id: "api_workflow_trigger", method: "POST", endpoint: `/api/v1/${entity2.toLowerCase()}/execute`, description: `Execute ${entity2} workflow processing`, authentication: true, statusCodes: [202, 400] },
      { id: "api_metrics", method: "GET", endpoint: "/api/v1/system/telemetry", description: "Inspect real-time service health & metrics", authentication: true, statusCodes: [200] }
    ],
    architecture: {
      pattern: archPattern,
      components: [
        { id: "c_client", name: "Responsive Client Portal", layer: "Client", technology: "React.js + Tailwind CSS", description: "Unified interactive dashboard interface" },
        { id: "c_gw", name: "API Gateway & Security Proxy", layer: "Gateway", technology: "Envoy / Nginx", description: "Reverse proxy, rate-limiting, and JWT verification" },
        { id: "c_core", name: `${keyConcept1} Core Service`, layer: "Service", technology: backendTech.split("+")[0].trim(), description: "Primary domain business logic executor" },
        { id: "c_worker", name: "Asynchronous Worker Queue", layer: "Service", technology: "Redis / BullMQ Worker", description: "Handles background async computing tasks" },
        { id: "c_db", name: "Primary Database Cluster", layer: "Database", technology: dbTech.split("+")[0].trim(), description: "ACID persistent entity storage" }
      ],
      connections: [
        { from: "c_client", to: "c_gw", label: "HTTPS / REST", protocol: "HTTPS" },
        { from: "c_gw", to: "c_core", label: "Routed Requests", protocol: "HTTP/gRPC" },
        { from: "c_core", to: "c_worker", label: "Enqueue Jobs", protocol: "Redis" },
        { from: "c_core", to: "c_db", label: "SQL Queries", protocol: "TCP" }
      ]
    },
    technologyStack: [
      { category: "Frontend", name: "React.js", reason: "Component-driven responsive interface with modern reactive state management.", alternatives: ["Vue.js", "Next.js"] },
      { category: "Backend", name: backendTech.split("+")[0].trim(), reason: "High-performance execution engine well-suited for concurrent domain workloads.", alternatives: ["Go", "Node.js", "Python"] },
      { category: "Database", name: dbTech.split("+")[0].trim(), reason: "Enterprise-grade reliability, strict relational consistency, and indexed query speeds.", alternatives: ["PostgreSQL", "MongoDB"] },
      { category: "Cache & State", name: "Redis", reason: "Ultra-low latency in-memory store for session caching and rapid lookup.", alternatives: ["Memcached"] },
      { category: "Deployment", name: "Docker + AWS ECS", reason: "Reproducible containerized orchestration with automated cloud rolling deployments.", alternatives: ["Kubernetes", "GCP Cloud Run"] }
    ],
    recommendations: [
      { category: "Performance", title: "Read Replica Scaling", description: `Provision database read replicas to offload heavy query traffic from ${entity1.toLowerCase()} searches.`, priority: "High" },
      { category: "Security", title: "Encrypted Token Rotation", description: "Enforce short-lived JWT access tokens with secure refresh token rotation.", priority: "High" },
      { category: "Architecture", title: "Circuit Breakers", description: "Implement circuit breaker patterns on outbound API dependencies to prevent cascading failures.", priority: "Medium" }
    ],
    deployment: [
      { stage: "Frontend", step: "Static Distribution", tool: "AWS S3 + CloudFront", details: "Frontend → Deployed on global CDN" },
      { stage: "Backend", step: "Container Workloads", tool: "Docker on AWS ECS", details: "Backend → Auto-scaling container tasks" },
      { stage: "Database", step: "Managed Data Tier", tool: "AWS RDS PostgreSQL", details: "Database → Multi-AZ managed instances" },
      { stage: "CI/CD", step: "Continuous Pipeline", tool: "GitHub Actions", details: "CI/CD → Lint, test, and automated deploy" }
    ]
  };
}
