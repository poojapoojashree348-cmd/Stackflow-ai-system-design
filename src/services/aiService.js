import { api } from "./api.js";
import { smartDineDesign } from "../data/dummyDesign.js";

export const aiService = {
  async generateSystemDesign(title, description = "", projectId = null) {
    if (!title || !title.trim()) {
      throw new Error("Project Title is required.");
    }

    try {
      const response = await api.post("/ai/generate", {
        title: title.trim(),
        description: description ? description.trim() : "",
        projectId
      });

      if (!response.design) {
        throw new Error("AI generation returned invalid format.");
      }

      return response;
    } catch (err) {
      console.error("aiService.generateSystemDesign failure:", err);
      throw err;
    }
  },

  getFallbackDesign(title, description) {
    return {
      ...smartDineDesign,
      summary: `${title}: ${description || smartDineDesign.summary}`
    };
  }
};

export default aiService;
