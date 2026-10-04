import React, { useState, useMemo } from "react";
import {
  FileCode2,
  Terminal,
  Database,
  Layers,
  FileJson,
  Copy,
  Check,
  Download,
  Sparkles,
  Cloud,
  CheckCircle2
} from "lucide-react";
import {
  generatePostgresDDL,
  generateDockerCompose,
  generateOpenApiSpec,
  generateTypeScriptTypes,
  generateTerraform
} from "../../utils/codeGenerators.js";

export function CodeAndIaC({ project, design }) {
  const [activeFile, setActiveFile] = useState("ddl");
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const title = project?.title || "System Design";

  const files = useMemo(() => {
    return {
      ddl: {
        id: "ddl",
        filename: "schema.sql",
        language: "sql",
        title: "PostgreSQL DDL Schema",
        description: "Production SQL DDL with UUID primary keys, foreign key constraints, indexes, and triggers.",
        icon: Database,
        badge: "Postgres 16",
        content: generatePostgresDDL(design, title)
      },
      docker: {
        id: "docker",
        filename: "docker-compose.yml",
        language: "yaml",
        title: "Docker Compose Stack",
        description: "Multi-container orchestration for API, PostgreSQL with healthcheck, Redis, and Nginx reverse proxy.",
        icon: Terminal,
        badge: "Docker Stack",
        content: generateDockerCompose(design, title)
      },
      openapi: {
        id: "openapi",
        filename: "openapi.json",
        language: "json",
        title: "OpenAPI 3.0.3 Contract",
        description: "Standard REST API schema specification with route parameters, request bodies, and JWT Bearer security.",
        icon: FileJson,
        badge: "Swagger / OAS 3.0",
        content: generateOpenApiSpec(design, title)
      },
      types: {
        id: "types",
        filename: "types.ts",
        language: "typescript",
        title: "TypeScript SDK Models",
        description: "Strongly-typed entity interfaces, create/update DTOs, and API contract response definitions.",
        icon: FileCode2,
        badge: "TypeScript",
        content: generateTypeScriptTypes(design, title)
      },
      terraform: {
        id: "terraform",
        filename: "main.tf",
        language: "hcl",
        title: "Terraform Cloud Infrastructure",
        description: "Infrastructure as Code for AWS VPC, Multi-AZ RDS PostgreSQL, ECS Fargate cluster, and ElastiCache Redis.",
        icon: Cloud,
        badge: "AWS Terraform",
        content: generateTerraform(design, title)
      }
    };
  }, [design, title]);

  const current = files[activeFile] || files.ddl;

  const handleCopy = () => {
    navigator.clipboard.writeText(current.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([current.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = current.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const handleDownloadAll = () => {
    // Sequential download of the artifacts
    Object.values(files).forEach((f, idx) => {
      setTimeout(() => {
        const blob = new Blob([f.content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = f.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, idx * 250);
    });

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const lines = current.content.split("\n");

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-[#0f1422] to-slate-900/80 p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950/70 border border-indigo-500/40 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Executable Infrastructure & Artifacts</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Code & IaC Generator
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Instant production-grade code artifacts synthesized from your system design specifications.
            Copy or download directly into your git repository to bootstrap implementation immediately.
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/30 cursor-pointer self-start md:self-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download All Files (Bundle)</span>
        </button>
      </div>

      {/* Main Code View Container */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* File Tabs Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#0d121f] px-3 py-2 gap-2">
          {/* File Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {Object.values(files).map((f) => {
              const Icon = f.icon;
              const isActive = activeFile === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFile(f.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{f.filename}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? "bg-indigo-700 text-indigo-100" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {f.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-all cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadSingle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all cursor-pointer active:scale-95 shadow-xs"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {current.filename}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* File Meta Info Bar */}
        <div className="px-4 py-2 bg-[#090d16] border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">{current.title}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{current.description}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 shrink-0 hidden sm:inline">
            {lines.length} lines • {new Blob([current.content]).size} bytes
          </span>
        </div>

        {/* Code Content Box with Line Numbers */}
        <div className="relative font-mono text-xs overflow-x-auto max-h-[620px] bg-[#070a12] p-4 text-slate-200 selection:bg-indigo-600 selection:text-white leading-relaxed">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="w-10 select-none pr-4 text-right text-slate-600 font-mono text-[11px] align-top">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre font-mono text-[11.5px] align-top text-slate-300">
                    {/* Basic syntax coloring hints */}
                    {line.startsWith("--") || line.startsWith("#") || line.startsWith("//") || line.startsWith("/*") ? (
                      <span className="text-slate-500 italic">{line}</span>
                    ) : line.includes("CREATE TABLE") || line.includes("ALTER TABLE") || line.includes("services:") || line.includes("resource") ? (
                      <span className="text-indigo-400 font-semibold">{line}</span>
                    ) : line.includes("PRIMARY KEY") || line.includes("FOREIGN KEY") || line.includes("image:") || line.includes("ports:") ? (
                      <span className="text-amber-400">{line}</span>
                    ) : (
                      line
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CodeAndIaC;
