import React, { useEffect, useState } from "react";
import { FiServer, FiCpu } from "react-icons/fi";

export default function Loader({ isSubmitting }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isSubmitting) {
      setStage(0);
      return;
    }

    // Stage 1 (after 2.5s): Free-tier backend cold start notice
    const wakeTimer = setTimeout(() => {
      setStage(1);
    }, 2500);

    // Stage 2 (after 7s): Database connection / commit notice
    const dbTimer = setTimeout(() => {
      setStage(2);
    }, 7000);

    return () => {
      clearTimeout(wakeTimer);
      clearTimeout(dbTimer);
    };
  }, [isSubmitting]);

  if (!isSubmitting) return null;

  const messages = [
    {
      title: "DISPATCHING PAYLOAD...",
      sub: "Establishing secure POST connection to Express API",
    },
    {
      title: "WAKING UP FREE-TIER INSTANCE...",
      sub: "Server was asleep due to inactivity — cold start takes ~5–15s",
    },
    {
      title: "WRITING TO POSTGRESQL...",
      sub: "Almost done, committing your project scope to database",
    },
  ];

  const current = messages[stage];

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl border border-indigo-500/30 bg-slate-950/90 p-4 font-mono text-xs backdrop-blur-xl shadow-lg shadow-indigo-500/10 space-y-2.5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-indigo-300 font-semibold">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin shrink-0" />
          <span>{current.title}</span>
        </div>

        <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full shrink-0">
          {stage === 0 ? <FiCpu size={10} /> : <FiServer size={10} />}
          {stage === 0 ? "ACTIVE" : "COLD START"}
        </span>
      </div>

      {/* Animated Indeterminate Progress Bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
          style={{ width: stage === 0 ? "35%" : stage === 1 ? "70%" : "92%" }}
        />
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        <span className="text-indigo-400">&gt;</span> {current.sub}
      </p>
    </div>
  );
}