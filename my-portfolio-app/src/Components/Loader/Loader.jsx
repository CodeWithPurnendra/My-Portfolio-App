import React, { useEffect, useState } from "react";
import { FiCpu, FiServer } from "react-icons/fi";

export default function Loader({ isSubmitting }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isSubmitting) {
      setStage(0);
      return;
    }

    const wakeTimer = setTimeout(() => {
      setStage(1);
    }, 2500);

    const dbTimer = setTimeout(() => {
      setStage(2);
    }, 7000);

    return () => {
      clearTimeout(wakeTimer);
      clearTimeout(dbTimer);
    };
  }, [isSubmitting]);

  if (!isSubmitting) return null;

  const stages = [
    {
      title: "DISPATCHING PAYLOAD...",
      detail: "Sending request to backend API...",
      progress: "35%",
    },
    {
      title: "WAKING FREE-TIER SERVER...",
      detail: "Free backend was asleep — cold start can take a few seconds.",
      progress: "70%",
    },
    {
      title: "SAVING TO DATABASE...",
      detail: "Almost there, committing your project scope...",
      progress: "92%",
    },
  ];

  const active = stages[stage];

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl border border-indigo-500/30 bg-slate-950/95 p-4 font-mono text-xs text-slate-200 shadow-lg shadow-indigo-600/15 space-y-2.5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-indigo-300 font-semibold">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin shrink-0" />
          <span>{active.title}</span>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-300 shrink-0">
          {stage === 0 ? <FiCpu size={10} /> : <FiServer size={10} />}
          {stage === 0 ? "SENDING" : "COLD START"}
        </span>
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
          style={{ width: active.progress }}
        />
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        <span className="text-indigo-400">&gt;</span> {active.detail}
      </p>
    </div>
  );
}