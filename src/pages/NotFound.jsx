import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { Home, Layers } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
        <Layers className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">404</h1>
      <h2 className="text-lg font-bold text-slate-800 mt-1">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm mt-2 mb-6">
        The system design page or resource you are looking for does not exist or has been moved.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="md" icon={Home}>
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
