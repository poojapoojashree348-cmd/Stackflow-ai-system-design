import React from "react";
import {
  FileText,
  Layers,
  Database,
  Code2,
  Network,
  Cpu,
  ShieldCheck,
  Rocket
} from "lucide-react";

export function DesignSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview & Summary", icon: FileText },
    { id: "modules", label: "Functional Modules", icon: Layers },
    { id: "database", label: "Database Schema", icon: Database },
    { id: "apis", label: "API Endpoints", icon: Code2 },
    { id: "architecture", label: "System Architecture", icon: Network },
    { id: "techstack", label: "Technology Stack", icon: Cpu },
    { id: "recommendations", label: "Recommendations", icon: ShieldCheck },
    { id: "deployment", label: "Deployment Plan", icon: Rocket }
  ];

  return (
    <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-1 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs shrink-0 lg:w-64">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap lg:whitespace-normal ${
              isActive
                ? "bg-indigo-600 text-white shadow-xs shadow-indigo-600/30"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon
              className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default DesignSidebar;
