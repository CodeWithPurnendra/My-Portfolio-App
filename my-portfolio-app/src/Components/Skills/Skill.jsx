import { useState, useRef } from "react";
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiLinux,
  SiFigma,
} from "react-icons/si";
import {
  FiTerminal,
  FiCpu,
  FiServer,
  FiDatabase,
  FiLayers,
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Skills() {
  const sectionRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState("frontend");

  const architectureData = {
    frontend: {
      title: "01 / CLIENT TIER",
      subtitle: "UI, Graphics & Animation Engine",
      icon: <FiCpu className="text-indigo-400" size={20} />,
      description:
        "Building interactive user interfaces using modern JavaScript (ES6+), component-driven React architecture, Tailwind CSS styling, Three.js WebGL graphics, and hardware-accelerated GSAP scroll timelines.",
      skills: [
        { name: "React.js", role: "Component State & UI Architecture", icon: <SiReact className="text-[#61DAFB]" /> },
        { name: "JavaScript (ES6+)", role: "Async Workflows & Logic", icon: <SiJavascript className="text-[#F7DF1E]" /> },
        { name: "Tailwind CSS", role: "Responsive Design System", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: "Three.js & GSAP", role: "3D Graphics & Micro-Animations", icon: <FiActivity className="text-pink-400" /> },
      ],
      terminalLogs: [
        "GET /api/v1/projects 200 OK - 18ms",
        "React Virtual DOM synchronized successfully",
        "GSAP ScrollTrigger context mounted",
        "Three.js particle canvas rendering at 60 FPS",
      ],
    },
    backend: {
      title: "02 / API & SERVER TIER",
      subtitle: "RESTful Server & Middleware",
      icon: <FiServer className="text-pink-400" size={20} />,
      description:
        "Designing asynchronous Node.js backend servers and Express.js REST API routes with clean CRUD controllers, JSON file persistence, and robust request handling.",
      skills: [
        { name: "Node.js", role: "Asynchronous V8 Runtime", icon: <SiNodedotjs className="text-[#339933]" /> },
        { name: "Express.js", role: "REST API Routes & Middleware", icon: <SiExpress className="text-slate-200" /> },
        { name: "RESTful APIs", role: "JSON Endpoint Contracts", icon: <FiTerminal className="text-indigo-400" /> },
        { name: "ES Modules & CJS", role: "Module Architecture", icon: <FiLayers className="text-purple-400" /> },
      ],
      terminalLogs: [
        "POST /api/v1/contact - Message payload received",
        "Express middleware execution time: 1.8ms",
        "JSON data file successfully updated",
      ],
    },
    database: {
      title: "03 / PERSISTENCE TIER",
      subtitle: "Relational Database Engine",
      icon: <FiDatabase className="text-purple-400" size={20} />,
      description:
        "Structuring relational data models, writing optimized SQL queries, and executing secure CRUD operations using PostgreSQL.",
      skills: [
        { name: "PostgreSQL", role: "Relational SQL Database", icon: <SiPostgresql className="text-[#4169E1]" /> },
        { name: "SQL Queries", role: "Relational Schema Design", icon: <FiDatabase className="text-purple-400" /> },
        { name: "JSON Data Persistence", role: "Local File System CRUD", icon: <FiTerminal className="text-indigo-400" /> },
      ],
      terminalLogs: [
        "SELECT * FROM projects ORDER BY created_at DESC;",
        "PostgreSQL Query Executed - 0.6ms",
        "Connection pool active: 5 client connections",
      ],
    },
    infrastructure: {
      title: "04 / INFRASTRUCTURE TIER",
      subtitle: "Containers, Environment & Tooling",
      icon: <FiLayers className="text-indigo-400" size={20} />,
      description:
        "Containerizing application environments with Docker, managing Linux shell executions, tracking changes via Git, and prototyping UI interfaces in Figma.",
      skills: [
        { name: "Docker", role: "Containerization & Runtime Isolation", icon: <SiDocker className="text-[#2496ED]" /> },
        { name: "Git & GitHub", role: "Version Control Systems", icon: <SiGit className="text-[#F05032]" /> },
        { name: "Linux / Bash", role: "Terminal & Shell Execution", icon: <SiLinux className="text-[#FCC624]" /> },
        { name: "Figma", role: "UI Prototyping & Layouts", icon: <SiFigma className="text-[#F24E1E]" /> },
      ],
      terminalLogs: [
        "docker-compose up -d --build",
        "Container [pern_app] running on port 5000",
        "Git commit verified: release production v1.4.0",
      ],
    },
  };

  useGSAP(
    () => {
      gsap.set(".arch-card", { opacity: 0, y: 30 });

      gsap.to(".arch-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full overflow-hidden bg-slate-950 py-28 md:py-36 flex items-center justify-center font-sans text-slate-200"
    >
      {/* ATMOSPHERIC AMBIENT GLOWS */}
      <div className="absolute top-1/4 left-[-10%] w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[550px] h-[550px] bg-pink-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 space-y-12">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-300 backdrop-blur-xl mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span>PERN & DevOps Architecture</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            System{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Diagram
            </span>{" "}
            & Technical Spectrum
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select an architecture layer to inspect core technologies, container environments, and telemetry logs.
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
                type="button"
                onClick={() => setActiveLayer(key)}
                className={`arch-card relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 font-mono text-xs text-center space-y-2 ${
                  isActive
                    ? "border-indigo-500/50 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10 scale-[1.03]"
                    : "border-white/10 bg-slate-900/60 text-slate-400 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {layer.icon}
                  <span className="font-bold tracking-wider">{key.toUpperCase()}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-sans">
                  Layer 0{index + 1}
                </span>

                {index < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-600 z-20 pointer-events-none">
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
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs font-mono text-indigo-400 font-semibold tracking-widest block mb-1">
                    {architectureData[activeLayer].title}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {architectureData[activeLayer].subtitle}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-indigo-400">
                  {architectureData[activeLayer].icon}
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {architectureData[activeLayer].description}
              </p>

              {/* SKILLS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {architectureData[activeLayer].skills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-slate-950/60 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all"
                  >
                    <span className="text-2xl shrink-0">{skill.icon}</span>
                    <div className="overflow-hidden">
                      <span className="block text-xs font-bold text-white truncate">
                        {skill.name}
                      </span>
                      <span className="block text-[10px] font-mono text-slate-400 truncate">
                        {skill.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STATUS BADGE */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>STATUS: PRODUCTION DEPLOYED</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-[11px]">
                <FiCheckCircle size={13} />
                SYSTEM OPERATIONAL
              </span>
            </div>
          </div>

          {/* RIGHT 5 COLS: TERMINAL LOGS */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-950 p-6 backdrop-blur-2xl flex flex-col justify-between space-y-6 font-mono shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-2 text-indigo-400 font-semibold">
                  <FiTerminal size={14} /> SYSTEM_TELEMETRY.sh
                </span>
                <span className="text-slate-500">PERN + DOCKER</span>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                  // Live Event Stream
                </div>
                {architectureData[activeLayer].terminalLogs.map((log, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-white/5 bg-slate-900/60 text-xs text-slate-300 leading-relaxed break-all"
                  >
                    <span className="text-indigo-400 mr-2">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/10 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Environment</span>
                <span className="text-indigo-300 font-bold">Docker Containerized</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Core Stack</span>
                <span className="text-pink-300 font-bold">PERN + WebGL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}