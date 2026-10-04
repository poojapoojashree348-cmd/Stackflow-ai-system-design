import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Palette, 
  RotateCw, 
  Image as ImageIcon, 
  Check, 
  ChevronDown,
  Upload,
  Link as LinkIcon,
  X
} from "lucide-react";

// Detect domain theme based on project title, description, or project summary
export function detectDomainTheme(project, design) {
  if (design?.visualTheme) {
    return design.visualTheme;
  }

  const title = (project?.title || design?.projectSummary?.projectName || "").toLowerCase();
  const desc = (project?.description || design?.summary || "").toLowerCase();
  const type = (design?.projectSummary?.projectType || "").toLowerCase();
  const combined = `${title} ${desc} ${type}`;

  if (combined.includes("drone") || combined.includes("uav") || combined.includes("quadcopter") || combined.includes("aerial") || combined.includes("flight") || combined.includes("avionics") || combined.includes("autopilot") || combined.includes("rover") || combined.includes("robot") || combined.includes("swarm")) {
    return "drones";
  }
  if (combined.includes("cyber") || combined.includes("security") || combined.includes("threat") || combined.includes("siem") || combined.includes("soc") || combined.includes("firewall") || combined.includes("zero trust") || combined.includes("vulnerability") || combined.includes("malware") || combined.includes("intrusion") || combined.includes("waf")) {
    return "security";
  }
  if (combined.includes("blockchain") || combined.includes("crypto") || combined.includes("web3") || combined.includes("ethereum") || combined.includes("solana") || combined.includes("smart contract") || combined.includes("nft") || combined.includes("defi") || combined.includes("token") || combined.includes("dao")) {
    return "blockchain";
  }
  if (combined.includes("stream") || combined.includes("video stream") || combined.includes("live stream") || combined.includes("webrtc") || combined.includes("broadcasting") || combined.includes("podcast") || combined.includes("netflix") || combined.includes("twitch") || combined.includes("youtube") || combined.includes("hls")) {
    return "streaming";
  }
  if (combined.includes("game") || combined.includes("gaming") || combined.includes("multiplayer") || combined.includes("matchmaking") || combined.includes("metaverse") || combined.includes("esport") || combined.includes("unity") || combined.includes("unreal") || combined.includes("player")) {
    return "gaming";
  }
  if (combined.includes("logistics") || combined.includes("supply chain") || combined.includes("warehouse") || combined.includes("freight") || combined.includes("cargo") || combined.includes("shipping") || combined.includes("truck") || combined.includes("dispatch") || combined.includes("cargo")) {
    return "logistics";
  }
  if (combined.includes("iot") || combined.includes("sensor") || combined.includes("smart home") || combined.includes("smart city") || combined.includes("telemetry") || combined.includes("microcontroller") || combined.includes("hardware") || combined.includes("scada") || combined.includes("embedded") || combined.includes("device")) {
    return "iot";
  }
  if (combined.includes("devops") || combined.includes("cloud infra") || combined.includes("kubernetes") || combined.includes("ci/cd") || combined.includes("observability") || combined.includes("docker") || combined.includes("monitoring") || combined.includes("cluster") || combined.includes("sre")) {
    return "devops";
  }
  if (combined.includes("event") || combined.includes("register") || combined.includes("workshop") || combined.includes("conference") || combined.includes("seminar") || combined.includes("ticket") || combined.includes("hackathon") || combined.includes("meetup")) {
    return "event";
  }
  if (combined.includes("food") || combined.includes("deliver") || combined.includes("restaurant") || combined.includes("swiggy") || combined.includes("zomato") || combined.includes("dine") || combined.includes("meal") || combined.includes("dish") || combined.includes("bakery") || combined.includes("cafe")) {
    return "food";
  }
  if (combined.includes("shop") || combined.includes("cart") || combined.includes("store") || combined.includes("ecom") || combined.includes("commerce") || combined.includes("product") || combined.includes("retail") || combined.includes("fashion") || combined.includes("grocery")) {
    return "ecommerce";
  }
  if (combined.includes("health") || combined.includes("doctor") || combined.includes("clinic") || combined.includes("patient") || combined.includes("hospital") || combined.includes("med") || combined.includes("pharma") || combined.includes("telemedicine")) {
    return "healthcare";
  }
  if (combined.includes("ride") || combined.includes("taxi") || combined.includes("cab") || combined.includes("uber") || combined.includes("driver") || combined.includes("fleet") || combined.includes("trip") || combined.includes("transport")) {
    return "rides";
  }
  if (combined.includes("school") || combined.includes("college") || combined.includes("student") || combined.includes("learn") || combined.includes("course") || combined.includes("education") || combined.includes("lms") || combined.includes("academy") || combined.includes("attendance")) {
    return "education";
  }
  if (combined.includes("bank") || combined.includes("pay") || combined.includes("wallet") || combined.includes("crypto") || combined.includes("fintech") || combined.includes("finance") || combined.includes("money") || combined.includes("loan") || combined.includes("invoice")) {
    return "fintech";
  }
  if (combined.includes("social") || combined.includes("chat") || combined.includes("message") || combined.includes("feed") || combined.includes("community") || combined.includes("dating") || combined.includes("network") || combined.includes("forum")) {
    return "social";
  }
  if (combined.includes("estate") || combined.includes("property") || combined.includes("house") || combined.includes("housing") || combined.includes("rental") || combined.includes("apartment") || combined.includes("hotel") || combined.includes("stay")) {
    return "realestate";
  }
  if (combined.includes("fitness") || combined.includes("gym") || combined.includes("workout") || combined.includes("sport") || combined.includes("exercise") || combined.includes("calorie")) {
    return "fitness";
  }
  if (combined.includes("ai") || combined.includes("intelligence") || combined.includes("gpt") || combined.includes("model") || combined.includes("bot") || combined.includes("neural") || combined.includes("automation") || combined.includes("agent")) {
    return "ai";
  }

  return "general";
}

export const THEME_OPTIONS = [
  { id: "drones", name: "Drone & Autonomous Fleet", icon: "🛸", color: "from-sky-900 to-indigo-950", badge: "Drone Fleet" },
  { id: "ai", name: "AI SaaS & Intelligence", icon: "⚡", color: "from-cyan-900 to-blue-900", badge: "AI Core" },
  { id: "security", name: "Cybersecurity & Defense", icon: "🛡️", color: "from-red-950 to-slate-900", badge: "Cyber Shield" },
  { id: "blockchain", name: "Blockchain & Web3", icon: "⛓️", color: "from-amber-950 to-purple-950", badge: "Web3 dApp" },
  { id: "streaming", name: "Video & Live Streaming", icon: "📡", color: "from-violet-950 to-fuchsia-950", badge: "Live Stream" },
  { id: "gaming", name: "Gaming & Metaverse", icon: "🎮", color: "from-purple-900 to-pink-900", badge: "Game Server" },
  { id: "logistics", name: "Logistics & Supply Chain", icon: "📦", color: "from-amber-950 to-orange-950", badge: "Supply Chain" },
  { id: "iot", name: "IoT & Hardware Sensors", icon: "🛰️", color: "from-teal-950 to-cyan-950", badge: "IoT Network" },
  { id: "devops", name: "DevOps & Cloud Infra", icon: "☸️", color: "from-blue-950 to-slate-900", badge: "Cloud Infra" },
  { id: "event", name: "Event & Registration", icon: "🎟️", color: "from-purple-900 to-indigo-900", badge: "Event Pass" },
  { id: "food", name: "Food & Restaurant", icon: "🍔", color: "from-amber-900 to-orange-900", badge: "Food Delivery" },
  { id: "ecommerce", name: "E-Commerce & Store", icon: "🛍️", color: "from-pink-900 to-rose-900", badge: "Shop Online" },
  { id: "healthcare", name: "Healthcare & Clinic", icon: "🩺", color: "from-teal-900 to-cyan-900", badge: "Health Care" },
  { id: "rides", name: "Ride & Taxi Booking", icon: "🚖", color: "from-amber-900 to-yellow-900", badge: "Taxi Route" },
  { id: "education", name: "Education & Campus", icon: "🎓", color: "from-blue-900 to-indigo-900", badge: "Campus Portal" },
  { id: "fintech", name: "FinTech & Payments", icon: "💳", color: "from-emerald-900 to-teal-900", badge: "Digital Pay" },
  { id: "social", name: "Social Media & Chat", icon: "💬", color: "from-violet-900 to-purple-900", badge: "Community" },
  { id: "realestate", name: "Real Estate & Homes", icon: "🏡", color: "from-amber-900 to-emerald-900", badge: "Real Estate" },
  { id: "fitness", name: "Fitness & Workout", icon: "💪", color: "from-red-900 to-orange-900", badge: "Fitness Pro" },
  { id: "general", name: "Cloud Application", icon: "🌐", color: "from-slate-900 to-indigo-950", badge: "Web System" }
];

export function ProjectIllustration({ project, design, summary }) {
  const detectedTheme = detectDomainTheme(project, design);
  const storageKey = `project_visual_theme_${project?.id || "default"}`;

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem(storageKey) || detectedTheme;
  });

  const [showPicker, setShowPicker] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState(() => {
    return localStorage.getItem(`project_custom_img_${project?.id || "default"}`) || "";
  });
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [inputUrl, setInputUrl] = useState("");

  // Update when project changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCurrentTheme(saved);
    } else {
      setCurrentTheme(detectedTheme);
    }
  }, [project?.id, project?.title, detectedTheme, storageKey]);

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    setCustomImageUrl("");
    localStorage.setItem(storageKey, themeId);
    localStorage.removeItem(`project_custom_img_${project?.id || "default"}`);
    setShowPicker(false);
  };

  const handleSaveCustomImage = (e) => {
    e?.preventDefault();
    if (!inputUrl.trim()) return;
    setCustomImageUrl(inputUrl.trim());
    localStorage.setItem(`project_custom_img_${project?.id || "default"}`, inputUrl.trim());
    setShowCustomInput(false);
    setShowPicker(false);
  };

  const handleResetToAuto = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`project_custom_img_${project?.id || "default"}`);
    setCustomImageUrl("");
    setCurrentTheme(detectedTheme);
    setShowPicker(false);
  };

  const activeThemeMeta = THEME_OPTIONS.find(t => t.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <div className="relative w-36 sm:w-44 shrink-0 flex flex-col items-center">
      {/* Outer Phone Mockup Frame */}
      <div className="w-full bg-[#161f30] border-2 border-slate-700/80 rounded-2xl p-1.5 shadow-xl relative overflow-hidden group">
        
        {/* Subtle Theme Switcher Button on hover / tap */}
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          title="Click to change project visual image"
          className="absolute top-2 right-2 z-20 bg-slate-900/80 hover:bg-indigo-600 text-slate-200 hover:text-white p-1 rounded-md text-[10px] flex items-center gap-1 backdrop-blur-xs border border-slate-700 shadow-md transition-all cursor-pointer opacity-90 group-hover:opacity-100"
        >
          <Palette className="w-3 h-3 text-indigo-400 group-hover:text-white" />
          <span className="hidden sm:inline text-[9px] font-semibold">Change</span>
        </button>

        {/* Custom Uploaded / External Image Mode */}
        {customImageUrl ? (
          <div className="w-full rounded-xl overflow-hidden min-h-[185px] relative bg-slate-900 flex flex-col items-center justify-center">
            <img 
              src={customImageUrl} 
              alt={project?.title || "Project preview"} 
              className="w-full h-[185px] object-cover"
              onError={() => setCustomImageUrl("")}
            />
            <div className="absolute bottom-1 bg-slate-950/80 text-white text-[8px] px-2 py-0.5 rounded-full font-mono">
              Custom Visual
            </div>
          </div>
        ) : (
          /* Dynamic Domain Vector Screen */
          <div className="w-full rounded-xl p-2 flex flex-col items-center justify-between min-h-[185px] relative overflow-hidden">
            {renderThemeContent(currentTheme, project, summary)}
          </div>
        )}
      </div>

      {/* Visual Caption Tag */}
      <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="truncate max-w-[130px] font-medium text-slate-300">
          {activeThemeMeta.name.split("&")[0]} Visual
        </span>
      </div>

      {/* Visual Theme Selection Dropdown / Modal */}
      {showPicker && (
        <div className="absolute top-0 right-0 sm:right-auto sm:left-full sm:ml-2 z-50 w-64 bg-[#0f1422] border border-slate-700 rounded-xl shadow-2xl p-3 text-xs text-slate-200 backdrop-blur-md animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-100">
              <Palette className="w-3.5 h-3.5 text-indigo-400" />
              <span>Project Visual Image</span>
            </div>
            <button 
              type="button" 
              onClick={() => setShowPicker(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mb-2">
            Choose a matching visual graphic or let it auto-detect based on your project:
          </p>

          <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = currentTheme === theme.id && !customImageUrl;
              const isAuto = detectedTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                    isSelected 
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/50 font-semibold" 
                      : "hover:bg-slate-800 text-slate-300 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{theme.icon}</span>
                    <span>{theme.name}</span>
                  </span>
                  {isAuto && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-normal">
                      Auto
                    </span>
                  )}
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              );
            })}
          </div>

          {/* Custom Image URL Option */}
          <div className="pt-2 mt-2 border-t border-slate-800 flex flex-col gap-1.5">
            {!showCustomInput ? (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="w-full py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center justify-center gap-1.5 transition-colors"
              >
                <LinkIcon className="w-3 h-3 text-indigo-400" />
                <span>Use Custom Image URL</span>
              </button>
            ) : (
              <form onSubmit={handleSaveCustomImage} className="space-y-1.5">
                <input
                  type="url"
                  placeholder="https://example.com/image.png"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-hidden focus:border-indigo-500"
                  required
                />
                <div className="flex gap-1">
                  <button
                    type="submit"
                    className="flex-1 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[10px]"
                  >
                    Apply URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <button
              type="button"
              onClick={handleResetToAuto}
              className="w-full py-1 text-slate-400 hover:text-slate-200 text-[10px] text-center flex items-center justify-center gap-1"
            >
              <RotateCw className="w-2.5 h-2.5" />
              <span>Reset to Auto-Detect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Render dynamic SVGs and styled cards for each domain
function renderThemeContent(theme, project, summary) {
  switch (theme) {
    /* 1. EVENT REGISTRATION / WORKSHOP / CONFERENCE */
    case "event":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#312e81] via-[#1e1b4b] to-[#0f172a] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          {/* Top title pill */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-md text-center">
            EVENT PASS
          </div>

          {/* Golden VIP Ticket Graphic */}
          <div className="relative my-1 w-full flex flex-col items-center">
            {/* VIP Ticket Badge */}
            <div className="w-full bg-gradient-to-br from-amber-400/20 via-indigo-950/80 to-purple-900/60 border border-amber-400/40 rounded-lg p-2 text-center relative overflow-hidden shadow-lg">
              {/* Star Badge */}
              <div className="absolute top-1 right-1 text-amber-400 text-[10px]">★</div>

              <div className="text-[10px] font-bold text-amber-300 truncate">
                {project?.title?.replace("Page", "") || "Web Workshop"}
              </div>

              {/* Date & Mode Pill */}
              <div className="flex items-center justify-center gap-1.5 my-1 text-[8px] font-mono text-slate-200">
                <span className="bg-slate-800/80 px-1 py-0.5 rounded text-sky-300">📅 SEP 24</span>
                <span className="bg-emerald-500/20 px-1 py-0.5 rounded text-emerald-300 border border-emerald-500/30">ONLINE</span>
              </div>

              {/* Barcode SVG */}
              <div className="flex items-center justify-center gap-0.5 h-4 my-1 opacity-80">
                <div className="w-0.5 h-full bg-amber-200" />
                <div className="w-1 h-full bg-amber-200" />
                <div className="w-0.5 h-full bg-amber-200" />
                <div className="w-1.5 h-full bg-amber-200" />
                <div className="w-0.5 h-full bg-amber-200" />
                <div className="w-1 h-full bg-amber-200" />
                <div className="w-2 h-full bg-amber-200" />
                <div className="w-0.5 h-full bg-amber-200" />
                <div className="w-1 h-full bg-amber-200" />
                <div className="w-0.5 h-full bg-amber-200" />
              </div>

              <span className="text-[8px] font-mono text-amber-300/80 tracking-widest block">
                #EVT-9842
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-indigo-900/60">
            <span className="text-[8px] text-emerald-400 font-semibold flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Slots Open
            </span>
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-sm">
              REGISTER
            </div>
          </div>
        </div>
      );

    /* 2. FOOD DELIVERY / RESTAURANT */
    case "food":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#f0f9ff] rounded-xl p-2 flex flex-col items-center justify-between text-slate-800 relative shadow-inner">
          <div className="bg-[#1e3a8a] text-white px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-tight shadow-sm text-center">
            Food<br />Delivery
          </div>

          <div className="relative my-1 flex flex-col items-center">
            {/* Red Map Pin */}
            <div className="absolute -top-1 -right-4 w-4 h-5 text-rose-500 animate-bounce">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>

            {/* Burger SVG */}
            <svg className="w-12 h-10 drop-shadow-md" viewBox="0 0 64 48" fill="none">
              <path d="M10 24C10 14 19.85 6 32 6C44.15 6 54 14 54 24H10Z" fill="#F59E0B" />
              <circle cx="24" cy="14" r="1.2" fill="#FEF3C7" />
              <circle cx="32" cy="11" r="1.2" fill="#FEF3C7" />
              <circle cx="40" cy="15" r="1.2" fill="#FEF3C7" />
              <rect x="8" y="24" width="48" height="3" rx="1.5" fill="#EF4444" />
              <path d="M8 27C12 29 16 27 20 29C24 27 28 29 32 27C36 29 40 27 44 29C48 27 52 29 56 27V29C52 31 48 29 44 31C40 29 36 31 32 29C28 31 24 29 20 31C16 29 12 31 8 29V27Z" fill="#10B981" />
              <rect x="10" y="30" width="44" height="6" rx="3" fill="#78350F" />
              <path d="M12 30L20 36L28 30H52V32L44 36L36 30H12Z" fill="#FBBF24" />
              <path d="M12 37H52C52 42 43 45 32 45C21 45 12 42 12 37Z" fill="#F59E0B" />
            </svg>
          </div>

          <div className="w-full flex items-center justify-between gap-1">
            <svg className="w-8 h-6 text-orange-600" viewBox="0 0 48 36" fill="currentColor">
              <circle cx="12" cy="28" r="5" fill="#1E293B" />
              <circle cx="36" cy="28" r="5" fill="#1E293B" />
              <circle cx="12" cy="28" r="2.5" fill="#E2E8F0" />
              <circle cx="36" cy="28" r="2.5" fill="#E2E8F0" />
              <path d="M14 26H28L32 18H20L17 26Z" fill="#EA580C" />
              <rect x="7" y="14" width="9" height="10" rx="1.5" fill="#0284C7" />
              <path d="M30 18L35 10H38" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="bg-[#ea580c] text-white px-2 py-0.5 rounded text-[8px] font-bold shadow-xs whitespace-nowrap">
              ORDER NOW
            </div>
          </div>
        </div>
      );

    /* 3. E-COMMERCE / SHOPPING */
    case "ecommerce":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#f43f5e] via-[#e11d48] to-[#881337] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-white text-rose-700 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-tight shadow-sm text-center">
            SHOP STORE
          </div>

          {/* Product & Bag Graphic */}
          <div className="relative my-1 flex flex-col items-center w-full">
            {/* Discount Badge */}
            <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[8px] font-black px-1.5 py-0.2 rounded-full shadow-xs">
              -30%
            </div>

            {/* Shopping Bag Illustration */}
            <svg className="w-11 h-11 drop-shadow-md text-white" viewBox="0 0 48 48" fill="none">
              <path d="M10 16L14 42H34L38 16H10Z" fill="rgba(255,255,255,0.9)" />
              <path d="M18 18V12C18 8.68629 20.6863 6 24 6C27.3137 6 30 8.68629 30 12V18" stroke="#881337" strokeWidth="3" strokeLinecap="round" />
              <path d="M20 24L24 28L32 20" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] font-bold text-rose-100 mt-1">Special Deals</span>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-rose-400/40">
            <span className="text-[8px] font-bold text-amber-300">★★★★★</span>
            <div className="bg-white text-rose-700 hover:bg-rose-50 px-2 py-0.5 rounded text-[8px] font-extrabold shadow-xs whitespace-nowrap">
              BUY NOW
            </div>
          </div>
        </div>
      );

    /* 4. HEALTHCARE / CLINIC */
    case "healthcare":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#0f766e] via-[#115e59] to-[#042f2e] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-white text-teal-800 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-tight shadow-sm text-center">
            HEALTH CARE
          </div>

          {/* Stethoscope & Pulse */}
          <div className="relative my-1 flex flex-col items-center w-full">
            {/* Red Pulse Cross */}
            <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-bold text-sm mb-1">
              ✚
            </div>

            {/* Heartbeat Wave SVG */}
            <svg className="w-20 h-7 text-emerald-300" viewBox="0 0 100 30" fill="none">
              <path d="M0 15H30L35 5L42 25L50 8L55 20L60 15H100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[8px] text-teal-200 font-mono">24/7 Consultation</span>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-teal-600/40">
            <span className="text-[8px] text-teal-200">Doctor Live</span>
            <div className="bg-emerald-400 text-teal-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              BOOK NOW
            </div>
          </div>
        </div>
      );

    /* 5. RIDE SHARING / TAXI */
    case "rides":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#b45309] via-[#78350f] to-[#451a03] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            TAXI ROUTE
          </div>

          {/* Yellow Taxi & Route SVG */}
          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="text-[8px] font-mono bg-slate-900/80 px-2 py-0.5 rounded text-amber-300 border border-amber-400/30 mb-1">
              ETA: 3 mins
            </div>

            {/* Taxi Car SVG */}
            <svg className="w-12 h-8 text-amber-400" viewBox="0 0 64 36" fill="currentColor">
              <rect x="24" y="2" width="16" height="5" rx="2" fill="#FFFFFF" />
              <path d="M12 18L18 8H46L52 18H58C60 18 62 20 62 22V28C62 29 61 30 60 30H54C54 33 51 35 48 35C45 35 42 33 42 30H22C22 33 19 35 16 35C13 35 10 33 10 30H4C3 30 2 29 2 28V22C2 20 4 18 6 18H12Z" fill="#FBBF24" />
              <circle cx="16" cy="30" r="4" fill="#1E293B" />
              <circle cx="48" cy="30" r="4" fill="#1E293B" />
            </svg>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-amber-600/40">
            <span className="text-[8px] text-amber-200">Near You</span>
            <div className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[8px] shadow-xs">
              BOOK CAB
            </div>
          </div>
        </div>
      );

    /* 6. EDUCATION / CAMPUS */
    case "education":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#1d4ed8] via-[#1e3a8a] to-[#172554] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-tight shadow-sm text-center">
            EDU CAMPUS
          </div>

          {/* Graduation Cap & Book */}
          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-xl mb-1">
              🎓
            </div>
            <div className="w-full bg-blue-950/70 border border-blue-500/30 rounded px-1.5 py-1 text-center">
              <span className="text-[8px] text-amber-300 font-bold block">Grade: A+</span>
              <span className="text-[7px] text-blue-200 font-mono">Course Progress: 85%</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-blue-600/40">
            <span className="text-[8px] text-blue-200">Live Lectures</span>
            <div className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              LEARN
            </div>
          </div>
        </div>
      );

    /* 7. FINTECH / PAYMENTS */
    case "fintech":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#065f46] via-[#064e3b] to-[#022c22] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-emerald-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            FINTECH PAY
          </div>

          {/* Credit Card & Chip Graphic */}
          <div className="relative my-1 w-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg p-2 text-white shadow-md border border-emerald-300/30">
            <div className="flex items-center justify-between">
              <div className="w-3.5 h-2.5 bg-amber-300 rounded-xs" />
              <span className="text-[8px] font-mono">💳</span>
            </div>
            <div className="text-[9px] font-mono tracking-wider mt-1.5">
              •••• 4242
            </div>
            <div className="flex justify-between items-center text-[7px] text-emerald-100 mt-1">
              <span>EXP: 09/29</span>
              <span className="font-bold text-amber-200">$1,450.00</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-emerald-700/40">
            <span className="text-[8px] text-emerald-200">Instant</span>
            <div className="bg-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              TRANSFER
            </div>
          </div>
        </div>
      );

    /* 8. AI SAAS / INTELLIGENCE */
    case "ai":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#4338ca] via-[#312e81] to-[#030712] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-cyan-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            AI CORE
          </div>

          {/* Neural Chip Illustration */}
          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 relative shadow-lg shadow-cyan-500/20">
              <span className="text-xl animate-pulse">⚡</span>
            </div>
            <div className="w-full bg-slate-900/80 border border-slate-700 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-cyan-300">Tokens: 99.4% Acc</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-indigo-800/40">
            <span className="text-[8px] text-cyan-200">Gemini 3</span>
            <div className="bg-cyan-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              RUN AI
            </div>
          </div>
        </div>
      );

    /* 9. SOCIAL MEDIA & CHAT */
    case "social":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#6d28d9] via-[#4c1d95] to-[#2e1065] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-pink-500 text-white px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-tight shadow-sm text-center">
            CHAT APP
          </div>

          {/* Chat Bubbles */}
          <div className="relative my-1 w-full space-y-1">
            <div className="bg-violet-900/80 border border-violet-500/40 rounded-lg p-1.5 max-w-[85%] text-[8px] text-slate-200">
              Hi! Any update on this?
            </div>
            <div className="bg-pink-600 text-white rounded-lg p-1.5 max-w-[85%] ml-auto text-[8px] text-right">
              Yes, deployed now! ❤️
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-purple-700/40">
            <span className="text-[8px] text-pink-300">Online</span>
            <div className="bg-pink-500 text-white font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              SEND
            </div>
          </div>
        </div>
      );

    /* 10. REAL ESTATE & HOMES */
    case "realestate":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#0284c7] via-[#075985] to-[#082f49] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-tight shadow-sm text-center">
            ESTATE HUB
          </div>

          {/* House Graphic */}
          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-xl mb-1">
              🏡
            </div>
            <div className="w-full bg-sky-950/70 border border-sky-500/30 rounded px-1.5 py-1 text-center">
              <span className="text-[8px] text-amber-300 font-bold block">3 BHK Villa</span>
              <span className="text-[7px] text-sky-200 font-mono">Location Verified ✓</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-sky-700/40">
            <span className="text-[8px] text-sky-200">Featured</span>
            <div className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              VIEW
            </div>
          </div>
        </div>
      );

    /* 11. DRONES & AUTONOMOUS ROBOTICS */
    case "drones":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#0c4a6e] via-[#082f49] to-[#020617] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-sky-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            DRONE FLEET
          </div>

          {/* Autonomous Drone & HUD Telemetry Graphic */}
          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-400/60 flex items-center justify-center text-xl text-sky-300 relative shadow-lg shadow-sky-500/20">
              🛸
            </div>
            <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-sky-300">Alt: 120m • 60Hz BVLOS</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-sky-800/40">
            <span className="text-[8px] text-emerald-400 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Airborne
            </span>
            <div className="bg-sky-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              NAVIGATE
            </div>
          </div>
        </div>
      );

    /* 12. CYBERSECURITY & DEFENSE */
    case "security":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#7f1d1d] via-[#450a0a] to-[#0f172a] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-rose-500 text-white px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            CYBER SHIELD
          </div>

          {/* Hexagonal Zero Trust Defense Shield */}
          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-500/60 flex items-center justify-center text-xl text-rose-300 relative shadow-lg shadow-rose-500/20">
              🛡️
            </div>
            <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-rose-300">Zero-Trust • eBPF Active</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-rose-800/40">
            <span className="text-[8px] text-emerald-400 font-mono">0 Breaches</span>
            <div className="bg-rose-500 text-white font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              AUDIT
            </div>
          </div>
        </div>
      );

    /* 13. BLOCKCHAIN & WEB3 */
    case "blockchain":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#78350f] via-[#451a03] to-[#020617] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            WEB3 dAPP
          </div>

          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-400/60 flex items-center justify-center text-xl text-amber-300 relative shadow-lg shadow-amber-500/20">
              ⛓️
            </div>
            <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-amber-300">Block #18,492,021</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-amber-800/40">
            <span className="text-[8px] text-amber-200 font-mono">Verified ✓</span>
            <div className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              CONNECT
            </div>
          </div>
        </div>
      );

    /* 14. VIDEO & LIVE STREAMING */
    case "streaming":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#581c87] via-[#3b0764] to-[#090d16] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-fuchsia-500 text-white px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            LIVE STREAM
          </div>

          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-950/80 border border-fuchsia-400/60 flex items-center justify-center text-xl text-fuchsia-300 relative shadow-lg shadow-fuchsia-500/20">
              📡
            </div>
            <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-fuchsia-300">4K 60FPS • WebRTC</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-fuchsia-800/40">
            <span className="text-[8px] text-fuchsia-200 font-mono">14.2k Viewers</span>
            <div className="bg-fuchsia-500 text-white font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              WATCH
            </div>
          </div>
        </div>
      );

    /* 15. GAMING & METAVERSE */
    case "gaming":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#4c1d95] via-[#2e1065] to-[#020617] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-violet-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            GAME SERVER
          </div>

          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-400/60 flex items-center justify-center text-xl text-violet-300 relative shadow-lg shadow-violet-500/20">
              🎮
            </div>
            <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-violet-300">UDP Tick: 128Hz • 12ms</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-violet-800/40">
            <span className="text-[8px] text-emerald-400 font-mono">Rank #1 S tier</span>
            <div className="bg-violet-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              PLAY
            </div>
          </div>
        </div>
      );

    /* 16. LOGISTICS & SUPPLY CHAIN */
    case "logistics":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#7c2d12] via-[#431407] to-[#090d16] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-orange-500 text-white px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            SUPPLY CHAIN
          </div>

          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-400/60 flex items-center justify-center text-xl text-orange-300 relative shadow-lg shadow-orange-500/20">
              📦
            </div>
            <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-orange-300">Waypoint: Transit Hub #4</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-orange-800/40">
            <span className="text-[8px] text-orange-200 font-mono">ETA: Today</span>
            <div className="bg-orange-500 text-white font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              TRACK
            </div>
          </div>
        </div>
      );

    /* 17. IOT & SENSORS */
    case "iot":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#134e4a] via-[#042f2e] to-[#020617] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-teal-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            IoT NETWORK
          </div>

          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-400/60 flex items-center justify-center text-xl text-teal-300 relative shadow-lg shadow-teal-500/20">
              🛰️
            </div>
            <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-teal-300">MQTT • 10k Nodes Sync</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-teal-800/40">
            <span className="text-[8px] text-teal-200 font-mono">Sensors: OK</span>
            <div className="bg-teal-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              STREAM
            </div>
          </div>
        </div>
      );

    /* 18. DEVOPS & CLOUD INFRA */
    case "devops":
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#1e3a8a] via-[#172554] to-[#020617] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-blue-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center">
            CLOUD INFRA
          </div>

          <div className="relative my-1 flex flex-col items-center w-full">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-400/60 flex items-center justify-center text-xl text-blue-300 relative shadow-lg shadow-blue-500/20">
              ☸️
            </div>
            <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-center mt-1">
              <span className="text-[8px] font-mono text-blue-300">K8s Cluster • 3 AZs</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-blue-800/40">
            <span className="text-[8px] text-emerald-400 font-mono">99.99% SLA</span>
            <div className="bg-blue-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              DEPLOY
            </div>
          </div>
        </div>
      );

    /* DEFAULT: DYNAMIC DOMAIN-AWARE ARCHITECTURE CARD */
    default:
      return (
        <div className="w-full h-full bg-gradient-to-b from-[#1e1b4b] via-[#0f172a] to-[#020617] rounded-xl p-2 flex flex-col items-center justify-between text-white relative shadow-inner">
          <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-tight shadow-sm text-center truncate max-w-[120px]">
            {design?.visualBadge || (project?.title?.split(" ")[0] + " SYSTEM") || "ARCHITECTURE"}
          </div>

          {/* Dynamic Smart Schematic */}
          <div className="relative my-1 w-full bg-slate-900/90 border border-slate-700/80 rounded-lg p-1.5">
            <div className="flex items-center gap-1 border-b border-slate-800 pb-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[7px] text-cyan-300 font-mono ml-auto truncate max-w-[65px]">
                {design?.projectSummary?.architecture?.split(" ")[0] || "Distributed"}
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-gradient-to-r from-indigo-500/40 to-cyan-500/40 h-2 rounded-xs flex items-center px-1">
                <span className="text-[6px] text-white font-mono truncate">{project?.title || "System Blueprint"}</span>
              </div>
              <div className="w-3/4 bg-slate-700/80 h-1.5 rounded-xs" />
              <div className="w-1/2 bg-emerald-500/40 h-1.5 rounded-xs" />
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-1 pt-1 border-t border-slate-800">
            <span className="text-[8px] text-emerald-400 font-mono">Online</span>
            <div className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2 py-0.5 rounded text-[8px] shadow-xs">
              EXPLORE
            </div>
          </div>
        </div>
      );
  }
}

export default ProjectIllustration;
