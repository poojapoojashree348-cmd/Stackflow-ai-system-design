import React from "react";
import { FolderPlus, Layers, BookmarkCheck, Search } from "lucide-react";
import Button from "./Button.jsx";

export function EmptyState({
  title = "No items found",
  description = "Get started by generating your first system design with StackFlow AI.",
  icon: CustomIcon,
  type = "default",
  actionLabel,
  onAction,
  className = ""
}) {
  const iconMap = {
    projects: FolderPlus,
    history: Layers,
    saved: BookmarkCheck,
    search: Search,
    default: FolderPlus
  };

  const IconComponent = CustomIcon || iconMap[type] || iconMap.default;

  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200/80 bg-slate-50/50 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
        <IconComponent className="w-7 h-7" />
      </div>

      <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">{description}</p>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
