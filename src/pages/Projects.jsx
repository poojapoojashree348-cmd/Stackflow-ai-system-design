import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import ProjectCard from "../components/project/ProjectCard.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import Modal from "../components/common/Modal.jsx";
import {
  FolderKanban,
  BookmarkCheck,
  History,
  Search,
  Plus,
  Trash2,
  Calendar,
  Layers,
  ArrowRight,
  Clock
} from "lucide-react";
import { formatDate } from "../utils/formatDate.js";

export function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { projects, history, savedDesigns, toggleSaveDesign, deleteProject } = useProject();

  const [activeTab, setActiveTab] = useState(searchParams.get("filter") || "all");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter && ["all", "saved", "history"].includes(filter)) {
      setActiveTab(filter);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ filter: tabId });
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "saved") {
      return matchesSearch && p.isSaved;
    }
    return matchesSearch;
  });

  const filteredHistory = history.filter((h) =>
    h.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      setIsDeleting(true);
      await deleteProject(projectToDelete.id);
      setProjectToDelete(null);
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            System Design Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Manage your architectural specifications, database models, and cloud designs.
          </p>
        </div>

        <button
          onClick={() => navigate("/projects/new")}
          className="px-3.5 py-2 rounded-lg bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm shadow-indigo-600/30 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New System Design</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleTabChange("all")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === "all"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>All Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => handleTabChange("saved")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === "saved"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Saved ({savedDesigns.length})</span>
          </button>

          <button
            onClick={() => handleTabChange("history")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === "history"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>History ({history.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === "history" ? (
        filteredHistory.length === 0 ? (
          <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-8">
            <EmptyState
              title="No generation history found"
              description="Generated system design steps and revisions will be archived here."
              actionLabel="Create System Design"
              onAction={() => navigate("/projects/new")}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-[#0f1422] text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.projectTitle}</p>
                    <p className="text-slate-400 text-[11px]">{item.action} • {formatDate(item.timestamp)}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/projects/${item.projectId}`)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )
      ) : filteredProjects.length === 0 ? (
        <div className="bg-[#0f1422] border border-slate-800 rounded-xl p-8">
          <EmptyState
            title={activeTab === "saved" ? "No saved designs" : "No projects found"}
            description={
              activeTab === "saved"
                ? "You haven't bookmarked any system design blueprints yet."
                : "No projects match your current search query."
            }
            actionLabel="Create System Design"
            onAction={() => navigate("/projects/new")}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleSave={toggleSaveDesign}
              onDelete={() => setProjectToDelete(project)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title="Delete System Design Blueprint"
        description={`Are you sure you want to delete "${projectToDelete?.title}"? This cannot be undone.`}
      >
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={() => setProjectToDelete(null)}
            disabled={isDeleting}
            className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
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

export default Projects;
