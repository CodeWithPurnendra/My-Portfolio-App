import { useEffect, useRef } from "react";
import { FiCompass, FiTerminal, FiCpu, FiZap } from "react-icons/fi";
import { GiButterfly, GiFlowerEmblem } from "react-icons/gi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const storyRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    // Delay GSAP initialization slightly on reload to ensure DOM layout is settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Main Story Box Reveal
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Feature Cards Stagger
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 40, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: validCards[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Stat Counters Animation
      statsRef.current.forEach((stat) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const corePillars = [
    {
      icon: <FiCompass className="text-[#9b51e0]" size={26} />,
      title: "Autodidact Philosophy",
      tag: "Self-Directed",
      description:
        "Stepped away from traditional academia to master production-level web development at my own relentless speed.",
    },
    {
      icon: <FiCpu className="text-[#d946ef]" size={26} />,
      title: "Full-Stack PERN Stack",
      tag: "Architecture",
      description:
        "Building robust backends with Node.js, Express, and PostgreSQL, paired with high-frequency React and GSAP frontends.",
    },
    {
      icon: <FiZap className="text-[#ec4899]" size={26} />,
      title: "Deep Conceptual Focus",
      tag: "Problem Solving",
      description:
        "Applying principles from physics and mathematics to write clean, scalable algorithms and optimized web applications.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-[#fcf8ff] text-slate-900 py-28 md:py-36 flex items-center justify-center font-sans"
    >
      {/* ATMOSPHERIC GLOW ORBS */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-[#c9a7e8]/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-[#e8a7c4]/25 rounded-full blur-[160px] pointer-events-none" />

      {/* FLOATING DECORATIVE MOTIFS */}
      <div className="absolute top-20 right-16 text-[#9b51e0]/20 text-6xl pointer-events-none animate-pulse">
        <GiButterfly />
      </div>
      <div className="absolute bottom-20 left-12 text-[#d946ef]/20 text-6xl pointer-events-none">
        <GiFlowerEmblem />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* HEADER */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9b51e0]/20 bg-purple-100/60 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#6b21a8] backdrop-blur-xl mb-4 shadow-sm">
            <GiButterfly className="text-[#9b51e0]" size={16} />
            <span>THE ENGINEER'S MINDSET</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            Architecting Code With <br />
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899] bg-clip-text text-transparent">
              Uncompromising Clarity.
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            A self-taught full-stack developer who prioritized real-world mastery over standard classroom speed.
          </p>
        </div>

        {/* HERO STORY CARD WITH TERMINAL SPEC */}
        <div
          ref={storyRef}
          className="group relative rounded-3xl border border-purple-100 bg-white/80 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(155,81,224,0.05)] transition-all duration-500 hover:border-[#9b51e0]/40 mb-16"
        >
          {/* Ambient Card Glow */}
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#9b51e0]/10 via-[#d946ef]/10 to-transparent opacity-50 blur-xl transition-all duration-500 group-hover:opacity-100 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT: STORY TEXT */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#6b21a8] bg-purple-50 px-3 py-1 rounded-md border border-purple-200 w-fit">
                <FiTerminal size={14} />
                <span>whoami --verbose</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Built Through Discipline, Driven By Results.
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Choosing to step out of college wasn't about taking a shortcut—it was about cutting out the noise. I substituted structured lectures with daily, intense deep-work blocks dedicated to modern software architecture, database design, and high-performance frontend engineering.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                When I'm not crafting RESTful APIs or designing reactive interfaces, I study physics, mathematics, and complex systems. This cross-disciplinary approach gives my engineering an analytical edge and extreme precision.
              </p>

              {/* STATS STRIP */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div ref={(el) => (statsRef.current[0] = el)} className="space-y-1">
                  <span className="block text-2xl font-bold text-[#6b21a8]">100%</span>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">Self-Taught</span>
                </div>
                <div ref={(el) => (statsRef.current[1] = el)} className="space-y-1">
                  <span className="block text-2xl font-bold text-[#d946ef]">PERN</span>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">Tech Stack</span>
                </div>
                <div ref={(el) => (statsRef.current[2] = el)} className="space-y-1">
                  <span className="block text-2xl font-bold text-[#ec4899]">Full-Time</span>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">Dedication</span>
                </div>
              </div>

            </div>

            {/* RIGHT: INTERACTIVE TERMINAL DISPLAY */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 font-mono text-xs shadow-xl space-y-4 text-slate-300">
                
                {/* Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ec4899]" />
                    <span className="h-3 w-3 rounded-full bg-[#9b51e0]" />
                    <span className="h-3 w-3 rounded-full bg-slate-700" />
                  </div>
                  <span>developer.json</span>
                </div>

                {/* Code Body */}
                <div className="space-y-2 text-slate-200 leading-relaxed">
                  <p><span className="text-[#ec4899]">const</span> developer = {"{"}</p>
                  <p className="pl-4">name: <span className="text-[#f3c7d9]">'Purnendra'</span>,</p>
                  <p className="pl-4">path: <span className="text-[#f3c7d9]">'Self-Directed Engineer'</span>,</p>
                  <p className="pl-4">education: <span className="text-[#e8a7c4]">'College Dropout (By Choice)'</span>,</p>
                  <p className="pl-4">focus: [<span className="text-[#e8a7c4]">'PostgreSQL'</span>, <span className="text-[#e8a7c4]">'Express'</span>, <span className="text-[#e8a7c4]">'React'</span>, <span className="text-[#e8a7c4]">'Node'</span>],</p>
                  <p className="pl-4">otherInterests: [<span className="text-[#ec4899]">'Physics'</span>, <span className="text-[#ec4899]">'Mathematics'</span>, <span className="text-[#ec4899]">'Investing'</span>],</p>
                  <p className="pl-4">mindset: <span className="text-emerald-400">'Relentless Execution'</span></p>
                  <p>{"};"}</p>
                </div>

                {/* Simulated Terminal Status */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">STATUS</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    READY TO BUILD
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 3 CORE PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {corePillars.map((pillar, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative rounded-2xl border border-purple-100 bg-white/70 p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#9b51e0]/40 hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(155,81,224,0.1)]"
            >
              {/* Badge Pill */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 border border-purple-200 group-hover:border-[#9b51e0]/40 transition-colors">
                  {pillar.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#6b21a8] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  {pillar.tag}
                </span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#6b21a8] transition-colors">
                {pillar.title}
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;