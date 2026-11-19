import React, { useState, useRef } from "react";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiDocker,
  SiJavascript,
} from "react-icons/si";
import {
  FiFolder,
  FiCode,
  FiLayers,
  FiX,
  FiCheckCircle,
  FiClock,
  FiServer,
  FiDatabase,
  FiExternalLink,
  FiTerminal,
  FiActivity,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: "proj-1",
      title: "Real-time Analytics Dashboard",
      tagline: "High-throughput telemetry streaming & interactive metrics",
      category: "PERN Full-Stack",
      status: "Production Ready",
      image: "/portfolio.png",
      liveUrl: "https://codewithpurnendra.vercel.app/",
      tags: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind"],
      techIcons: [
        <SiReact className="text-[#61DAFB]" key="react" />,
        <SiNodedotjs className="text-[#339933]" key="node" />,
        <SiExpress className="text-slate-200" key="express" />,
        <SiPostgresql className="text-[#4169E1]" key="postgres" />,
      ],
      description:
        "A full-stack performance monitoring web app built on the PERN stack designed to aggregate, store, and display real-time telemetry metrics across distributed API endpoints.",
      highlights: [
        "Sub-50ms event streaming pipeline for system performance metrics",
        "Optimized PostgreSQL schema with custom relational indexes and query views",
        "Interactive canvas UI with smooth frame-budget rendering",
        "Express REST controllers with session management and secure request handling",
      ],
      architectureSpec: {
        frontend: "React + Tailwind CSS state machines",
        backend: "Node.js & Express RESTful API middleware",
        database: "PostgreSQL relational database persistence",
        devops: "Dockerized runtime environment with Git CI",
      },
      mockEndpoints: [
        "GET /api/v1/analytics/stream?interval=5m",
        "POST /api/v1/telemetry/ingest [Payload: JSON]",
        "GET /api/v1/healthcheck -> 200 OK",
      ],
    },
    {
      id: "proj-2",
      title: "Savore — Interactive Experience",
      tagline: "WebGL 3D visualizers with custom lighting & textures",
      category: "Three.js & Graphics",
      status: "Completed",
      image: "/savore.png",
      liveUrl: "https://savore-kitchen.vercel.app/",
      tags: ["Three.js", "React", "GSAP", "JavaScript"],
      techIcons: [
        <SiReact className="text-[#61DAFB]" key="react" />,
        <SiJavascript className="text-[#F7DF1E]" key="js" />,
        <FiActivity className="text-pink-400" key="motion" />,
      ],
      description:
        "Interactive 3D web environments built using Three.js meshes, lighting, camera configurations, and custom orbital controls paired with smooth GSAP animations.",
      highlights: [
        "Custom WebGL particle systems rendering dynamic starfields and planetary textures",
        "Smooth camera transitions and orbit controls tied to scroll triggers",
        "Optimized buffer geometries maintaining 60 FPS across desktop viewports",
        "Responsive canvas scaling with adaptive antialiasing and bloom effects",
      ],
      architectureSpec: {
        frontend: "Three.js WebGL Scene + React Controls",
        backend: "Static Asset Edge Pipeline",
        database: "Local JSON Scene Configuration",
        devops: "Vite Bundler + GitHub Pages Deploy",
      },
      mockEndpoints: [
        "Scene Render: WebGL 2.0 Canvas Context",
        "Frame Budget: 16.6ms per frame (60 FPS)",
        "Particle Count: 2,500 active buffer particles",
      ],
    },
    {
      id: "proj-3",
      title: "Veyora — Task Management Engine",
      tagline: "Custom Node.js server with CRUD operations & file system persistence",
      category: "Backend Engine",
      status: "Active Development",
      image: "/veyora.png",
      liveUrl: "https://veyora-store.vercel.app/",
      tags: ["Node.js", "Express", "PostgreSQL", "Docker"],
      techIcons: [
        <SiNodedotjs className="text-[#339933]" key="node" />,
        <SiExpress className="text-slate-200" key="express" />,
        <SiPostgresql className="text-[#4169E1]" key="postgres" />,
        <SiDocker className="text-[#2496ED]" key="docker" />,
      ],
      description:
        "A custom task management REST API server constructed in Node.js and Express.js that handles structured request validation, sanitization, and database persistence.",
      highlights: [
        "Express middleware suite for route validation and error handling",
        "PostgreSQL CRUD persistence with local JSON fallback adapters",
        "Modular controller architecture adhering to clean separation of concerns",
        "Containerized with Docker for reproducible development setups",
      ],
      architectureSpec: {
        frontend: "Postman API Client & Web Interfaces",
        backend: "Express.js Controllers with ES Modules",
        database: "PostgreSQL Database & File System JSON",
        devops: "Docker Container & Linux Environment",
      },
      mockEndpoints: [
        "POST /api/v1/tasks/create",
        "GET /api/v1/tasks?status=completed",
        "DELETE /api/v1/tasks/:id",
      ],
    },
  ];

  // GSAP ENTRANCE ANIMATION
  useGSAP(
    () => {
      gsap.set(".project-card", { opacity: 0, y: 30 });

      gsap.to(".project-card", {
        opacity: 1,
        y: 0,
        duration: 0.75,
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
      id="projects"
      className="relative w-full overflow-hidden bg-slate-950 text-slate-200 py-20 md:py-28 flex items-center justify-center font-sans"
    >
      {/* ATMOSPHERIC AMBIENT GLOWS */}
      <div className="absolute top-1/3 right-[-10%] w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[550px] h-[550px] bg-pink-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-300 backdrop-blur-xl mb-3 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span>Featured Systems & Repositories</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Engineering{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click any preview to open the live deployment, or inspect the system architecture.
          </p>
        </div>

        {/* COMPACT PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="project-card group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden backdrop-blur-2xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <div>
                {/* FULL UNCLIPPED PREVIEW */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live preview`}
                  className="relative block aspect-video w-full overflow-hidden border-b border-white/10 bg-slate-950 p-2"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full rounded-lg object-contain transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600/95 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-lg backdrop-blur-md">
                      <span>Visit Live</span>
                      <FiExternalLink size={12} />
                    </span>
                  </div>
                </a>

                {/* COMPACT CARD BODY */}
                <div className="p-4 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {project.category}
                    </span>

                    <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                      <FiClock className="text-pink-400" size={11} />
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-snug line-clamp-2 mb-3.5">
                    {project.tagline}
                  </p>

                  {/* TECH ICONS + TAGS */}
                  <div className="flex items-center gap-2.5 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-lg shrink-0">
                      {project.techIcons}
                    </div>
                    <div className="h-3.5 w-[1px] bg-white/10" />
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-white/5">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* COMPACT ACTION FOOTER */}
              <div className="px-4 pb-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 py-2 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-indigo-600 hover:border-indigo-500 text-slate-200 hover:text-white text-[11px] font-mono font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <FiLayers className="text-indigo-400 group-hover:text-white" size={13} />
                  <span>INSPECT ARCHITECTURE</span>
                </button>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Live Project"
                  className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all duration-300"
                >
                  <FiExternalLink size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE PREVIEW DRAWER (SLIDE-OVER PANEL) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-2xl h-full bg-slate-900 border-l border-white/10 p-6 sm:p-8 overflow-y-auto font-sans flex flex-col justify-between space-y-8 shadow-2xl text-slate-200">
            <div className="space-y-6">
              {/* DRAWER HEADER */}
              <div className="flex items-start justify-between pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-2">
                    <FiFolder size={12} />
                    <span>{selectedProject.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* CLICKABLE IMAGE PREVIEW INSIDE DRAWER */}
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950 p-2"
              >
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full rounded-lg object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end justify-between p-4">
                  <span className="text-xs font-mono text-slate-200 truncate max-w-[70%]">
                    {selectedProject.liveUrl}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-mono font-semibold text-white shrink-0">
                    Launch <FiExternalLink size={12} />
                  </span>
                </div>
              </a>

              {/* STATUS BANNER */}
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <FiClock className="text-pink-400" size={16} />
                  <span>Deployment Status:</span>
                </div>
                <span className="text-indigo-300 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                  {selectedProject.status}
                </span>
              </div>

              {/* OVERVIEW */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  // Project Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedProject.description}
                </p>
              </div>

              {/* HIGHLIGHTS */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  // Technical Highlights
                </h4>
                <div className="space-y-2">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-white/5"
                    >
                      <FiCheckCircle className="text-indigo-400 shrink-0 mt-0.5" size={14} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ARCHITECTURE BREAKDOWN */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  // Stack Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-slate-400 block flex items-center gap-1.5">
                      <FiCode size={12} className="text-indigo-400" /> Client Layer
                    </span>
                    <span className="text-slate-200 font-sans">
                      {selectedProject.architectureSpec.frontend}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-slate-400 block flex items-center gap-1.5">
                      <FiServer size={12} className="text-pink-400" /> Runtime Engine
                    </span>
                    <span className="text-slate-200 font-sans">
                      {selectedProject.architectureSpec.backend}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-slate-400 block flex items-center gap-1.5">
                      <FiDatabase size={12} className="text-purple-400" /> Persistence
                    </span>
                    <span className="text-slate-200 font-sans">
                      {selectedProject.architectureSpec.database}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="text-slate-400 block flex items-center gap-1.5">
                      <FiLayers size={12} className="text-emerald-400" /> Environment
                    </span>
                    <span className="text-slate-200 font-sans">
                      {selectedProject.architectureSpec.devops}
                    </span>
                  </div>
                </div>
              </div>

              {/* TERMINAL TELEMETRY */}
              <div className="space-y-2 font-mono">
                <h4 className="text-xs text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiTerminal size={14} /> Active Telemetry Log
                </h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2 text-xs text-slate-300">
                  {selectedProject.mockEndpoints.map((ep, i) => (
                    <div key={i}>
                      <span className="text-indigo-400 mr-2">&gt;</span>
                      {ep}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DRAWER FOOTER */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 underline underline-offset-4"
              >
                <FiExternalLink size={14} />
                <span>Open Live Deployment</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors font-bold"
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