import React from "react";
import { CheckCircle2, Globe, Server, Database, GitBranch, Shield, ArrowRight, Layers, Cpu, Cloud, Code } from "lucide-react";
import ProjectIllustration from "./ProjectIllustration.jsx";

export function BentoOverview({ project, design }) {
  // Extract project summary data with defaults matching current project
  const summary = design?.projectSummary || {
    projectName: project?.title || "Online Food Delivery System",
    projectType: "Web Application",
    architecture: design?.architecture?.pattern || "Microservices Architecture",
    frontend: design?.technologyStack?.find(t => t.category === "Frontend")?.name || "React.js",
    backend: design?.technologyStack?.find(t => t.category === "Backend")?.name || "Node.js (Express)",
    database: design?.database?.databaseType || "MongoDB",
    authentication: design?.technologyStack?.find(t => t.category === "Authentication")?.name || "JWT",
    deployment: design?.technologyStack?.find(t => t.category === "Deployment")?.name || "Docker + AWS"
  };

  // Dynamic functional modules
  const functionalModulesList = (design?.functionalModules && design.functionalModules.length > 0)
    ? design.functionalModules
    : (design?.modules && design.modules.length > 0)
      ? design.modules.slice(0, 3).map((m, idx) => ({
          id: m.id || `mod_${idx}`,
          name: m.name,
          color: idx === 0 ? "blue" : (idx === 1 ? "green" : "amber"),
          items: m.responsibilities || []
        }))
      : [
          {
            id: "customer",
            name: "Customer Module",
            color: "blue",
            items: ["User Registration / Login", "Browse Catalog", "Search Food", "Add to Cart", "Place Order", "Track Order", "Order History", "Payment"]
          },
          {
            id: "restaurant",
            name: "Restaurant Module",
            color: "green",
            items: ["Restaurant Login", "Manage Menu", "Manage Orders", "Update Order Status", "View Earnings"]
          },
          {
            id: "admin",
            name: "Admin Module",
            color: "amber",
            items: ["Admin Dashboard", "Manage Users", "Manage Restaurants", "Manage Orders", "Manage Categories", "Reports & Analytics"]
          }
        ];

  // Dynamic database tables (up to 6 tables)
  const tablesList = (design?.database?.tables && design.database.tables.length > 0)
    ? design.database.tables.slice(0, 6)
    : [
        {
          name: "Users",
          fields: [
            { name: "user_id", isPrimaryKey: true },
            { name: "name" },
            { name: "email" },
            { name: "password" },
            { name: "phone" },
            { name: "role" }
          ]
        },
        {
          name: "Entities",
          fields: [
            { name: "entity_id", isPrimaryKey: true },
            { name: "user_id", isForeignKey: true },
            { name: "name" },
            { name: "address" },
            { name: "rating" },
            { name: "image" }
          ]
        },
        {
          name: "Catalog_Items",
          fields: [
            { name: "item_id", isPrimaryKey: true },
            { name: "entity_id", isForeignKey: true },
            { name: "name" },
            { name: "price" },
            { name: "category" },
            { name: "image" }
          ]
        },
        {
          name: "Orders",
          fields: [
            { name: "order_id", isPrimaryKey: true },
            { name: "user_id", isForeignKey: true },
            { name: "total_amount" },
            { name: "status" },
            { name: "order_time" }
          ]
        },
        {
          name: "Order_Items",
          fields: [
            { name: "order_item_id", isPrimaryKey: true },
            { name: "order_id", isForeignKey: true },
            { name: "quantity" },
            { name: "price" }
          ]
        },
        {
          name: "Payments",
          fields: [
            { name: "payment_id", isPrimaryKey: true },
            { name: "order_id", isForeignKey: true },
            { name: "amount" },
            { name: "method" },
            { name: "status" },
            { name: "payment_time" }
          ]
        }
      ];

  // Dynamic API Endpoints (up to 8 endpoints)
  const apisList = (design?.apis && design.apis.length > 0)
    ? design.apis.slice(0, 8)
    : [
        { method: "POST", endpoint: "/api/auth/register", description: "Register new user" },
        { method: "POST", endpoint: "/api/auth/login", description: "User login" },
        { method: "GET", endpoint: "/api/resources", description: "Get all resources" },
        { method: "GET", endpoint: "/api/items", description: "Get items catalog" },
        { method: "POST", endpoint: "/api/orders", description: "Place new order / booking" },
        { method: "GET", endpoint: "/api/orders/:id", description: "Get order details" },
        { method: "PUT", endpoint: "/api/orders/:id/status", description: "Update status" },
        { method: "POST", endpoint: "/api/payments", description: "Process payment" }
      ];

  // Dynamic architecture services
  const archComponents = design?.architecture?.components?.slice(0, 4) || [
    { name: "User Service" },
    { name: "Core Service" },
    { name: "Order Service" },
    { name: "Payment Service" }
  ];

  // Dynamic recommendations (up to 5)
  const recommendationsList = (design?.recommendations && design.recommendations.length > 0)
    ? design.recommendations.slice(0, 5)
    : [
        { title: "Caching", description: "Use Redis for caching frequently accessed data." },
        { title: "WebSockets", description: "Implement real-time updates and notifications using WebSockets." },
        { title: "Security", description: "Use Stripe or Razorpay for secure payments with TLS encryption." },
        { title: "Access Control", description: "Implement Role-Based Access Control (RBAC)." },
        { title: "Monitoring", description: "Use CloudWatch or Datadog for monitoring and telemetry logs." }
      ];

  // Dynamic deployment plan (up to 5)
  const deploymentList = (design?.deployment && design.deployment.length > 0)
    ? design.deployment.slice(0, 5)
    : [
        { icon: "🌐", text: "Frontend → Deploy on AWS S3 + CloudFront" },
        { icon: "🐳", text: "Backend → Deploy using Docker on AWS EC2 / ECS" },
        { icon: "🗄️", text: "Database → Managed Cloud Database" },
        { icon: "🔄", text: "CI/CD → Automated GitHub Actions Pipeline" },
        { icon: "🔒", text: "Domain → Route 53 + SSL (HTTPS) Encryption" }
      ];

  return (
    <div className="space-y-4">
      {/* ROW 1: 1. Project Summary (Left) & 2. Functional Modules (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: 1. Project Summary with Dynamic Domain Picture */}
        <div className="lg:col-span-5 bg-[#0f1422] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-semibold text-indigo-400">
                1. Project Summary
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {summary.projectType}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-between">
              {/* Key Values List */}
              <div className="space-y-2 text-xs flex-1 min-w-[170px]">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-slate-200 font-medium whitespace-nowrap">Project Name:</span>
                  <span className="text-slate-300 text-right truncate font-semibold" title={summary.projectName}>
                    {summary.projectName}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-slate-200 font-medium whitespace-nowrap">Project Type:</span>
                  <span className="text-slate-300 text-right">{summary.projectType}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-slate-200 font-medium whitespace-nowrap">Architecture:</span>
                  <span className="text-slate-300 text-right truncate" title={summary.architecture}>{summary.architecture}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-slate-200 font-medium whitespace-nowrap">Frontend:</span>
                  <span className="text-slate-300 text-right">{summary.frontend}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-slate-200 font-medium whitespace-nowrap">Backend:</span>
                  <span className="text-slate-300 text-right">{summary.backend}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-slate-200 font-medium whitespace-nowrap">Database:</span>
                  <span className="text-slate-300 text-right">{summary.database}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-slate-200 font-medium whitespace-nowrap">Authentication:</span>
                  <span className="text-slate-300 text-right">{summary.authentication}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-slate-200 font-medium whitespace-nowrap">Deployment:</span>
                  <span className="text-slate-300 text-right">{summary.deployment}</span>
                </div>
              </div>

              {/* Dynamic Project Picture & Mockup matching Project Domain */}
              <ProjectIllustration 
                project={project} 
                design={design} 
                summary={summary} 
              />
            </div>
          </div>
        </div>

        {/* Card 2: 2. Functional Modules */}
        <div className="lg:col-span-7 bg-[#0f1422] border border-slate-800 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-semibold text-indigo-400">
              2. Functional Modules
            </h3>
            <span className="text-[10px] text-slate-400">
              {functionalModulesList.length} Core Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {functionalModulesList.map((mod, index) => {
              const colorTheme = 
                mod.color === "green" 
                  ? { border: "border-emerald-500/30", bg: "bg-[#102420]", header: "bg-emerald-950/60 border-emerald-500/30 text-emerald-400" }
                  : mod.color === "amber" 
                    ? { border: "border-amber-500/30", bg: "bg-[#241c13]", header: "bg-amber-950/60 border-amber-500/30 text-amber-400" }
                    : { border: "border-sky-500/30", bg: "bg-[#121b2d]", header: "bg-sky-950/60 border-sky-500/30 text-sky-400" };

              return (
                <div key={mod.id || index} className={`rounded-lg border ${colorTheme.border} ${colorTheme.bg} overflow-hidden flex flex-col`}>
                  <div className={`${colorTheme.header} border-b px-3 py-1.5 text-center text-xs font-semibold truncate`}>
                    {mod.name}
                  </div>
                  <div className="p-3 text-xs text-slate-300 space-y-1 flex-1">
                    {(mod.items || []).slice(0, 8).map((item, itemIdx) => (
                      <p key={itemIdx} className="leading-snug truncate" title={item}>
                        • {item}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ROW 2: 3. Database Schema (Left), 4. API Endpoints (Middle), 5. System Architecture (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 3: 3. Database Schema (Main Tables) */}
        <div className="lg:col-span-4 bg-[#0f1422] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-indigo-400 mb-3.5">
            3. Database Schema (Main Tables)
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            {tablesList.map((table, tIdx) => {
              const tableName = table.name || `Table_${tIdx + 1}`;
              const fields = table.fields || [];

              return (
                <div key={tIdx} className="rounded border border-slate-700/80 bg-[#161f30] overflow-hidden">
                  <div className="bg-slate-800/80 px-2 py-1 font-semibold text-slate-200 border-b border-slate-700/80 text-center truncate">
                    {tableName}
                  </div>
                  <div className="p-1.5 space-y-0.5 text-slate-300 font-mono text-[10px]">
                    {fields.slice(0, 6).map((f, fIdx) => {
                      const fieldName = typeof f === "string" ? f : f.name;
                      const isPk = typeof f === "object" ? f.isPrimaryKey : fIdx === 0;
                      const isFk = typeof f === "object" ? f.isForeignKey : fieldName.includes("_id") && fIdx > 0;

                      return (
                        <p 
                          key={fIdx} 
                          className={`truncate ${
                            isPk ? "text-indigo-300 font-bold" : isFk ? "text-sky-300" : "text-slate-300"
                          }`}
                        >
                          {fieldName} {isPk && "(PK)"} {isFk && !isPk && "(FK)"}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-[10px] text-slate-400 text-center flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> PK = Primary Key
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> FK = Foreign Key
            </span>
          </div>
        </div>

        {/* Card 4: 4. API Endpoints */}
        <div className="lg:col-span-4 bg-[#0f1422] border border-slate-800 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-indigo-400 mb-3.5">
            4. API Endpoints
          </h3>
          <div className="space-y-1.5 text-xs font-mono">
            {apisList.map((api, aIdx) => {
              const method = api.method || "GET";
              const endpoint = api.endpoint || api.path || "/api";
              const description = api.description || "";

              const badgeColor = 
                method === "POST" 
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : method === "PUT" || method === "PATCH"
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                    : method === "DELETE"
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                      : "bg-sky-500/20 text-sky-400 border-sky-500/40";

              return (
                <div key={aIdx} className="flex items-center gap-2 text-slate-300">
                  <span className={`${badgeColor} border text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0`}>
                    {method}
                  </span>
                  <span className="text-slate-200 truncate">{endpoint}</span>
                  {description && (
                    <span className="text-slate-400 font-sans text-[11px] shrink-0 truncate max-w-[120px]">
                      - {description}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 5: 5. System Architecture */}
        <div className="lg:col-span-4 bg-[#0f1422] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-indigo-400 mb-3.5">
            5. System Architecture
          </h3>

          <div className="flex items-center justify-between gap-1 sm:gap-2 my-auto py-2">
            {/* Client */}
            <div className="rounded-lg border border-sky-500/40 bg-sky-950/30 px-2 py-3 text-center min-w-[70px]">
              <span className="text-sky-300 font-semibold text-[10px] block leading-tight">
                Client<br />({summary.frontend.split(" ")[0] || "React.js"})
              </span>
            </div>

            <div className="text-slate-500 text-xs">→</div>

            {/* Load Balancer */}
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-2 py-3 text-center min-w-[70px]">
              <span className="text-emerald-300 font-semibold text-[10px] block leading-tight">
                Nginx / API<br />(Gateway)
              </span>
            </div>

            <div className="text-slate-500 text-xs">→</div>

            {/* Backend Services */}
            <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-1.5 flex flex-col gap-1 min-w-[95px]">
              <span className="text-[9px] text-slate-400 font-medium text-center border-b border-slate-800 pb-0.5 truncate">
                Backend Services
              </span>
              <div className="space-y-1 text-[9px] font-mono">
                {archComponents.map((c, cIdx) => (
                  <div key={cIdx} className="bg-slate-800/80 border border-slate-700/60 rounded px-1.5 py-0.5 text-center text-slate-200 truncate">
                    {c.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-slate-500 text-xs">→</div>

            {/* Database */}
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-2 py-3 text-center min-w-[70px]">
              <span className="text-emerald-300 font-semibold text-[10px] block leading-tight">
                {summary.database.split(" ")[0]}<br />(Database)
              </span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center mt-2">
            {summary.architecture} connected via internal Docker network & routing
          </div>
        </div>
      </div>

      {/* ROW 3: 6. Tech Stack (Left), 7. AI Recommendations (Middle), 8. Deployment Plan (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 6: 6. Tech Stack */}
        <div className="lg:col-span-4 bg-[#0f1422] border border-slate-800 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-indigo-400 mb-3.5">
            6. Tech Stack
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 items-center text-center">
            {/* React */}
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <svg className="w-5 h-5 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-slate-300">React.js</span>
            </div>

            {/* Node */}
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                JS
              </div>
              <span className="text-[10px] font-medium text-slate-300">Node.js</span>
            </div>

            {/* Express */}
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-200 font-semibold text-xs">
                ex
              </div>
              <span className="text-[10px] font-medium text-slate-300">Express</span>
            </div>

            {/* DB */}
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Database className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-slate-300 truncate max-w-[50px]">{summary.database.split(" ")[0]}</span>
            </div>

            {/* Docker */}
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-sky-950/40 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <svg className="w-5 h-4" viewBox="0 0 24 16" fill="currentColor">
                  <path d="M22 6c-.5 0-1.2.2-1.8.6-.6-.8-1.5-1.4-2.7-1.4-.4 0-.8.1-1.2.2C15.8 3.3 14 2 12 2c-.6 0-1.1.1-1.6.4C9.8 1.5 8.9 1 7.9 1 6.8 1 5.8 1.6 5.3 2.5 4.8 2.2 4.2 2 3.6 2 2.2 2 1 3.2 1 4.7c0 .4.1.8.3 1.2C.5 6.6 0 7.7 0 9c0 3.3 2.7 6 6 6h11c3.9 0 7-3.1 7-7 0-1-.3-1.8-.8-2.5.5-.6.8-1.3.8-2.2 0-1.8-1.3-3.3-3-3.3zM4 6h2v2H4V6zm3 0h2v2H7V6zm3 0h2v2h-2V6zm-6 3h2v2H4V9zm3 0h2v2H7V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9z"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-slate-300">Docker</span>
            </div>

            {/* AWS */}
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-[10px]">
                aws
              </div>
              <span className="text-[10px] font-medium text-slate-300">AWS</span>
            </div>

            {/* Tailwind */}
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-slate-300">Tailwind</span>
            </div>
          </div>
        </div>

        {/* Card 7: 7. AI Recommendations */}
        <div className="lg:col-span-4 bg-[#0f1422] border border-slate-800 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-indigo-400 mb-3.5">
            7. AI Recommendations
          </h3>
          <div className="space-y-2 text-xs text-slate-300">
            {recommendationsList.map((rec, rIdx) => {
              const desc = typeof rec === "string" ? rec : (rec.description || rec.title);
              return (
                <div key={rIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 8: 8. Deployment Plan */}
        <div className="lg:col-span-4 bg-[#0f1422] border border-slate-800 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-indigo-400 mb-3.5">
            8. Deployment Plan
          </h3>
          <div className="space-y-2 text-xs text-slate-300 font-sans">
            {deploymentList.map((dep, dIdx) => {
              const text = typeof dep === "string" ? dep : (dep.details || dep.text || `${dep.stage}: ${dep.step}`);
              const icon = dep.icon || (dIdx === 0 ? "🌐" : dIdx === 1 ? "🐳" : dIdx === 2 ? "🗄️" : dIdx === 3 ? "🔄" : "🔒");
              return (
                <div key={dIdx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 text-[10px]">
                    {icon}
                  </div>
                  <span className="truncate">{text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BentoOverview;
