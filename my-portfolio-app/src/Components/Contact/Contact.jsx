import React, { useState, useRef } from "react";
import {
  FiTerminal,
  FiSend,
  FiCheckCircle,
  FiCopy,
  FiMapPin,
  FiClock,
  FiSliders,
  FiCode,
  FiZap,
  FiAlertCircle,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function InteractiveContact({ onSendMessage }) {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("builder"); // 'builder' | 'terminal'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // PROJECT ESTIMATOR TOGGLES
  const [selectedServices, setSelectedServices] = useState([
    "Full-Stack Web App",
  ]);

  const serviceOptions = [
    { id: "Full-Stack Web App", label: "PERN Full-Stack App", time: "2-3 Wks" },
    { id: "3D Graphics & WebGL", label: "Three.js 3D Scene", time: "+1 Wk" },
    { id: "GSAP & Micro-Interactions", label: "GSAP Animations", time: "+3 Days" },
    { id: "REST API & Backend", label: "Express API & Database", time: "+1 Wk" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const emailAddress = "purnendranishad5@gmail.com";

  // ENTRANCE ANIMATION
  useGSAP(
    () => {
      gsap.set(".contact-anim", { opacity: 0, y: 35 });

      gsap.to(".contact-anim", {
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

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // HANDLER CONNECTED TO EXPRESS ENDPOINT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const payload = {
      ...formData,
      services: selectedServices,
    };

    try {
      if (onSendMessage) {
        await onSendMessage(payload);
      } else {
        // Send POST request to Express backend
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to dispatch payload.");
        }
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setErrorMessage(err.message || "Server connection error. Is Express running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-slate-950 py-28 md:py-36 font-sans text-slate-200"
    >
      {/* ATMOSPHERIC GLOWS */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 space-y-12">
        {/* HEADER */}
        <div className="contact-anim text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-300 backdrop-blur-xl mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span>Interactive Scope Builder</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Start a Project or{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Initiate Contact
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your project requirements below to compute scope estimates, or send a direct transmission to my inbox.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: QUICK INFO & DIRECT SOCKET */}
          <div className="contact-anim lg:col-span-4 space-y-6">
            {/* DIRECT EMAIL BAR */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-2xl shadow-xl space-y-4">
              <span className="text-xs font-mono text-indigo-400 font-semibold tracking-widest uppercase block">
                // Direct Reach
              </span>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-slate-950/80">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FiCode className="text-indigo-400 shrink-0" size={18} />
                  <span className="text-xs font-mono text-slate-300 truncate font-medium">
                    {emailAddress}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all shrink-0"
                >
                  {copied ? (
                    <FiCheckCircle className="text-emerald-400" size={16} />
                  ) : (
                    <FiCopy size={16} />
                  )}
                </button>
              </div>

              {/* AVAILABILITY STATS */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1 font-semibold">
                    <FiMapPin size={10} className="text-indigo-400" /> Location
                  </span>
                  <span className="text-slate-200 font-sans font-medium block">Remote / Global</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase flex items-center gap-1 font-semibold">
                    <FiClock size={10} className="text-pink-400" /> Response Time
                  </span>
                  <span className="text-emerald-400 font-sans font-semibold block">&lt; 12 Hours</span>
                </div>
              </div>
            </div>

            {/* LIVE CONFIG TERMINAL LOG */}
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5 font-mono text-xs space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-slate-400 text-[10px]">
                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                  <FiTerminal size={12} /> SCOPE_PARSER
                </span>
                <span className="text-emerald-400 font-semibold">ONLINE</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <p>
                  <span className="text-indigo-400">&gt;</span> Selected Stack:{" "}
                  <span className="text-amber-300">
                    [{selectedServices.length} modules selected]
                  </span>
                </p>
                <p>
                  <span className="text-indigo-400">&gt;</span> Pipeline Status:{" "}
                  <span className="text-indigo-300">Ready for payload transmission</span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE FORM & SCOPE BUILDER */}
          <div className="contact-anim lg:col-span-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
            {/* TAB SELECTOR */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("builder")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === "builder"
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  <FiSliders size={14} /> Interactive Scope Builder
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("terminal")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === "terminal"
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  <FiTerminal size={14} /> Terminal Mode
                </button>
              </div>

              <span className="hidden sm:inline-flex text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                REST API READY
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="inline-flex p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-2">
                  <FiCheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white font-sans">
                  Scope Transmitted Successfully
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Thank you! Your project specification and contact request have been dispatched. I will review your requirements and reach out within 12 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs hover:bg-white/10 transition-colors font-medium"
                >
                  Create New Specification
                </button>
              </div>
            ) : activeTab === "builder" ? (
              /* INTERACTIVE SCOPE FORM */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* SERVICE CHIP SELECTOR */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    1. Select Required Modules
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceOptions.map((opt) => {
                      const isSelected = selectedServices.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleService(opt.id)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                            isSelected
                              ? "border-indigo-500 bg-indigo-500/10 text-white"
                              : "border-white/5 bg-slate-950/40 text-slate-400 hover:border-white/20 hover:text-slate-200"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <FiZap
                              className={isSelected ? "text-indigo-400" : "text-slate-500"}
                            />
                            {opt.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {opt.time}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* INPUT FIELDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5 font-mono text-xs">
                    <label className="text-slate-400 font-medium block">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <label className="text-slate-400 font-medium block">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-slate-400 font-medium block">
                    Project Scope / Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Outline your project goals, features, or engineering requirements..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-all font-sans resize-none"
                  />
                </div>

                {/* ERROR BANNER */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono flex items-center gap-2">
                    <FiAlertCircle className="shrink-0" size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      DISPATCHING PAYLOAD...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiSend size={14} /> TRANSMIT PROJECT SCOPE
                    </span>
                  )}
                </button>
              </form>
            ) : (
              /* CLI / TERMINAL MODE */
              <div className="rounded-xl bg-slate-950 p-5 border border-white/10 font-mono text-xs space-y-3">
                <p className="text-slate-400">// Interactive CLI Transmission Protocol</p>
                <p className="text-indigo-400">
                  $ curl -X POST http://localhost:5000/api/contact \
                </p>
                <p className="pl-4 text-slate-300">
                  -H <span className="text-emerald-400">"Content-Type: application/json"</span> \
                </p>
                <p className="pl-4 text-slate-300">
                  -d <span className="text-amber-300">'{JSON.stringify(formData)}'</span>
                </p>

                {/* ERROR BANNER IN TERMINAL MODE */}
                {errorMessage && (
                  <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono flex items-center gap-2">
                    <FiAlertCircle className="shrink-0" size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="mt-4 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all disabled:opacity-40"
                >
                  Execute Request (POST)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}