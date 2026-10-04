import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useProject } from "../../context/ProjectContext.jsx";
import {
  Menu,
  Download,
  Coins,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Sparkles,
  FileText,
  FileCode
} from "lucide-react";
import { exportProjectToPDF, exportProjectToWord, exportProjectToJSON } from "../../utils/helpers.js";

export function Navbar({ onToggleSidebar, isMobileSidebarOpen }) {
  const { user, logout } = useAuth();
  const { currentProject, projects } = useProject();
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [exportNotification, setExportNotification] = useState(null);

  // Determine active project for export
  const activeProj = currentProject || (projects.length > 0 ? projects[0] : null);

  const handleExport = (format = "pdf") => {
    setExportMenuOpen(false);

    if (!activeProj) {
      setExportNotification("⚠️ Please create or select a project design before exporting.");
      setTimeout(() => setExportNotification(null), 3000);
      return;
    }

    if (format === "pdf") {
      setExportNotification("✨ Generating Executive Architecture Blueprint...");
      setTimeout(() => {
        try {
          exportProjectToPDF(activeProj);
          setExportNotification("✓ Executive Blueprint Downloaded!");
        } catch (err) {
          console.error("PDF export error:", err);
          setExportNotification("Failed to generate PDF");
        }
        setTimeout(() => setExportNotification(null), 3000);
      }, 250);
    } else if (format === "word") {
      exportProjectToWord(activeProj);
      setExportNotification("✓ Word Specification Downloaded!");
      setTimeout(() => setExportNotification(null), 2500);
    } else if (format === "json") {
      exportProjectToJSON(activeProj);
      setExportNotification("✓ JSON Architecture Downloaded!");
      setTimeout(() => setExportNotification(null), 2500);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-800/80 bg-[#0d111c] px-4 sm:px-6">
      {/* Left side: Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right side: Download Report & User Controls */}
      <div className="flex items-center gap-3">
        {/* Export Split Dropdown */}
        <div className="relative">
          <div className="inline-flex rounded-lg shadow-sm shadow-indigo-600/30 overflow-hidden">
            <button
              onClick={() => handleExport("pdf")}
              title="Download Executive Architecture Blueprint (PDF)"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs sm:text-sm font-medium transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
            <button
              onClick={() => setExportMenuOpen((prev) => !prev)}
              className="px-1.5 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-indigo-200 hover:text-white border-l border-indigo-500/40 transition-colors cursor-pointer"
              title="Choose export format"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Export Dropdown Menu */}
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

        {/* Floating Export Toast Notification */}
        {exportNotification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-indigo-500/50 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>{exportNotification}</span>
          </div>
        )}

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors text-slate-300"
          >
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-white">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#121826] border border-slate-800 shadow-xl py-1 z-50 text-xs text-slate-200">
              <div className="px-3 py-2 border-b border-slate-800/80">
                <p className="font-semibold text-white truncate">{user?.name || "Demo User"}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email || "demo@stackflow.ai"}</p>
              </div>
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  navigate("/settings");
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-800/60 flex items-center gap-2 text-slate-300 hover:text-white"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Account Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 hover:bg-rose-500/10 text-rose-400 flex items-center gap-2 border-t border-slate-800/80"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
