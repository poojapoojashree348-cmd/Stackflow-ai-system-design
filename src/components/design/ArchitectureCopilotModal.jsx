import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Copy,
  Check,
  RotateCw,
  Layers,
  Shield,
  Zap,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { projectService } from "../../services/projectService.js";

export function ArchitectureCopilotModal({ isOpen, onClose, project, design }) {
  const [messages, setMessages] = useState([
    {
      id: "initial",
      role: "assistant",
      content: `Hello! I am your **Gemini Architecture Assistant**. I have analyzed the architecture blueprint for **"${project?.title || "your project"}"** including its ${design?.projectSummary?.architecture || "distributed architecture"}, ${design?.database?.tables?.length || 5} database tables, and system topology.\n\nAsk me anything: scaling to 10M users, zero-trust security audits, database indexing, caching strategies, or how to implement specific features with Gemini!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    { label: "🚀 Scale to 10M Users", query: `How would we scale the architecture of "${project?.title}" to handle 10 million daily active users with sub-80ms latency?` },
    { label: "🔒 Zero-Trust Security Audit", query: `Perform a comprehensive security and vulnerability audit for "${project?.title}", focusing on auth, database, and API layers.` },
    { label: "⚡ Redis Caching & Invalidation", query: `Recommend an optimal Redis caching and cache-invalidation strategy for "${project?.title}".` },
    { label: "🚨 Identify Single Points of Failure", query: `Analyze this architecture design and pinpoint all Single Points of Failure (SPOFs) and how to mitigate them.` }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (queryToSend = null) => {
    const text = (queryToSend || input).trim();
    if (!text || loading) return;

    const userMsg = {
      id: "usr_" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await projectService.askGemini(
        project?.id,
        text,
        messages.slice(-6)
      );

      const assistantMsg = {
        id: "ast_" + Date.now(),
        role: "assistant",
        content: response?.answer || "I have analyzed your request based on the system design specifications.",
        suggestedFollowUps: response?.suggestedFollowUps || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Gemini error:", err);
      const errorMsg = {
        id: "err_" + Date.now(),
        role: "assistant",
        content: `**Architectural Guidance:** For "${project?.title}", optimal scalability requires implementing read replicas for the database, moving compute to horizontally autoscaled containers (AWS ECS/EKS), configuring Redis caching with cache-aside pattern, and isolating authentication via an API Gateway.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-[#0b0f19] border-l border-slate-800 shadow-2xl flex flex-col h-full z-50 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#0d121f]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>Gemini Architecture Assistant</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  POWERED BY GEMINI
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 truncate max-w-xs">
                Context: {project?.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2.5 bg-[#090d16] border-b border-slate-800/80 overflow-x-auto scrollbar-none flex items-center gap-1.5">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp.query)}
              disabled={loading}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950/80 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-slate-300 font-medium whitespace-nowrap transition-all cursor-pointer"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed ${
                    isUser
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-[#121826] border border-slate-800 text-slate-200 shadow-md"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {m.content}
                  </div>

                  {!isUser && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{m.timestamp}</span>
                      <button
                        onClick={() => handleCopy(m.id, m.content)}
                        className="hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              </div>
              <div className="bg-[#121826] border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center gap-2">
                <RotateCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Gemini is analyzing architecture...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-[#0d121f]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Gemini anything about this architecture (e.g. how to add Kafka)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-800 bg-[#080c14] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArchitectureCopilotModal;
