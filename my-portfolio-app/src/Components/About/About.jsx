import React, { useState, useRef } from "react";
import {
  FiTerminal,
  FiCpu,
  FiCode,
  FiZap,
  FiLayers,
  FiGitCommit,
  FiCheckCircle,
  FiCompass,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const sectionRef = useRef(null);
  const [activeCommand, setActiveCommand] = useState("bio");

  // GSAP SCROLLTRIGGER REVEALS
  useGSAP(
    () => {
      gsap.set(".about-reveal", { opacity: 0, y: 35 });

      gsap.to(".about-reveal", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  const timelineEvents = [
    {
      year: "PHASE 01",
      title: "Self-Directed Shift",
      detail:
        "Chose to bypass conventional academic pace to focus 100% of daily energy on building production-grade web systems and mastering full-stack architecture.",
    },
    {
      year: "PHASE 02",
      title: "PERN & WebGL Deep Dive",
      detail:
        "Mastered PostgreSQL relational modeling, Express REST APIs, React state flows, and complex 3D graphics rendered with Three.js and GSAP animations.",
    },
    {
      year: "PHASE 03",
      title: "Production Architecture",
      detail:
        "Constructing full-stack web applications prioritizing sub-second load times, clean code separation, and seamless user micro-interactions.",
    },
  ];

  const commandOutputs = {
    bio: {
      cmd: "cat developer_profile.json",
      output: (
        <div className="space-y-1.5 text-slate-300">
          <p><span className="text-pink-400">const</span> developer = {"{"}</p>
          <p className="pl-4">name: <span className="text-emerald-400">'Purnendra'</span>,</p>
          <p className="pl-4">role: <span className="text-emerald-400">'Full-Stack Web Engineer'</span>,</p>
          <p className="pl-4">primaryStack: [<span className="text-amber-300">'PostgreSQL'</span>, <span className="text-amber-300">'Express'</span>, <span className="text-amber-300">'React'</span>, <span className="text-amber-300">'Node'</span>],</p>
          <p className="pl-4">creativeStack: [<span className="text-indigo-300">'Three.js'</span>, <span className="text-indigo-300">'GSAP'</span>, <span className="text-indigo-300">'Tailwind CSS'</span>],</p>
          <p className="pl-4">location: <span className="text-slate-300">'Remote / Global'</span></p>
          <p>{"};"}</p>
        </div>
      ),
    },
    stack: {
      cmd: "sysctl --get-stack",
      output: (
        <div className="space-y-2 text-slate-300">
          <p className="text-indigo-400">// Core Engineering Stack</p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-pink-400 font-bold">Frontend:</span> React, Next.js, Tailwind CSS, GSAP
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-indigo-400 font-bold">3D Graphics:</span> Three.js, WebGL, React Three Fiber
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-amber-300 font-bold">Backend:</span> Node.js, Express.js, REST APIs
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-emerald-400 font-bold">Database:</span> PostgreSQL, SQL Optimization
            </div>
          </div>
        </div>
      ),
    },
    mindset: {
      cmd: "git log --oneline -n 3",
      output: (
        <div className="space-y-1.5 font-mono text-slate-300">
          <p><span className="text-amber-400">a1b2c3d</span> <span className="text-emerald-400">feat:</span> Refactor REST service abstraction layer</p>
          <p><span className="text-amber-400">e5f6g7h</span> <span className="text-indigo-400">perf:</span> Optimize Three.js particle buffer allocations</p>
          <p><span className="text-amber-400">i8j9k0l</span> <span className="text-pink-400">style:</span> Polish GSAP scroll triggers and micro-interactions</p>
        </div>
      ),
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-slate-950 py-28 md:py-36 font-sans text-slate-200"
    >
      {/* ATMOSPHERIC AMBIENT GLOWS */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 space-y-16">
        {/* HEADER */}
        <div className="about-reveal text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-300 backdrop-blur-xl mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span>Engineering & Methodology</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Building High-Performance Applications With{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Intentional Design
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            I craft web applications that blend scalable backend architectures with immersive, high-fps interactive user interfaces.
          </p>
        </div>

        {/* SECTION 1: TWO-COLUMN ASYNC TIMELINE & CLI TERMINAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 6 COLS: CHRONOLOGICAL TIMELINE */}
          <div className="about-reveal lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-wider uppercase font-semibold">
              <FiCompass className="text-indigo-400" size={16} />
              <span>// Evolutionary Milestones</span>
            </div>

            <div className="relative border-l border-white/10 pl-6 space-y-8 ml-2">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-indigo-400 bg-slate-950 transition-all duration-300 group-hover:bg-indigo-500 group-hover:scale-125" />

                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {evt.year}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-indigo-300 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {evt.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 6 COLS: INTERACTIVE TERMINAL TABBED PANEL */}
          <div className="about-reveal lg:col-span-6 rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-2xl shadow-2xl space-y-4">
            
            {/* Terminal Header & Commands */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>

              {/* Command Selector Buttons */}
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {["bio", "stack", "mindset"].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCommand(key)}
                    className={`px-2.5 py-1 rounded transition-all uppercase ${
                      activeCommand === key
                        ? "bg-indigo-600 text-white font-bold"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Screen Output */}
            <div className="rounded-xl bg-slate-950 p-5 font-mono text-xs shadow-inner min-h-[220px] flex flex-col justify-between">
              <div>
                <p className="text-slate-500 text-[10px] mb-2">
                  <span className="text-emerald-400">guest@purnendra-dev</span>:
                  <span className="text-indigo-400">~</span>$ {commandOutputs[activeCommand].cmd}
                </p>

                {commandOutputs[activeCommand].output}
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <FiCheckCircle size={12} /> STATUS: OK (200)
                </span>
                <span>TYPE: INTERACTIVE_INSPECT</span>
              </div>
            </div>

          </div>

        </div>

        {/* SECTION 2: 3 CORE PHILOSOPHY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FiCpu className="text-indigo-400" size={22} />,
              title: "Full-Stack PERN Focus",
              desc: "Building clean REST APIs with Node/Express and PostgreSQL databases, connected to high-frequency React frontends.",
            },
            {
              icon: <FiZap className="text-purple-400" size={22} />,
              title: "3D & Micro-Interactions",
              desc: "Crafting real-time WebGL graphics using Three.js and fluid UI motion with GSAP scroll animations.",
            },
            {
              icon: <FiLayers className="text-pink-400" size={22} />,
              title: "Algorithmic Precision",
              desc: "Studying physics and mathematics to write clean, performance-first code with intuitive state management.",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="about-reveal group rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 border border-white/10 mb-4 group-hover:border-indigo-500/40 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}