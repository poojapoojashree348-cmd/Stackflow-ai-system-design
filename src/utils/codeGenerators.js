/**
 * Utilities to generate executable Infrastructure-as-Code (IaC),
 * Database DDL scripts, OpenAPI 3.0 specifications, and TypeScript types
 * directly from StackFlow AI system design objects.
 */

export function generatePostgresDDL(design, projectTitle = "System Architecture") {
  const database = design?.database;
  const tables = database?.tables || [];
  const relationships = database?.relationships || [];

  let ddl = `-- ==========================================================================\n`;
  ddl += `-- StackFlow AI - Production PostgreSQL Database Schema\n`;
  ddl += `-- Project: ${projectTitle}\n`;
  ddl += `-- Database Type: ${database?.databaseType || "PostgreSQL 16 (Relational Core)"}\n`;
  ddl += `-- Generated at: ${new Date().toISOString()}\n`;
  ddl += `-- ==========================================================================\n\n`;

  ddl += `-- Enable essential cryptographic & indexing extensions\n`;
  ddl += `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n`;
  ddl += `CREATE EXTENSION IF NOT EXISTS "pgcrypto";\n\n`;

  // Automatic timestamp trigger function
  ddl += `-- Automatic updated_at timestamp trigger\n`;
  ddl += `CREATE OR REPLACE FUNCTION update_timestamp_column()\n`;
  ddl += `RETURNS TRIGGER AS $$\n`;
  ddl += `BEGIN\n`;
  ddl += `    NEW.updated_at = CURRENT_TIMESTAMP;\n`;
  ddl += `    RETURN NEW;\n`;
  ddl += `END;\n`;
  ddl += `$$ LANGUAGE plpgsql;\n\n`;

  // Create tables
  tables.forEach((table) => {
    const tableName = table.name.toLowerCase().replace(/\s+/g, "_");
    ddl += `-- Table: ${table.name} (${table.description || "Core domain entity"})\n`;
    ddl += `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;

    const columnDefs = [];
    const fields = table.fields || [];

    fields.forEach((field) => {
      let colName = field.name.toLowerCase().replace(/\s+/g, "_");
      let colType = "TEXT";
      const rawType = (field.type || "").toLowerCase();

      if (field.isPrimaryKey) {
        colType = "UUID PRIMARY KEY DEFAULT gen_random_uuid()";
      } else if (rawType.includes("int") || rawType.includes("number")) {
        colType = "BIGINT";
      } else if (rawType.includes("bool")) {
        colType = "BOOLEAN DEFAULT FALSE";
      } else if (rawType.includes("date") || rawType.includes("time") || colName.includes("at")) {
        colType = "TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP";
      } else if (rawType.includes("json") || rawType.includes("object") || rawType.includes("array")) {
        colType = "JSONB DEFAULT '{}'::jsonb";
      } else if (rawType.includes("float") || rawType.includes("decimal") || colName.includes("price") || colName.includes("amount")) {
        colType = "NUMERIC(12, 2)";
      } else {
        colType = "VARCHAR(255)";
      }

      let nullability = field.isNullable ? "" : " NOT NULL";
      if (field.isPrimaryKey) nullability = "";

      let def = `    ${colName.padEnd(22)} ${colType}${nullability}`;
      if (field.description) {
        def += ` /* ${field.description} */`;
      }
      columnDefs.push(def);
    });

    // Ensure standard audit columns
    const hasCreatedAt = fields.some((f) => f.name.toLowerCase() === "created_at");
    const hasUpdatedAt = fields.some((f) => f.name.toLowerCase() === "updated_at");

    if (!hasCreatedAt) {
      columnDefs.push(`    created_at             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }
    if (!hasUpdatedAt) {
      columnDefs.push(`    updated_at             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    ddl += columnDefs.join(",\n");
    ddl += `\n);\n\n`;

    // Trigger for updated_at
    ddl += `CREATE TRIGGER trg_${tableName}_updated_at\n`;
    ddl += `BEFORE UPDATE ON ${tableName}\n`;
    ddl += `FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();\n\n`;
  });

  // Foreign keys from relationships
  if (relationships.length > 0) {
    ddl += `-- ==========================================================================\n`;
    ddl += `-- Entity Foreign Key Constraints & Performance Indexes\n`;
    ddl += `-- ==========================================================================\n\n`;

    relationships.forEach((rel, idx) => {
      const fromTable = rel.fromTable.toLowerCase().replace(/\s+/g, "_");
      const fromField = rel.fromField.toLowerCase().replace(/\s+/g, "_");
      const toTable = rel.toTable.toLowerCase().replace(/\s+/g, "_");
      const toField = rel.toField.toLowerCase().replace(/\s+/g, "_");

      const constraintName = `fk_${fromTable}_${fromField}_${idx}`;
      const indexName = `idx_${fromTable}_${fromField}`;

      ddl += `-- Relationship: ${rel.fromTable} -> ${rel.toTable} (${rel.type}: ${rel.description || ""})\n`;
      ddl += `ALTER TABLE ${fromTable}\n`;
      ddl += `    DROP CONSTRAINT IF EXISTS ${constraintName};\n`;
      ddl += `ALTER TABLE ${fromTable}\n`;
      ddl += `    ADD CONSTRAINT ${constraintName}\n`;
      ddl += `    FOREIGN KEY (${fromField})\n`;
      ddl += `    REFERENCES ${toTable} (${toField})\n`;
      ddl += `    ON DELETE CASCADE ON UPDATE CASCADE;\n\n`;

      ddl += `CREATE INDEX IF NOT EXISTS ${indexName} ON ${fromTable} (${fromField});\n\n`;
    });
  }

  // Seed data comment
  ddl += `-- ==========================================================================\n`;
  ddl += `-- Sample Seed Data Insertion Template\n`;
  ddl += `-- ==========================================================================\n`;
  if (tables[0]) {
    const firstTable = tables[0].name.toLowerCase().replace(/\s+/g, "_");
    ddl += `-- INSERT INTO ${firstTable} (name, created_at) VALUES ('Seed Record 1', NOW());\n\n`;
  }
  ddl += `-- Verification Query\n`;
  ddl += `SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public';\n`;

  return ddl;
}

export function generateDockerCompose(design, projectTitle = "System Architecture") {
  const isPostgres = !(design?.database?.databaseType?.toLowerCase().includes("mongo"));
  const projectName = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 20);

  let compose = `# ==========================================================================\n`;
  compose += `# StackFlow AI - Multi-Container Production Docker Compose\n`;
  compose += `# Project: ${projectTitle}\n`;
  compose += `# ==========================================================================\n\n`;
  compose += `version: '3.8'\n\n`;
  compose += `networks:\n`;
  compose += `  ${projectName}_network:\n`;
  compose += `    driver: bridge\n\n`;
  compose += `volumes:\n`;
  compose += `  db_data:\n`;
  compose += `  redis_data:\n\n`;
  compose += `services:\n`;

  // Reverse Proxy / Gateway
  compose += `  # Layer: API Gateway & Reverse Proxy\n`;
  compose += `  gateway:\n`;
  compose += `    image: nginx:alpine\n`;
  compose += `    container_name: ${projectName}_gateway\n`;
  compose += `    restart: always\n`;
  compose += `    ports:\n`;
  compose += `      - "80:80"\n`;
  compose += `      - "443:443"\n`;
  compose += `    depends_on:\n`;
  compose += `      - api\n`;
  compose += `    networks:\n`;
  compose += `      - ${projectName}_network\n\n`;

  // Backend API Service
  compose += `  # Layer: Core Backend API Service\n`;
  compose += `  api:\n`;
  compose += `    build:\n`;
  compose += `      context: .\n`;
  compose += `      dockerfile: Dockerfile\n`;
  compose += `    container_name: ${projectName}_api\n`;
  compose += `    restart: unless-stopped\n`;
  compose += `    environment:\n`;
  compose += `      NODE_ENV: production\n`;
  compose += `      PORT: 8080\n`;
  if (isPostgres) {
    compose += `      DATABASE_URL: postgres://postgres:secure_pg_password@postgres:5432/${projectName}_db\n`;
  } else {
    compose += `      DATABASE_URL: mongodb://mongodb:27017/${projectName}_db\n`;
  }
  compose += `      REDIS_URL: redis://redis:6379\n`;
  compose += `      JWT_SECRET: super_secret_jwt_sign_key_change_in_prod\n`;
  compose += `    ports:\n`;
  compose += `      - "8080:8080"\n`;
  compose += `    depends_on:\n`;
  compose += `      ${isPostgres ? "postgres" : "mongodb"}:\n`;
  compose += `        condition: service_healthy\n`;
  compose += `      redis:\n`;
  compose += `        condition: service_started\n`;
  compose += `    networks:\n`;
  compose += `      - ${projectName}_network\n\n`;

  // Database Service
  if (isPostgres) {
    compose += `  # Layer: Relational Persistence Database\n`;
    compose += `  postgres:\n`;
    compose += `    image: postgres:16-alpine\n`;
    compose += `    container_name: ${projectName}_postgres\n`;
    compose += `    restart: always\n`;
    compose += `    environment:\n`;
    compose += `      POSTGRES_USER: postgres\n`;
    compose += `      POSTGRES_PASSWORD: secure_pg_password\n`;
    compose += `      POSTGRES_DB: ${projectName}_db\n`;
    compose += `    volumes:\n`;
    compose += `      - db_data:/var/lib/postgresql/data\n`;
    compose += `      - ./schema.sql:/docker-entrypoint-initdb.d/init.sql\n`;
    compose += `    ports:\n`;
    compose += `      - "5432:5432"\n`;
    compose += `    healthcheck:\n`;
    compose += `      test: ["CMD-SHELL", "pg_isready -U postgres"]\n`;
    compose += `      interval: 10s\n`;
    compose += `      timeout: 5s\n`;
    compose += `      retries: 5\n`;
    compose += `    networks:\n`;
    compose += `      - ${projectName}_network\n\n`;
  } else {
    compose += `  # Layer: NoSQL Document Database\n`;
    compose += `  mongodb:\n`;
    compose += `    image: mongo:7-jammy\n`;
    compose += `    container_name: ${projectName}_mongo\n`;
    compose += `    restart: always\n`;
    compose += `    volumes:\n`;
    compose += `      - db_data:/data/db\n`;
    compose += `    ports:\n`;
    compose += `      - "27017:27017"\n`;
    compose += `    healthcheck:\n`;
    compose += `      test: ["CMD","mongosh", "--eval", "db.adminCommand('ping')"]\n`;
    compose += `      interval: 10s\n`;
    compose += `      timeout: 5s\n`;
    compose += `      retries: 5\n`;
    compose += `    networks:\n`;
    compose += `      - ${projectName}_network\n\n`;
  }

  // Caching Service
  compose += `  # Layer: In-Memory Caching & Pub/Sub\n`;
  compose += `  redis:\n`;
  compose += `    image: redis:7-alpine\n`;
  compose += `    container_name: ${projectName}_redis\n`;
  compose += `    restart: always\n`;
  compose += `    command: redis-server --appendonly yes --maxmemory 512mb --maxmemory-policy allkeys-lru\n`;
  compose += `    volumes:\n`;
  compose += `      - redis_data:/data\n`;
  compose += `    ports:\n`;
  compose += `      - "6379:6379"\n`;
  compose += `    networks:\n`;
  compose += `      - ${projectName}_network\n`;

  return compose;
}

export function generateOpenApiSpec(design, projectTitle = "System Architecture") {
  const apis = design?.apis || [];

  const paths = {};

  apis.forEach((api) => {
    const rawPath = api.endpoint || "/api/v1/resource";
    // Convert express-style :id to openapi {id}
    const pathKey = rawPath.replace(/:([a-zA-Z0-9_]+)/g, "{$1}");
    const method = (api.method || "GET").toLowerCase();

    if (!paths[pathKey]) {
      paths[pathKey] = {};
    }

    // Extract path parameters
    const pathParams = [];
    const matches = rawPath.match(/:([a-zA-Z0-9_]+)/g);
    if (matches) {
      matches.forEach((param) => {
        const paramName = param.replace(":", "");
        pathParams.push({
          name: paramName,
          in: "path",
          required: true,
          schema: { type: "string" },
          description: `Unique identifier for ${paramName}`
        });
      });
    }

    const responses = {};
    (api.statusCodes || [200, 400, 500]).forEach((code) => {
      let desc = "Successful response";
      if (code === 201) desc = "Resource created successfully";
      if (code === 400) desc = "Invalid input or validation error";
      if (code === 401) desc = "Unauthorized - Missing or invalid Bearer token";
      if (code === 403) desc = "Forbidden - Insufficient permissions";
      if (code === 404) desc = "Resource not found";
      if (code === 500) desc = "Internal server error";

      responses[String(code)] = {
        description: desc,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: code < 400 },
                message: { type: "string", example: desc },
                data: { type: "object" }
              }
            }
          }
        }
      };
    });

    paths[pathKey][method] = {
      summary: api.description || `Execute ${api.method} ${api.endpoint}`,
      description: `${api.description || "API Endpoint"}. Authentication: ${api.authentication ? "Required" : "Public"}.`,
      operationId: `${method}_${pathKey.replace(/[^a-zA-Z0-9]/g, "_")}`,
      parameters: pathParams.length > 0 ? pathParams : undefined,
      security: api.authentication ? [{ BearerAuth: [] }] : [],
      responses
    };

    if (["post", "put", "patch"].includes(method)) {
      paths[pathKey][method].requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              description: `Request payload for ${api.endpoint}`
            }
          }
        }
      };
    }
  });

  const openApiDoc = {
    openapi: "3.0.3",
    info: {
      title: `${projectTitle} - API Specification`,
      description: design?.summary || "Enterprise OpenAPI specification generated by StackFlow AI.",
      version: "1.0.0",
      contact: {
        name: "StackFlow Architecture Team",
        url: "https://stackflow.ai"
      }
    },
    servers: [
      {
        url: "https://api.production.example.com",
        description: "Production Gateway"
      },
      {
        url: "http://localhost:8080",
        description: "Local Development Server"
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JSON Web Token (JWT) with format: Bearer <token>"
        }
      }
    },
    paths
  };

  return JSON.stringify(openApiDoc, null, 2);
}

export function generateTypeScriptTypes(design, projectTitle = "System Architecture") {
  const tables = design?.database?.tables || [];
  const apis = design?.apis || [];

  let ts = `/**\n`;
  ts += ` * StackFlow AI - TypeScript Entity Interfaces & API Contracts\n`;
  ts += ` * Project: ${projectTitle}\n`;
  ts += ` * Auto-generated on: ${new Date().toISOString()}\n`;
  ts += ` */\n\n`;

  ts += `// ==========================================================================\n`;
  ts += `// Common Primitives & Utility Types\n`;
  ts += `// ==========================================================================\n`;
  ts += `export type UUID = string;\n`;
  ts += `export type TimestampISO = string;\n\n`;

  // Tables to Interfaces
  ts += `// ==========================================================================\n`;
  ts += `// Database Entities\n`;
  ts += `// ==========================================================================\n\n`;

  tables.forEach((table) => {
    const typeName = table.name.replace(/[^a-zA-Z0-9]/g, "");
    ts += `/**\n`;
    ts += ` * Entity: ${table.name}\n`;
    ts += ` * ${table.description || "Database table model"}\n`;
    ts += ` */\n`;
    ts += `export interface ${typeName}Entity {\n`;

    const fields = table.fields || [];
    fields.forEach((field) => {
      const colName = field.name.replace(/\s+/g, "_");
      let tsType = "string";
      const rawType = (field.type || "").toLowerCase();

      if (rawType.includes("int") || rawType.includes("number") || rawType.includes("float")) {
        tsType = "number";
      } else if (rawType.includes("bool")) {
        tsType = "boolean";
      } else if (rawType.includes("date") || rawType.includes("time") || colName.includes("at")) {
        tsType = "TimestampISO";
      } else if (rawType.includes("json") || rawType.includes("object")) {
        tsType = "Record<string, unknown>";
      } else if (rawType.includes("array")) {
        tsType = "string[]";
      }

      const optional = field.isNullable ? "?" : "";
      ts += `  ${colName}${optional}: ${tsType};\n`;
    });

    ts += `}\n\n`;

    // Create DTO
    ts += `export type Create${typeName}DTO = Omit<${typeName}Entity, "id" | "created_at" | "updated_at">;\n`;
    ts += `export type Update${typeName}DTO = Partial<Create${typeName}DTO>;\n\n`;
  });

  // API Request & Response Contracts
  ts += `// ==========================================================================\n`;
  ts += `// API Contracts & Responses\n`;
  ts += `// ==========================================================================\n\n`;
  ts += `export interface ApiResponse<T = unknown> {\n`;
  ts += `  success: boolean;\n`;
  ts += `  message?: string;\n`;
  ts += `  data?: T;\n`;
  ts += `  error?: string;\n`;
  ts += `}\n\n`;

  apis.forEach((api, index) => {
    const cleanEndpoint = api.endpoint.replace(/[^a-zA-Z0-9]/g, "_");
    const name = `${api.method.toLowerCase()}_${cleanEndpoint}_${index}`;

    ts += `// ${api.method} ${api.endpoint}: ${api.description || ""}\n`;
    ts += `export interface Api_${name}_Response extends ApiResponse {\n`;
    ts += `  data?: Record<string, unknown>;\n`;
    ts += `}\n\n`;
  });

  return ts;
}

export function generateTerraform(design, projectTitle = "System Architecture") {
  const cleanName = projectTitle.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20);

  let tf = `# ==========================================================================\n`;
  tf += `# StackFlow AI - AWS Terraform Cloud Infrastructure Specification\n`;
  tf += `# Project: ${projectTitle}\n`;
  tf += `# ==========================================================================\n\n`;
  tf += `terraform {\n`;
  tf += `  required_version = ">= 1.5.0"\n`;
  tf += `  required_providers {\n`;
  tf += `    aws = {\n`;
  tf += `      source  = "hashicorp/aws"\n`;
  tf += `      version = "~> 5.0"\n`;
  tf += `    }\n`;
  tf += `  }\n`;
  tf += `}\n\n`;
  tf += `provider "aws" {\n`;
  tf += `  region = var.aws_region\n`;
  tf += `  default_tags {\n`;
  tf += `    tags = {\n`;
  tf += `      Project     = "${projectTitle}"\n`;
  tf += `      Environment = var.environment\n`;
  tf += `      ManagedBy   = "StackFlow-AI"\n`;
  tf += `    }\n`;
  tf += `  }\n`;
  tf += `}\n\n`;

  tf += `variable "aws_region" {\n`;
  tf += `  default = "us-east-1"\n`;
  tf += `}\n\n`;

  tf += `variable "environment" {\n`;
  tf += `  default = "production"\n`;
  tf += `}\n\n`;

  tf += `# --- VPC & Networking ---\n`;
  tf += `resource "aws_vpc" "main" {\n`;
  tf += `  cidr_block           = "10.0.0.0/16"\n`;
  tf += `  enable_dns_hostnames = true\n`;
  tf += `  enable_dns_support   = true\n`;
  tf += `  tags = { Name = "${cleanName}-vpc" }\n`;
  tf += `}\n\n`;

  tf += `# --- Amazon ECS Cluster (Fargate) ---\n`;
  tf += `resource "aws_ecs_cluster" "app_cluster" {\n`;
  tf += `  name = "${cleanName}-ecs-cluster"\n`;
  tf += `  setting {\n`;
  tf += `    name  = "containerInsights"\n`;
  tf += `    value = "enabled"\n`;
  tf += `  }\n`;
  tf += `}\n\n`;

  tf += `# --- Amazon RDS PostgreSQL Database (Multi-AZ) ---\n`;
  tf += `resource "aws_db_instance" "postgres_primary" {\n`;
  tf += `  identifier             = "${cleanName}-pg-db"\n`;
  tf += `  engine                 = "postgres"\n`;
  tf += `  engine_version         = "16.1"\n`;
  tf += `  instance_class         = "db.t4g.medium"\n`;
  tf += `  allocated_storage      = 50\n`;
  tf += `  max_allocated_storage  = 200\n`;
  tf += `  multi_az               = true\n`;
  tf += `  db_name                = "${cleanName.replace(/-/g, "_")}_db"\n`;
  tf += `  username               = "adminuser"\n`;
  tf += `  password               = "ChangeMeInSecretsManager123!"\n`;
  tf += `  skip_final_snapshot    = false\n`;
  tf += `  storage_encrypted      = true\n`;
  tf += `}\n\n`;

  tf += `# --- Amazon ElastiCache Redis Cluster ---\n`;
  tf += `resource "aws_elasticache_cluster" "redis_cache" {\n`;
  tf += `  cluster_id           = "${cleanName}-redis"\n`;
  tf += `  engine               = "redis"\n`;
  tf += `  node_type            = "cache.t4g.small"\n`;
  tf += `  num_cache_nodes      = 1\n`;
  tf += `  parameter_group_name = "default.redis7"\n`;
  tf += `  port                 = 6379\n`;
  tf += `}\n\n`;

  tf += `# --- Outputs ---\n`;
  tf += `output "rds_endpoint" {\n`;
  tf += `  value       = aws_db_instance.postgres_primary.endpoint\n`;
  tf += `  description = "Connection endpoint for PostgreSQL RDS"\n`;
  tf += `}\n\n`;
  tf += `output "redis_endpoint" {\n`;
  tf += `  value       = aws_elasticache_cluster.redis_cache.cache_nodes[0].address\n`;
  tf += `  description = "Connection endpoint for Redis cache"\n`;
  tf += `}\n`;

  return tf;
}
