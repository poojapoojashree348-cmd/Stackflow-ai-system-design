import React from "react";

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  icon: Icon
}) {
  const variantClasses = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-500/10",
    secondary: "bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-500/10",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/10",
    warning: "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/10",
    danger: "bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/10",
    info: "bg-sky-50 text-sky-700 border-sky-200 ring-1 ring-sky-500/10",
    // HTTP API methods
    GET: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20 font-mono font-bold",
    POST: "bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-500/20 font-mono font-bold",
    PUT: "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20 font-mono font-bold",
    DELETE: "bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/20 font-mono font-bold",
    PATCH: "bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-500/20 font-mono font-bold"
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2"
  };

  const badgeClass = variantClasses[variant] || variantClasses.default;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border whitespace-nowrap select-none ${badgeClass} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
