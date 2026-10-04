import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useProject } from "../context/ProjectContext.jsx";
import RequirementInput from "../components/project/RequirementInput.jsx";
import GenerateButton from "../components/project/GenerateButton.jsx";
import Loader from "../components/common/Loader.jsx";
import { ArrowLeft, AlertCircle } from "lucide-react";

export function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [loading, setLoading] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const { user } = useAuth();
  const { generateProjectDesign } = useProject();
  const navigate = useNavigate();

  const credits = user?.credits ?? 85;

  const handleGenerate = async () => {
    setTitleError("");
    setGenerationError("");

    if (!title || !title.trim()) {
      setTitleError("Project Title is required.");
      return;
    }

    if (credits <= 0) {
      setGenerationError("You have 0 credits remaining. Please reset your credits in Settings to generate.");
      return;
    }

    try {
      setLoading(true);
      const response = await generateProjectDesign(title.trim(), description.trim());
      if (response?.project?.id) {
        navigate(`/projects/${response.project.id}`);
      } else {
        navigate("/sample-output");
      }
    } catch (err) {
      console.error("Design generation failed:", err);
      setGenerationError(err.message || "Failed to generate system design. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-indigo-400 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Create New System Design
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Enter your project requirements to let Gemini AI synthesize a complete software architecture blueprint.
          </p>
        </div>
      </div>

      {generationError && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-rose-200">Generation Error</p>
            <p className="mt-0.5">{generationError}</p>
          </div>
        </div>
      )}

      {/* Main Form or Multi-Step AI Loader */}
      <div className="bg-[#0f1422] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
        {loading ? (
          <Loader isAIGeneration={true} />
        ) : (
          <div className="space-y-8">
            <RequirementInput
              title={title}
              setTitle={(val) => {
                setTitle(val);
                if (titleError) setTitleError("");
              }}
              description={description}
              setDescription={setDescription}
              titleError={titleError}
              disabled={loading}
            />

            <div className="pt-4 border-t border-slate-800 flex flex-col items-center">
              <GenerateButton
                onClick={handleGenerate}
                loading={loading}
                credits={credits}
                disabled={loading || !title.trim()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewProject;
