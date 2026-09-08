import { useState, useEffect, useRef } from "react";
import { 
  SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiExpress, SiPostgresql, SiMongodb, SiDocker, SiRedis 
} from "react-icons/si";
import { GiButterfly, GiFlowerEmblem } from "react-icons/gi";
import { 
  FiFolder, FiCode, FiLayers, FiX, FiCheckCircle, 
  FiClock, FiServer, FiDatabase, FiExternalLink, FiTerminal 
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: "proj-1",
      title: "Real-time Analytics Dashboard",
      tagline: "High-throughput data streaming and visualization pipeline",
      category: "Full-Stack System",
      status: "In Staging (Pre-Release)",
      statusType: "staging",
      accentColor: "#9b51e0",
      featured: true,
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      techIcons: [
        <SiReact className="text-[#61DAFB]" key="react" />,
        <SiTypescript className="text-[#3178C6]" key="ts" />,
        <SiNodedotjs className="text-[#339933]" key="node" />,
        <SiPostgresql className="text-[#4169E1]" key="postgres" />,
      ],
      description:
        "A full-stack performance monitoring system designed to parse, aggregate, and visualize real-time web telemetry metrics across distributed endpoints.",
      highlights: [
        "Sub-50ms web socket event streaming pipeline for telemetry data",
        "Optimized PostgreSQL indexed schema with custom view aggregations",
        "Interactive canvas-based charting UI with smooth frame-budget rendering",
        "Role-based access control with token rotation middleware"
      ],
      architectureSpec: {
        frontend: "React + TypeScript + Tailwind CSS state machines",
        backend: "Node.js REST runtime with Express middleware caching",
        database: "PostgreSQL relational persistence layer",
        devops: "Dockerized local container environment"
      },
      mockEndpoints: [
        "GET /api/v1/analytics/stream?interval=5m",
        "POST /api/v1/telemetry/ingest [Payload: Binary]",
        "GET /api/v1/healthcheck -> 200 OK"
      ]
    },
    {
      id: "proj-2",
      title: "Task Orchestration API Gateway",
      tagline: "Asynchronous job queue & microservice middleware",
      category: "Backend Engine",
      status: "Active Development",
      statusType: "dev",
      accentColor: "#e8a7c4",
      featured: false,
      tags: ["Node.js", "Express", "MongoDB", "Docker", "Redis"],
      techIcons: [
        <SiNodedotjs className="text-[#339933]" key="node" />,
        <SiExpress className="text-slate-800" key="express" />,
        <SiMongodb className="text-[#47A248]" key="mongo" />,
        <SiDocker className="text-[#2496ED]" key="docker" />,
      ],
      description:
        "A reliable background job queue manager designed to process deferred computational tasks, handle rate limiting, and log API request queues.",
      highlights: [
        "Distributed queue handling using Redis memory caching layer",
        "Express middleware suite for JWT validation and request sanitization",
        "Structured logging engine with automated rotation policies",
        "MongoDB document collections optimized for high write concurrency"
      ],
      architectureSpec: {
        frontend: "CLI Admin Interface & Webhooks",
        backend: "Express.js route controllers with async worker threads",
        database: "MongoDB for task state & Redis for in-memory queues",
        devops: "Multi-stage Dockerized deployment workflow"
      },
      mockEndpoints: [
        "POST /api/v1/jobs/enqueue",
        "GET /api/v1/jobs/status/:jobId",
        "DELETE /api/v1/jobs/flush-cache"
      ]
    },
    {
      id: "proj-3",
      title: "Dynamic Portfolio Architecture",
      tagline: "Component-driven design system with GSAP orchestration",
      category: "Frontend Design System",
      status: "Final Testing",
      statusType: "staging",
      accentColor: "#f3c7d9",
      featured: false,
      tags: ["React", "Tailwind CSS", "GSAP", "JavaScript"],
      techIcons: [
        <SiReact className="text-[#61DAFB]" key="react" />,
        <SiTailwindcss className="text-[#06B6D4]" key="tailwind" />,
        <GiButterfly className="text-[#9b51e0]" key="butterfly" />,
      ],
      description:
        "An expressive, highly responsive portfolio experience incorporating custom architectural diagrams, scroll-bound GSAP animations, and interactive preview drawers.",
      highlights: [
        "Hardware-accelerated animations using GSAP ScrollTrigger context",
        "Interactive architectural inspection modules replacing standard link grids",
        "Zero-layout-shift responsive Tailwind design system",
        "Accessible modal and drawer state management"
      ],
      architectureSpec: {
        frontend: "React 18 + GSAP ScrollTrigger Engine",
        backend: "Static Edge Distribution Pipeline",
        database: "Local structured JSON data state",
        devops: "CI/CD automated build check workflow"
      },
      mockEndpoints: [
        "Render Pipeline: 60fps ScrollTrigger timeline",
        "Bundle Optimization: Code-split route chunks",
        "UI State: Hydrated React context store"
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      id="projects"
      className="relative min-h-screen w-full overflow-hidden bg-[#fcf8ff] text-slate-900 py-28 md:py-36 flex items-center justify-center font-sans"
    >
      {/* BACKGROUND ATMOSPHERIC GLOWS */}
      <div className="absolute top-1/3 right-[-10%] w-[550px] h-[550px] bg-[#c9a7e8]/25 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[550px] h-[550px] bg-[#e8a7c4]/25 rounded-full blur-[170px] pointer-events-none" />

      {/* FLOATING MOTIF ACCENTS */}
      <div className="absolute top-20 left-16 text-[#9b51e0]/20 text-6xl pointer-events-none animate-pulse">
        <GiButterfly />
      </div>
      <div className="absolute bottom-20 right-16 text-[#d946ef]/20 text-6xl pointer-events-none">
        <GiFlowerEmblem />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 space-y-12">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9b51e0]/20 bg-purple-100/60 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#6b21a8] backdrop-blur-xl mb-4 shadow-sm">
            <GiFlowerEmblem className="text-[#9b51e0]" size={16} />
            <span>FEATURED WORKS & LABS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Engineering <span className="bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select any project card to open the interactive system architecture drawer, API specs, and technical highlights.
          </p>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="project-card group relative flex flex-col justify-between rounded-3xl border border-purple-100 bg-white/80 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-[#9b51e0]/40 hover:shadow-[0_10px_30px_rgba(155,81,224,0.1)] hover:-translate-y-1"
            >
              <div>
                {/* CARD TOP HEADER */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#6b21a8] px-2.5 py-1 rounded-md bg-purple-50 border border-purple-200">
                    {project.category}
                  </span>
                  
                  {/* Status Indicator */}
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    <FiClock className="text-[#d946ef]" size={12} />
                    {project.status}
                  </span>
                </div>

                {/* TITLE & TAGLINE */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#6b21a8] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans mb-6">
                  {project.tagline}
                </p>

                {/* TECH ICONS + TAGS */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-xl shrink-0">
                    {project.techIcons}
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200" />
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* CARD FOOTER BUTTON */}
              <button
                onClick={() => setSelectedProject(project)}
                className="w-full py-3 px-4 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-[#6b21a8] text-xs font-mono font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-[#9b51e0]/40"
              >
                <FiLayers className="text-[#9b51e0]" size={14} />
                <span>INSPECT SYSTEM ARCHITECTURE</span>
              </button>
            </div>
          ))}
        </div>

        {/* BOTTOM NOTE ON PRE-RELEASE */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-purple-100 bg-white/60 p-4 text-center backdrop-blur-xl shadow-sm">
          <p className="text-xs text-slate-500 font-mono">
            💡 Live deployment links will be attached to each card upon final code freeze and production domain pairing.
          </p>
        </div>

      </div>

      {/* INTERACTIVE PREVIEW DRAWER (SLIDE-OVER PANEL) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
          
          {/* DRAWER CONTAINER */}
          <div className="relative w-full max-w-2xl h-full bg-white border-l border-slate-200 p-6 sm:p-8 overflow-y-auto font-sans flex flex-col justify-between space-y-8 shadow-2xl animate-in slide-in-from-right duration-300 text-slate-900">
            
            <div className="space-y-6">
              
              {/* DRAWER HEADER */}
              <div className="flex items-start justify-between pb-6 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-200 text-xs font-mono text-[#6b21a8] mb-2">
                    <FiFolder size={12} />
                    <span>{selectedProject.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* DEPLOYMENT STATUS BANNER */}
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-700">
                  <FiClock className="text-[#d946ef]" size={16} />
                  <span>Deployment Status:</span>
                </div>
                <span className="text-[#6b21a8] font-bold bg-white px-3 py-1 rounded-lg border border-purple-200 shadow-sm">
                  {selectedProject.status}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#6b21a8] uppercase tracking-wider">Project Overview</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {selectedProject.description}
                </p>
              </div>

              {/* TECHNICAL HIGHLIGHTS */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#6b21a8] uppercase tracking-wider">Engineering Highlights</h4>
                <div className="space-y-2">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <FiCheckCircle className="text-[#9b51e0] shrink-0 mt-0.5" size={14} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ARCHITECTURE BREAKDOWN GRID */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#6b21a8] uppercase tracking-wider">Stack Architecture</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 block flex items-center gap-1.5">
                      <FiCode size={12} /> Client Layer
                    </span>
                    <span className="text-slate-800 font-sans">{selectedProject.architectureSpec.frontend}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 block flex items-center gap-1.5">
                      <FiServer size={12} /> Runtime Engine
                    </span>
                    <span className="text-slate-800 font-sans">{selectedProject.architectureSpec.backend}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 block flex items-center gap-1.5">
                      <FiDatabase size={12} /> Persistence
                    </span>
                    <span className="text-slate-800 font-sans">{selectedProject.architectureSpec.database}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 block flex items-center gap-1.5">
                      <FiLayers size={12} /> Environment
                    </span>
                    <span className="text-slate-800 font-sans">{selectedProject.architectureSpec.devops}</span>
                  </div>
                </div>
              </div>

              {/* MOCK TERMINAL SPEC */}
              <div className="space-y-2 font-mono">
                <h4 className="text-xs text-[#6b21a8] uppercase tracking-wider flex items-center gap-1.5">
                  <FiTerminal size={14} /> Active Route Telemetry
                </h4>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
                  {selectedProject.mockEndpoints.map((ep, i) => (
                    <div key={i}>
                      <span className="text-[#e8a7c4] mr-2">$</span>
                      {ep}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* DRAWER FOOTER ACTION */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <span className="text-slate-500 flex items-center gap-2">
                <FiExternalLink size={14} />
                Public URL: Pending Final Release
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#6b21a8] border border-purple-300 transition-colors"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default Projects;