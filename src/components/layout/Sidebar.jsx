import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  Sparkles,
  Clock,
  Bookmark,
  Settings,
  X,
  Cpu,
  Scale
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user } = useAuth();
  const credits = user?.credits ?? 85;

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/projects/new", label: "New Project", icon: PlusSquare },
    { to: "/sample-output", label: "Sample Output", icon: Sparkles },
    { to: "/history", label: "History", icon: Clock },
    { to: "/saved-designs", label: "Saved Designs", icon: Bookmark },
    { to: "/compare", label: "Compare Architectures", icon: Scale },
    { to: "/settings", label: "Settings", icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800/80 bg-[#0d111c] transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-800/80">
          <NavLink to="/dashboard" onClick={onClose} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white leading-none">
                StackFlow AI
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
                AI System Design Generator
              </span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Check active condition
            let isActive = false;
            if (item.to === "/dashboard") {
              isActive = location.pathname === "/dashboard" || location.pathname === "/";
            } else if (item.to === "/sample-output") {
              isActive =
                location.pathname === "/sample-output" ||
                location.pathname === "/projects/proj_food_delivery";
            } else if (item.to === "/history") {
              isActive = location.pathname === "/history" || location.search.includes("filter=history");
            } else if (item.to === "/saved-designs") {
              isActive = location.pathname === "/saved-designs" || location.search.includes("filter=saved");
            } else {
              isActive = location.pathname.startsWith(item.to);
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#4f46e5] text-white shadow-sm shadow-indigo-600/30"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom AI Credits & Brand Banner */}
        <div className="p-3 border-t border-slate-800/80 bg-[#0d111c]">
          {/* Credits Counter */}
          <div className="px-1 mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-200">AI Credits</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium mb-1.5">
              {credits} / 100 Credits Left
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(5, (credits / 100) * 100))}%` }}
              />
            </div>
          </div>

          {/* Bottom Card */}
          <div className="rounded-xl border border-slate-800/80 bg-[#121826] p-3 flex items-center gap-3 shadow-inner">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.25)]">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">StackFlow AI</p>
              <p className="text-[10px] text-slate-400 truncate">Build Smarter. Design Faster.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
