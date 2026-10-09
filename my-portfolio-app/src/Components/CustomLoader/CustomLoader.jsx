import React, { useState, useEffect, useRef } from "react";
import { FiTerminal, FiCpu, FiCheckCircle, FiZap, FiCode } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function UniqueLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const wrapperRef = useRef(null);

  const bootLogs = [
    "INITIALIZING_RUNTIME... [PERN Stack]",
    "CONNECTING_POSTGRES_POOL... [Port 5432]",
    "STARTING_EXPRESS_MIDDLEWARE... [REST API]",
    "MOUNTING_REACT_VIRTUAL_DOM... [Vite Engine]",
    "COMPILING_THREEJS_PARTICLES... [60 FPS]",
    "SYSTEM_READY... Launching Application",
  ];

  const currentLogIndex = Math.min(
    Math.floor((progress / 100) * bootLogs.length),
    bootLogs.length - 1
  );

  // Simulated progress sequence with variable ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Variable progress increment for a realistic "loading" feel
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Exit Animation using GSAP
  useGSAP(
    () => {
      if (progress === 100) {
        const timer = setTimeout(() => {
          gsap.to(wrapperRef.current, {
            opacity: 0,
            scale: 1.08,
            filter: "blur(12px)",
            duration: 0.7,
            ease: "power3.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        }, 300);

        return () => clearTimeout(timer);
      }
    },
    { dependencies: [progress] }
  );

  return (
    <div
      ref={wrapperRef}
      id="unique-loader-wrapper"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 font-sans overflow-hidden text-slate-200 select-none"
    >
      {/* ATMOSPHERIC BACKGROUND AMBIENT GLOWS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full px-6">
        
        {/* ORBITAL GEOMETRIC CORE */}
        <div className="relative flex items-center justify-center w-48 h-48 mb-8">
          
          {/* Outer Rotating Glowing Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40 animate-spin"
            style={{ animationDuration: "10s" }}
          />

          {/* Secondary Counter-Rotating Ring */}
          <div
            className="absolute inset-3 rounded-full border border-pink-500/40 border-t-transparent animate-spin"
            style={{
              animationDuration: "6s",
              animationDirection: "reverse",
              transform: `rotate(${progress * 3.6}deg)`,
            }}
          />

          {/* Inner Glowing Backdrop */}
          <div className="absolute inset-6 rounded-full bg-indigo-500/10 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center">
            
            {/* CENTRAL PERCENTAGE & LOGO */}
            <div className="flex flex-col items-center justify-center">
              <FiCode className="text-indigo-400 mb-1 animate-pulse" size={24} />
              <div className="flex items-baseline font-mono text-4xl font-extrabold text-white tracking-tight">
                <span>{progress}</span>
                <span className="text-lg text-pink-400 ml-0.5">%</span>
              </div>
            </div>

          </div>
        </div>

        {/* PROGRESS BAR & TERMINAL TELEMETRY */}
        <div className="w-full space-y-3">
          
          {/* Header Row */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <FiTerminal size={14} /> BOOT_SEQUENCE
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <FiZap size={12} /> {progress < 100 ? "LOADING" : "COMPLETE"}
            </span>
          </div>

          {/* Glowing Track Bar */}
          <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-[0_0_15px_rgba(99,102,241,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Live Terminal Log Feed */}
          <div className="p-3 rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-xl font-mono text-[11px] text-slate-300 flex items-center justify-between shadow-xl">
            <span className="truncate text-slate-300">
              <span className="text-indigo-400 mr-2">&gt;</span>
              {bootLogs[currentLogIndex]}
            </span>
            {progress === 100 ? (
              <FiCheckCircle className="text-emerald-400 shrink-0 ml-2" size={14} />
            ) : (
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping shrink-0 ml-2" />
            )}
          </div>

        </div>

        {/* STATUS FOOTER BADGE */}
        <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase text-slate-400 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-sm backdrop-blur-md">
          <FiCpu className="text-indigo-400" size={12} />
          <span className="tracking-widest">Purnendra.dev // 2026 Engine</span>
        </div>

      </div>
    </div>
  );
}