import { api } from "./api.js";
import { dummyProjects } from "../data/dummyProjects.js";

export const projectService = {
  async getProjects() {
    try {
      const data = await api.get("/projects");
      return data.projects || [];
    } catch (err) {
      console.warn("API getProjects error:", err);
      return [];
    }
  },

  async getProject(id) {
    try {
      const data = await api.get(`/projects/${id}`);
      return data.project;
    } catch (err) {
      console.warn(`API getProject(${id}) error:`, err);
      if (id === "proj_food_delivery") {
        const matched = dummyProjects.find(p => p.id === id);
        if (matched) return matched;
      }
      throw err;
    }
  },

  async createProject(title, description = "") {
    return await api.post("/projects", { title, description });
  },

  async updateProject(id, updateData) {
    return await api.put(`/projects/${id}`, updateData);
  },

  async deleteProject(id) {
    return await api.delete(`/projects/${id}`);
  },

  async generateDesign(title, description = "", projectId = null) {
    return await api.post("/ai/generate", { title, description, projectId });
  },

  async getHistory() {
    try {
      const data = await api.get("/history");
      return data.history || [];
    } catch (err) {
      console.warn("API getHistory error:", err);
      return [];
    }
  },

  async getSavedDesigns() {
    try {
      const data = await api.get("/saved-designs");
      return data.savedDesigns || [];
    } catch (err) {
      console.warn("API getSavedDesigns error:", err);
      return [];
    }
  },

  async saveDesign(projectId) {
    return await api.post(`/projects/${projectId}/save`);
  },

  async removeSavedDesign(projectId) {
    return await api.post(`/projects/${projectId}/unsave`);
  },

  async getDashboardStats() {
    try {
      return await api.get("/dashboard/stats");
    } catch {
      return {
        totalProjects: 3,
        generatedDesigns: 5,
        savedDesigns: 2,
        creditsRemaining: 85,
        maxCredits: 100
      };
    }
  },

  async reloadCredits() {
    return await api.post("/credits/reload");
  },

  async askGemini(projectId, question, history = []) {
    return await api.post("/ai/gemini", { projectId, question, history });
  },

  async askCopilot(projectId, question, history = []) {
    return await api.post("/ai/gemini", { projectId, question, history });
  }
};

export default projectService;
