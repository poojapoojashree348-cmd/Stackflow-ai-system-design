import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight, BookmarkCheck, Bookmark, Layers } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate.js";

export function RecentProject({ project, onToggleSave }) {
  const stackItems = project.design?.technologyStack?.slice(0, 3) || [];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-800 bg-[#0f1422] hover:border-slate-700 transition-all gap-4">
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
          <Layers className="w-5 h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              to={`/projects/${project.id}`}
              className="text-sm font-semibold text-white hover:text-indigo-400 truncate transition-colors"
            >
              {project.title}
            </Link>

            {project.status === "Generated" && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                Generated
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400 line-clamp-1 mt-1">
            {project.description || "No description provided."}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {formatRelativeTime(project.updatedAt || project.createdAt)}
            </span>

            {stackItems.length > 0 && (
              <div className="hidden md:flex items-center gap-1.5">
                {stackItems.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[10px]"
                  >
                    {tech.name.split(" ")[0]}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:self-center shrink-0">
        {onToggleSave && (
          <button
            onClick={() => onToggleSave(project.id)}
            className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
              project.isSaved
                ? "bg-indigo-950/60 border-indigo-500/40 text-indigo-400"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
            title={project.isSaved ? "Saved to Bookmarks" : "Save Project"}
          >
            {project.isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        )}

        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-colors"
        >
          <span>View Design</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default RecentProject;
