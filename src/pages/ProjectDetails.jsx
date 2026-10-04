import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import BentoOverview from "../components/design/BentoOverview.jsx";
import DesignModules from "../components/design/DesignModules.jsx";
import DatabaseSchema from "../components/design/DatabaseSchema.jsx";
import ApiList from "../components/design/ApiList.jsx";
import ArchitectureCanvas from "../components/design/ArchitectureCanvas.jsx";
import TechnologyStack from "../components/design/TechnologyStack.jsx";
import DesignRecommendations from "../components/design/DesignRecommendations.jsx";
import DesignDeployment from "../components/design/DesignDeployment.jsx";
import CodeAndIaC from "../components/design/CodeAndIaC.jsx";
import ResilienceSimulator from "../components/design/ResilienceSimulator.jsx";
import CloudCostEstimator from "../components/design/CloudCostEstimator.jsx";
import ArchitectureCopilotModal from "../components/design/ArchitectureCopilotModal.jsx";
import Loader from "../components/common/Loader.jsx";
import Modal from "../components/common/Modal.jsx";
import { exportProjectToPDF, exportProjectToWord, exportProjectToJSON } from "../utils/helpers.js";
import {
  LayoutGrid,
  Layers,
  Database,
  Link2,
  Network,
  Cpu,
  Bell,
  Download,
  RotateCw,
  Bookmark,
  Trash2,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  FileText,
  FileCode,
  Check,
  Terminal,
  Activity,
  DollarSign,
  Scale,
  Bot
} from "lucide-react";
import { foodDeliveryDesign } from "../data/dummyDesign.js";

export function ProjectDetails({ defaultToSample = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    projects,
    currentProject,
    loadProject,
    generateProjectDesign,
    toggleSaveDesign,
    deleteProject
  } = useProject();

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Determine which project to load
  const targetId = id || (defaultToSample ? "proj_food_delivery" : (projects[0]?.id || "proj_food_delivery"));

  useEffect(() => {
    if (targetId) {
      setLoading(true);
      loadProject(targetId)
        .catch((err) => {
          console.warn("Could not load project by id, falling back to dummy", err);
        })
        .finally(() => setLoading(false));
    }
  }, [targetId]);

  // Fallback to sample food delivery project if no current project
  const project = currentProject || projects.find(p => p.id === targetId) || {
    id: "proj_food_delivery",
    title: "Online Food Delivery System",
    description: "Cloud-native food delivery system featuring customer mobile ordering, restaurant partner management, real-time courier tracking, and payment processing.",
    status: "Generated",
    isSaved: true,
    design: foodDeliveryDesign
  };

  const design = project?.design || foodDeliveryDesign;

  const handleRegenerate = async () => {
    if (!project) return;
    try {
      setRegenerating(true);
      await generateProjectDesign(project.title, project.description, project.id);
    } catch (err) {
      console.error("Regenerate failed:", err);
    } finally {
      setRegenerating(false);
    }
  };

  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [exportNotification, setExportNotification] = useState(null);

  const handleExport = (format = "pdf") => {
    if (!project) return;
    setExportMenuOpen(false);

    if (format === "pdf") {
      setExportNotification("✨ Generating Executive Architecture Blueprint...");
      setTimeout(() => {
        try {
          exportProjectToPDF(project);
          setExportNotification("✓ Executive Blueprint Downloaded!");
        } catch (err) {
          console.error("PDF export error:", err);
          setExportNotification("Failed to generate PDF");
        }
        setTimeout(() => setExportNotification(null), 3000);
      }, 250);
    } else if (format === "word") {
      exportProjectToWord(project);
      setExportNotification("✓ Word Specification Downloaded!");
      setTimeout(() => setExportNotification(null), 2500);
    } else if (format === "json") {
      exportProjectToJSON(project);
      setExportNotification("✓ JSON Architecture Downloaded!");
      setTimeout(() => setExportNotification(null), 2500);
    }
  };

  const handleExportPDF = () => {
    handleExport("pdf");
  };

  const handleDelete = async () => {
    if (!project) return;
    try {
      setIsDeleting(true);
      await deleteProject(project.id);
      navigate("/projects");
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24">
        <Loader message="Loading System Design Architecture..." size="lg" />
      </div>
    );
  }

  if (regenerating) {
    return (
      <div className="bg-[#0f1422] rounded-2xl border border-slate-800 p-8 my-8">
        <Loader isAIGeneration={true} />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "modules", label: "Modules", icon: Layers },
    { id: "database", label: "Database Schema", icon: Database },
    { id: "apis", label: "API Endpoints", icon: Link2 },
    { id: "architecture", label: "Architecture", icon: Network },
    { id: "techstack", label: "Tech Stack", icon: Cpu },
    { id: "code", label: "Code & IaC", icon: Terminal },
    { id: "resilience", label: "Resilience Lab", icon: Activity },
    { id: "costs", label: "Cost Estimator", icon: DollarSign },
    { id: "recommendations", label: "Recommendations", icon: Bell }
  ];

  const isSample = targetId === "proj_food_delivery" || defaultToSample || !id;

  return (
    <div className="space-y-4">
      {/* Top Header Row matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {isSample ? "Sample Output" : project.title}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Generated Successfully
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Project: {project.title}
          </p>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/compare?project=${project.id}`)}
            title="Compare with another architecture pattern"
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          <button
            onClick={() => setIsGeminiOpen(true)}
            title="Ask Gemini Architecture Assistant"
            className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 border border-cyan-500/40 text-cyan-200 hover:text-white hover:border-cyan-400 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Ask Gemini</span>
          </button>

          <button
            onClick={() => toggleSaveDesign(project.id)}
            title={project.isSaved ? "Saved to Bookmarks" : "Save Design"}
            className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
              project.isSaved
                ? "bg-indigo-950/60 border-indigo-500/50 text-indigo-400"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={handleRegenerate}
            title="Regenerate with AI"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Export Dropdown Group */}
          <div className="relative">
            <div className="inline-flex rounded-lg shadow-sm shadow-indigo-600/30 overflow-hidden">
              <button
                onClick={() => handleExport("pdf")}
                title="Download Executive Architecture Blueprint (PDF)"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
              <button
                onClick={() => setExportMenuOpen((prev) => !prev)}
                className="px-1.5 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-indigo-200 hover:text-white border-l border-indigo-500/40 transition-colors cursor-pointer"
                title="Choose export format"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dropdown Menu */}
            {exportMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setExportMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0f172a] border border-slate-700/80 shadow-2xl z-50 p-1.5 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    Export Architecture Specification
                  </div>

                  <button
                    onClick={() => handleExport("pdf")}
                    className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-indigo-950/60 text-left transition-colors group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white">Executive Blueprint</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                          PDF
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                        Styled multi-page report with Bento matrix, colored badges & topology.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleExport("word")}
                    className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-800/60 text-left transition-colors group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white">Word Specification</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          DOC
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                        Editable document for Microsoft Word & Google Docs.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleExport("json")}
                    className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-800/60 text-left transition-colors group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <FileCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white">Machine Payload</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          JSON
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                        Raw architecture schema data for CI/CD pipelines.
                      </p>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Floating Export Toast Notification */}
      {exportNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-indigo-500/50 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>{exportNotification}</span>
        </div>
      )}

      {/* Tab Navigation matching screenshot */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-800/80 pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 shadow-xs"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab View */}
      <div className="pt-2">
        {activeTab === "overview" && (
          <BentoOverview project={project} design={design} />
        )}
        {activeTab === "modules" && (
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
            <DesignModules modules={design?.modules || design?.functionalModules} />
          </div>
        )}
        {activeTab === "database" && (
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
            <DatabaseSchema database={design?.database} />
          </div>
        )}
        {activeTab === "apis" && (
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
            <ApiList apis={design?.apis} />
          </div>
        )}
        {activeTab === "architecture" && (
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
            <ArchitectureCanvas architecture={design?.architecture} />
          </div>
        )}
        {activeTab === "techstack" && (
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
            <TechnologyStack technologyStack={design?.technologyStack || design?.techStack} />
          </div>
        )}
        {activeTab === "recommendations" && (
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-6">
            <DesignRecommendations recommendations={design?.recommendations || design?.aiRecommendations} />
          </div>
        )}
        {activeTab === "code" && (
          <CodeAndIaC project={project} design={design} />
        )}
        {activeTab === "resilience" && (
          <ResilienceSimulator project={project} design={design} />
        )}
        {activeTab === "costs" && (
          <CloudCostEstimator project={project} design={design} />
        )}
      </div>

      {/* Gemini Architecture Assistant Drawer */}
      <ArchitectureCopilotModal
        isOpen={isGeminiOpen}
        onClose={() => setIsGeminiOpen(false)}
        project={project}
        design={design}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project Specification"
        description="Are you sure you want to delete this project? This will permanently delete the generated system design document."
      >
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
            className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectDetails;
