import React from "react";
import { Link } from "react-router-dom";
import { Layers, Calendar, ArrowRight, BookmarkCheck, Bookmark, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate.js";

export function ProjectCard({ project, onToggleSave, onDelete }) {
  const hasDesign = !!project.design;
  const techStack = project.design?.technologyStack || [];

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0f1422] p-5 shadow-xs hover:border-slate-700 transition-all">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Layers className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleSave && (
              <button
                onClick={() => onToggleSave(project.id)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  project.isSaved
                    ? "bg-indigo-950/60 border-indigo-500/40 text-indigo-400"
                    : "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
                title={project.isSaved ? "Saved" : "Save"}
              >
                {project.isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(project.id)}
                className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-950/20 transition-colors"
                title="Delete project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <Link to={`/projects/${project.id}`} className="block group">
          <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[32px]">
            {project.description || "No project description provided."}
          </p>
        </Link>

        {/* Tech Badges */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
            {techStack.slice(0, 3).map((t) => (
              <span
                key={t.name}
                className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-medium text-[10px]"
              >
                {t.name.split(" ")[0]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-800/80 text-xs">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-500" />
          {formatDate(project.createdAt)}
        </span>

        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <span>View Blueprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
