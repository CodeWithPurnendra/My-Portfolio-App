import { useState, useEffect } from "react";
import { GiButterfly, GiKatana } from "react-icons/gi";
import gsap from "gsap";

function ShinobuUniqueLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 6) + 3, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        gsap.to("#shinobu-unique-wrapper", {
          opacity: 0,
          scale: 1.08,
          duration: 0.7,
          ease: "power3.inOut",
          onComplete: () => onComplete && onComplete(),
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div
      id="shinobu-unique-wrapper"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf7fd] backdrop-blur-3xl font-sans overflow-hidden text-slate-800"
    >
      {/* BACKGROUND FLOATING BUTTERFLY ATMOSPHERE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-purple-300/30 rounded-full blur-[100px]" />
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-pink-300/25 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full px-6">
        
        {/* DIAMOND KAMON FRAME (SHINOBU HAORI PATTERN) */}
        <div className="relative flex items-center justify-center w-48 h-48 mb-8">
          
          {/* Outer Rotating Diamond Accent */}
          <div className="absolute inset-0 rotate-45 rounded-3xl border-2 border-purple-300/50 bg-white/40 shadow-xl backdrop-blur-md transition-transform duration-300" />
          
          {/* Secondary Counter-Rotated Emerald Diamond */}
          <div 
            className="absolute inset-3 rotate-[135deg] rounded-2xl border border-emerald-400/40"
            style={{ transform: `rotate(${135 + progress * 0.9}deg)` }}
          />

          {/* INNER BUTTERFLY CORE */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Wing Flap Animation with Dual Butterfly Layering */}
            <div className="relative flex items-center justify-center mb-1">
              <GiButterfly
                className="text-purple-600 drop-shadow-[0_4px_15px_rgba(147,51,234,0.4)] animate-pulse"
                size={48}
              />
              <GiButterfly
                className="absolute text-emerald-400/70 scale-125 -z-10 blur-[1px] animate-ping"
                style={{ animationDuration: "3s" }}
                size={48}
              />
            </div>

            <span className="text-4xl font-black font-mono text-slate-900 tracking-tight">
              {progress}<span className="text-xl text-purple-600">%</span>
            </span>

          </div>
        </div>

        {/* KATANA SLASH PROGRESS BAR */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-slate-500 px-1">
            <span className="flex items-center gap-1 text-purple-700">
              <GiKatana size={14} className="rotate-45" /> INSECT BREATH
            </span>
            <span className="text-emerald-600">DANCE OF THE CAPRICE</span>
          </div>

          {/* Diagonal Slash Line Progress */}
          <div className="relative h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(168,85,247,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* STATUS FOOTER */}
        <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-slate-500 bg-white/90 px-4 py-1.5 rounded-full border border-purple-200/70 shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping" />
          <span className="tracking-wider uppercase">PREPARING WISTERIA POISON</span>
        </div>

      </div>
    </div>
  );
}

export default ShinobuUniqueLoader;