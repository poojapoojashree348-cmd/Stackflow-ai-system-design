import React from "react";
import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  icon: Icon,
  type = "button",
  onClick,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm shadow-indigo-600/20 border border-transparent",
    secondary:
      "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 focus:ring-indigo-500 shadow-sm",
    outline:
      "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50/70 focus:ring-indigo-500",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm shadow-rose-600/20 border border-transparent",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400 border border-transparent"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-4 py-2 text-sm font-semibold gap-2",
    lg: "px-5 py-2.5 text-base font-semibold gap-2.5"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0 text-current" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}

export default Button;
