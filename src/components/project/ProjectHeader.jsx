import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Sparkles,
  BookmarkCheck,
  Bookmark,
  FileDown,
  FileType,
  RefreshCw,
  Trash2,
  Layers,
  ArrowLeft
} from "lucide-react";
import Button from "../common/Button.jsx";
import Badge from "../common/Badge.jsx";
import { formatDate } from "../../utils/formatDate.js";

export function ProjectHeader({
  project,
  onRegenerate,
  onToggleSave,
  onExportPDF,
  onExportWord,
  onDelete,
  regenerating = false
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </Link>
            <span className="text-slate-300">•</span>
            <Badge variant="primary" size="sm">
              System Design Spec
            </Badge>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {project?.title || "Untitled System Design"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-3xl leading-relaxed">
            {project?.description || "No project description provided."}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Created: {formatDate(project?.createdAt)}
            </span>
            <span>•</span>
            <span>Last Updated: {formatDate(project?.updatedAt)}</span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {onToggleSave && (
            <Button
              variant={project?.isSaved ? "secondary" : "outline"}
              size="sm"
              icon={project?.isSaved ? BookmarkCheck : Bookmark}
              onClick={() => onToggleSave(project.id)}
            >
              {project?.isSaved ? "Saved" : "Save"}
            </Button>
          )}

          {onRegenerate && (
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              loading={regenerating}
              onClick={onRegenerate}
            >
              Regenerate
            </Button>
          )}

          {onExportPDF && (
            <Button
              variant="secondary"
              size="sm"
              icon={FileDown}
              onClick={onExportPDF}
            >
              Export PDF
            </Button>
          )}

          {onExportWord && (
            <Button
              variant="secondary"
              size="sm"
              icon={FileType}
              onClick={onExportWord}
            >
              Export Word
            </Button>
          )}

          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={onDelete}
              className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader;
