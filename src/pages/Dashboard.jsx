import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useProject } from "../context/ProjectContext.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import RecentProject from "../components/dashboard/RecentProject.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import {
  FolderKanban,
  Sparkles,
  BookmarkCheck,
  Coins,
  Plus,
  ArrowRight,
  Layers,
  Cpu,
  Terminal,
  Activity,
  DollarSign,
  Scale
} from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();
  const { projects, stats, toggleSaveDesign } = useProject();
  const navigate = useNavigate();

  const credits = user?.credits ?? stats.creditsRemaining ?? 85;
  const recentProjects = projects.slice(0, 5);
  const activeProject = projects.length > 0 ? projects[0] : null;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Welcome back, {user?.name ? user.name.split(" ")[0] : "Developer"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            StackFlow AI System Design Engine is ready to architect your next software project.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate("/sample-output")}
            className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sample Output</span>
          </button>

          <button
            onClick={() => navigate("/projects/new")}
            className="px-3.5 py-2 rounded-lg bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm shadow-indigo-600/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New System Design</span>
          </button>
        </div>
      </div>

      {/* Active Project Card (Only shown if the user actually has a project) */}
      {activeProject && (
        <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-[#0f1422] to-slate-900/80 p-5 relative overflow-hidden shadow-lg animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Architecture Specification
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {activeProject.title}
              </h2>
              <p className="text-xs text-slate-300">
                {activeProject.description || "Synthesized architecture output featuring microservices, ER database schemas, REST APIs, and deployment topology."}
              </p>
            </div>

            <button
              onClick={() => navigate(`/projects/${activeProject.id}`)}
              className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              <span>View Architecture Output</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 4 Primary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Projects"
          value={projects.length}
          subtitle="blueprints"
          icon={FolderKanban}
          color="indigo"
        />

        <StatCard
          title="Architectures"
          value={projects.filter((p) => p.status === "Generated" || p.design).length}
          subtitle="synthesized"
          icon={Sparkles}
          color="purple"
        />

        <StatCard
          title="Saved Blueprints"
          value={projects.filter((p) => p.isSaved).length}
          subtitle="bookmarked"
          icon={BookmarkCheck}
          color="emerald"
        />

        <StatCard
          title="AI Credits"
          value={credits}
          subtitle="/ 100 available"
          icon={Coins}
          color="amber"
        />
      </div>

      {/* Advanced Engineering Suite Feature Showcase */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-200">Architecture Engineering Suite</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-400">
              NEW FEATURES
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Code & IaC */}
          <div
            onClick={() => navigate(activeProject ? `/projects/${activeProject.id}?tab=code` : "/sample-output")}
            className="p-4 rounded-xl border border-slate-800 bg-[#0d121f] hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                Code & IaC Generator
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                PostgreSQL DDL scripts, Docker Compose stacks, and OpenAPI 3.0 specs ready to copy or download.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-medium text-indigo-400">
              <span>Generate Artifacts</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Resilience Simulator */}
          <div
            onClick={() => navigate(activeProject ? `/projects/${activeProject.id}?tab=resilience` : "/sample-output")}
            className="p-4 rounded-xl border border-slate-800 bg-[#0d121f] hover:border-emerald-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Resilience & Chaos Lab
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Live stress-testing lab with real-time RPS sliders, Redis cache stampedes, and P95 latency diagnostics.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-medium text-emerald-400">
              <span>Launch Stress Test</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Cloud Cost Estimator */}
          <div
            onClick={() => navigate(activeProject ? `/projects/${activeProject.id}?tab=costs` : "/sample-output")}
            className="p-4 rounded-xl border border-slate-800 bg-[#0d121f] hover:border-amber-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                <DollarSign className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                Cloud Cost Estimator
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Forecast monthly AWS / GCP cloud infrastructure spending across compute, database, and Redis.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-medium text-amber-400">
              <span>Calculate Budget</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Architecture Comparator */}
          <div
            onClick={() => navigate("/compare")}
            className="p-4 rounded-xl border border-slate-800 bg-[#0d121f] hover:border-purple-500/50 hover:bg-slate-900/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                Architecture Comparator
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Benchmark against Modular Monolith, Serverless, and Distributed Microservices paradigms.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-medium text-purple-400">
              <span>Compare Patterns</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">Recent System Designs</h2>
          <button
            onClick={() => navigate("/projects")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View All ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentProjects.length === 0 ? (
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-8">
            <EmptyState
              title="No system designs yet"
              description="Create your first system design project to generate complete architecture blueprints with Gemini AI."
              actionLabel="Create System Design"
              onAction={() => navigate("/projects/new")}
            />
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentProjects.map((project) => (
              <RecentProject
                key={project.id}
                project={project}
                onToggleSave={toggleSaveDesign}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
