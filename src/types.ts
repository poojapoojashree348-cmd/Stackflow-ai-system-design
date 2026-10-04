export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  createdAt: string;
  themePreference?: "light" | "dark" | "system";
  notifications?: boolean;
}

export interface TableField {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: string;
  isNullable?: boolean;
  description: string;
}

export interface DatabaseTable {
  id: string;
  name: string;
  description: string;
  fields: TableField[];
}

export interface DatabaseRelationship {
  fromTable: string;
  fromField: string;
  toTable: string;
  toField: string;
  type: "1:1" | "1:N" | "N:M";
  description: string;
}

export interface ApiEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  description: string;
  authentication: boolean;
  requestBody?: string;
  responseBody?: string;
  statusCodes: number[];
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  layer: "Client" | "Gateway" | "Service" | "Database" | "AI" | "Cache" | "Queue";
  technology: string;
  description: string;
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label: string;
  protocol: string;
}

export interface TechStackItem {
  category: "Frontend" | "Backend" | "Database" | "Authentication" | "AI" | "Deployment" | "Caching" | "DevOps";
  name: string;
  reason: string;
  alternatives: string[];
}

export interface RecommendationItem {
  category: "Architecture" | "Security" | "Performance" | "Scalability" | "Development";
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}

export interface DeploymentStep {
  stage: "Development" | "GitHub" | "Build" | "Deployment" | "Production";
  step: string;
  tool: string;
  details: string;
}

export interface FunctionalModule {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  dependencies?: string[];
}

export interface GeneratedDesign {
  summary: string;
  keyFeatures: string[];
  systemStats?: {
    estimatedRPS: string;
    latencyTarget: string;
    databaseSize: string;
    scalabilityTier: string;
  };
  modules: FunctionalModule[];
  database: {
    databaseType: string;
    tables: DatabaseTable[];
    relationships: DatabaseRelationship[];
  };
  apis: ApiEndpoint[];
  architecture: {
    pattern: string;
    components: ArchitectureComponent[];
    connections: ArchitectureConnection[];
  };
  technologyStack: TechStackItem[];
  recommendations: RecommendationItem[];
  deployment: DeploymentStep[];
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: "Draft" | "Generated" | "Saved";
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
  design?: GeneratedDesign;
}

export interface HistoryItem {
  id: string;
  userId: string;
  projectId: string;
  projectTitle: string;
  creditsUsed: number;
  timestamp: string;
  design: GeneratedDesign;
}

export interface DashboardStats {
  totalProjects: number;
  generatedDesigns: number;
  savedDesigns: number;
  creditsRemaining: number;
  maxCredits: number;
}
