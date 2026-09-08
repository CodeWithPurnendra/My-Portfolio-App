import { useState, useEffect, useRef } from "react";
import { 
  SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiExpress, SiPostgresql, SiMongodb, SiDocker, SiGit, SiLinux 
} from "react-icons/si";
import { GiButterfly, GiFlowerEmblem } from "react-icons/gi";
import { FiTerminal, FiCpu, FiServer, FiDatabase, FiLayers, FiActivity, FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const sectionRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState("frontend");

  const architectureData = {
    frontend: {
      title: "01 / CLIENT TIER",
      subtitle: "UI & Reactive Engine",
      icon: <FiCpu className="text-purple-600" size={20} />,
      accentColor: "#9333ea",
      description: "Crafting high-performance client interfaces using component-driven state architecture, responsive styling engines, and hardware-accelerated animations.",
      skills: [
        { name: "React / Next.js", role: "Component Architecture", icon: <SiReact className="text-[#0088CC]" /> },
        { name: "TypeScript", role: "Type Safety & Contracts", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "Tailwind CSS", role: "Utility Design System", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: "GSAP Motion", role: "Timeline & Scroll Engine", icon: <GiButterfly className="text-purple-600" /> },
      ],
      terminalLogs: [
        "GET /api/v1/user-session 200 OK - 24ms",
        "React Hydration Complete - Virtual DOM synchronized",
        "GSAP ScrollTrigger context initialized successfully",
      ],
    },
    backend: {
      title: "02 / API & SERVER TIER",
      subtitle: "RESTful Gateway & Runtime",
      icon: <FiServer className="text-pink-600" size={20} />,
      accentColor: "#db2777",
      description: "Designing non-blocking, scalable Node.js micro-services and Express middleware capable of handling asynchronous requests and secure authentication flow.",
      skills: [
        { name: "Node.js", role: "V8 Async Engine", icon: <SiNodedotjs className="text-[#339933]" /> },
        { name: "Express.js", role: "Middleware & Routing", icon: <SiExpress className="text-slate-800" /> },
        { name: "JWT & Auth", role: "Security & Encryption", icon: <FiActivity className="text-pink-600" /> },
        { name: "REST APIs", role: "Endpoint Contracts", icon: <FiTerminal className="text-purple-600" /> },
      ],
      terminalLogs: [
        "POST /api/v1/auth/verify - Token validated",
        "Express middleware executed in 2.1ms",
        "Database pool connection acquired: active_clients=8",
      ],
    },
    database: {
      title: "03 / PERSISTENCE TIER",
      subtitle: "Relational & Document Stores",
      icon: <FiDatabase className="text-indigo-600" size={20} />,
      accentColor: "#4f46e5",
      description: "Modeling structured schemas, optimizing complex SQL queries, and utilizing NoSQL document stores for rapid data retrieval and reliable persistence.",
      skills: [
        { name: "PostgreSQL", role: "Relational & ACID Compliant", icon: <SiPostgresql className="text-[#4169E1]" /> },
        { name: "MongoDB", role: "Document Aggregation", icon: <SiMongodb className="text-[#47A248]" /> },
        { name: "SQL Indexing", role: "Query Optimization", icon: <FiDatabase className="text-indigo-600" /> },
      ],
      terminalLogs: [
        "SELECT * FROM users WHERE status = 'active';",
        "PostgreSQL Query Executed - 0.8ms [Index Scan]",
        "ACID Transaction committed successfully",
      ],
    },
    devops: {
      title: "04 / INFRASTRUCTURE TIER",
      subtitle: "Deployment & Environment",
      icon: <FiLayers className="text-purple-600" size={20} />,
      accentColor: "#9333ea",
      description: "Encapsulating application runtimes in isolated containers, managing Unix environment settings, and automating versioning through Git workflows.",
      skills: [
        { name: "Docker", role: "Containerization", icon: <SiDocker className="text-[#2496ED]" /> },
        { name: "Git & GitHub", role: "Version Control Systems", icon: <SiGit className="text-[#F05032]" /> },
        { name: "Linux / Bash", role: "Kernel & Shell Scripts", icon: <SiLinux className="text-[#D97706]" /> },
      ],
      terminalLogs: [
        "docker-compose up -d --build --remove-orphans",
        "Container [api_gateway] initialized on port 5000",
        "Git commit verified: release production v1.4.0",
      ],
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".arch-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full overflow-hidden bg-[#faf8fc] py-28 md:py-36 flex items-center justify-center font-sans text-slate-800"
    >
      {/* BACKGROUND ATMOSPHERIC GLOWS */}
      <div className="absolute top-1/4 left-[-10%] w-[550px] h-[550px] bg-purple-200/50 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[550px] h-[550px] bg-pink-200/50 rounded-full blur-[160px] pointer-events-none" />

      {/* FLOATING MOTIF ACCENTS */}
      <div className="absolute top-16 right-16 text-purple-300/40 text-6xl pointer-events-none animate-pulse">
        <GiButterfly />
      </div>
      <div className="absolute bottom-16 left-12 text-pink-300/40 text-6xl pointer-events-none">
        <GiFlowerEmblem />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-purple-700 backdrop-blur-xl mb-4 shadow-sm">
            <GiButterfly className="text-purple-500" size={16} />
            <span>FULL-STACK ARCHITECTURE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            System <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">Diagram</span> & Stack Spectrum
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select any architecture layer to inspect system telemetry, code contracts, and runtime components.
          </p>
        </div>

        {/* ARCHITECTURE WORKFLOW NAV */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {Object.keys(architectureData).map((key, index) => {
            const layer = architectureData[key];
            const isActive = activeLayer === key;
            return (
              <button
                key={key}
                onClick={() => setActiveLayer(key)}
                className={`arch-card relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 font-mono text-xs text-center space-y-2 ${
                  isActive
                    ? "border-purple-300 bg-white text-slate-900 shadow-lg shadow-purple-100 scale-[1.03]"
                    : "border-slate-200/80 bg-white/60 text-slate-500 hover:border-purple-200 hover:text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {layer.icon}
                  <span className="font-bold tracking-wider">{key.toUpperCase()}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans">Layer 0{index + 1}</span>

                {/* Animated Pipeline Arrow */}
                {index < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 z-20 pointer-events-none">
                    <FiArrowRight size={14} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* MAIN DISPLAY INSPECTOR PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 7 COLS: ACTIVE LAYER DETAILS & SKILLS GRID */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 backdrop-blur-2xl shadow-sm flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-mono text-purple-600 font-semibold tracking-widest block mb-1">
                    {architectureData[activeLayer].title}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {architectureData[activeLayer].subtitle}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600">
                  {architectureData[activeLayer].icon}
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                {architectureData[activeLayer].description}
              </p>

              {/* SKILLS CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {architectureData[activeLayer].skills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/80 hover:border-purple-200 hover:bg-purple-50/30 transition-colors"
                  >
                    <span className="text-2xl shrink-0">{skill.icon}</span>
                    <div className="overflow-hidden">
                      <span className="block text-xs font-bold text-slate-800 truncate">{skill.name}</span>
                      <span className="block text-[10px] font-mono text-slate-400 truncate">{skill.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PIPELINE INTEGRATION BADGE */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>STATUS: PRODUCTION DEPLOYED</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1.5 text-[11px]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM OPERATIONAL
              </span>
            </div>

          </div>

          {/* RIGHT 5 COLS: REALTIME SYSTEM LOGS TERMINAL */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 bg-slate-900 p-6 backdrop-blur-2xl flex flex-col justify-between space-y-6 font-mono shadow-md">
            
            <div>
              {/* Terminal Title */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-2 text-purple-400">
                  <FiTerminal size={14} /> ARCHITECTURE_LOGS.sh
                </span>
                <span className="text-slate-500">BASED ON PERN STACK</span>
              </div>

              {/* Log Streams */}
              <div className="space-y-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">// System Stream Out</div>
                {architectureData[activeLayer].terminalLogs.map((log, i) => (
                  <div key={i} className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 text-xs text-slate-300 leading-relaxed break-all">
                    <span className="text-purple-400 mr-2">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* ARCHITECTURE STATS */}
            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-950/20 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Code Discipline</span>
                <span className="text-pink-300 font-bold">100% Self-Taught</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Core Focus</span>
                <span className="text-purple-300 font-bold">High-Performance Web</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Skills;