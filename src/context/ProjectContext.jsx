import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { projectService } from "../services/projectService.js";
import { useAuth } from "./AuthContext.jsx";

export const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const { user, isAuthenticated, deductCredit } = useAuth();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [history, setHistory] = useState([]);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    generatedDesigns: 0,
    savedDesigns: 0,
    creditsRemaining: 85,
    maxCredits: 100
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchHistory = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await projectService.getHistory();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  }, [isAuthenticated]);

  const fetchSavedDesigns = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await projectService.getSavedDesigns();
      setSavedDesigns(data);
    } catch (err) {
      console.error("Error fetching saved designs:", err);
    }
  }, [isAuthenticated]);

  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await projectService.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, [isAuthenticated]);

  const refreshAll = useCallback(async () => {
    await Promise.all([fetchProjects(), fetchHistory(), fetchSavedDesigns(), fetchStats()]);
  }, [fetchProjects, fetchHistory, fetchSavedDesigns, fetchStats]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshAll();
    } else {
      setProjects([]);
      setCurrentProject(null);
      setHistory([]);
      setSavedDesigns([]);
    }
  }, [isAuthenticated, refreshAll]);

  const loadProject = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const project = await projectService.getProject(id);
      setCurrentProject(project);
      return project;
    } catch (err) {
      setError(err.message || "Failed to load project details.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateProjectDesign = async (title, description = "", existingProjectId = null) => {
    setError(null);
    try {
      const response = await projectService.generateDesign(title, description, existingProjectId);
      if (response.project) {
        setCurrentProject(response.project);
        deductCredit();
        await refreshAll();
      }
      return response;
    } catch (err) {
      setError(err.message || "AI System Design Generation failed.");
      throw err;
    }
  };

  const toggleSaveDesign = async (projectId) => {
    try {
      const target = projects.find((p) => p.id === projectId) || (currentProject?.id === projectId ? currentProject : null);
      if (!target) return;

      if (target.isSaved) {
        await projectService.removeSavedDesign(projectId);
      } else {
        await projectService.saveDesign(projectId);
      }

      // Update state locally
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, isSaved: !p.isSaved } : p))
      );

      if (currentProject?.id === projectId) {
        setCurrentProject((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : prev));
      }

      await fetchSavedDesigns();
      await fetchStats();
    } catch (err) {
      console.error("Toggle save design failed:", err);
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (currentProject?.id === id) {
        setCurrentProject(null);
      }
      await refreshAll();
    } catch (err) {
      console.error("Delete project failed:", err);
      throw err;
    }
  };

  const value = {
    projects,
    currentProject,
    setCurrentProject,
    history,
    savedDesigns,
    stats,
    loading,
    error,
    fetchProjects,
    fetchHistory,
    fetchSavedDesigns,
    fetchStats,
    refreshAll,
    loadProject,
    generateProjectDesign,
    toggleSaveDesign,
    deleteProject
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
