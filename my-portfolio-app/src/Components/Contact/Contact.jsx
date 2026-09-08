import { useState, useEffect, useRef } from "react";
import {
    FiMail, FiGithub, FiLinkedin, FiSend, FiTerminal,
    FiCheckCircle, FiCopy, FiMapPin, FiClock
} from "react-icons/fi";
import { GiButterfly, GiFlowerEmblem } from "react-icons/gi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
    const sectionRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Full-Stack Opportunity",
        message: "",
    });

    const emailAddress = "purnendranishad5@gmail.com";

    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-card",
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
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

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API request delay
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1200);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative min-h-screen w-full overflow-hidden bg-slate-50 py-28 md:py-36 flex items-center justify-center font-sans text-slate-800"
        >
            {/* BACKGROUND ATMOSPHERIC GLOWS */}
            <div className="absolute top-1/4 left-[-10%] w-[550px] h-[550px] bg-purple-200/50 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-[-10%] w-[550px] h-[550px] bg-pink-200/50 rounded-full blur-[140px] pointer-events-none" />

            {/* FLOATING MOTIF ACCENTS */}
            <div className="absolute top-20 right-16 text-purple-400/20 text-6xl pointer-events-none animate-pulse">
                <GiButterfly />
            </div>
            <div className="absolute bottom-20 left-16 text-pink-400/20 text-6xl pointer-events-none">
                <GiFlowerEmblem />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 space-y-12">

                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-purple-700 backdrop-blur-xl mb-4 shadow-sm">
                        <GiButterfly className="text-purple-600" size={16} />
                        <span>INITIATE CONNECTION</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        Let's Build <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">Together</span>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base">
                        Whether you have a project idea, a full-stack engineering role, or just want to connect—send a packet through the pipeline.
                    </p>
                </div>

                {/* MAIN CONTACT CONTAINER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT 5 COLS: DIRECT CONNECTIONS & TERMINAL SPEC */}
                    <div className="contact-card lg:col-span-5 space-y-6">

                        {/* DIRECT EMAIL CARD */}
                        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur-2xl shadow-xl shadow-purple-900/5 space-y-4">
                            <span className="text-xs font-mono text-purple-600 font-semibold tracking-widest uppercase block">
                                Direct Communication
                            </span>

                            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/80">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 shrink-0 border border-purple-200">
                                        <FiMail size={18} />
                                    </div>
                                    <span className="text-xs font-mono text-slate-700 truncate font-medium">{emailAddress}</span>
                                </div>

                                <button
                                    onClick={handleCopyEmail}
                                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 shadow-sm"
                                    title="Copy email to clipboard"
                                >
                                    {copied ? <FiCheckCircle className="text-emerald-500" size={16} /> : <FiCopy size={16} />}
                                </button>
                            </div>

                            {/* LOCATION & STATUS STATS */}
                            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                                    <span className="text-slate-400 block text-[10px] uppercase flex items-center gap-1 font-semibold">
                                        <FiMapPin size={10} /> Base Location
                                    </span>
                                    <span className="text-slate-800 font-sans font-medium">Remote / Global</span>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                                    <span className="text-slate-400 block text-[10px] uppercase flex items-center gap-1 font-semibold">
                                        <FiClock size={10} /> Availability
                                    </span>
                                    <span className="text-emerald-600 font-sans font-semibold">Open to Roles</span>
                                </div>
                            </div>
                        </div>

                        {/* SOCIAL NETWORKS */}
                        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur-2xl shadow-xl shadow-purple-900/5 space-y-4">
                            <span className="text-xs font-mono text-pink-600 font-semibold tracking-widest uppercase block">
                                Network & Repositories
                            </span>

                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href="https://github.com/CodeWithPurnendra"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-50/50 transition-all group shadow-sm"
                                >
                                    <FiGithub className="text-slate-600 group-hover:text-purple-600" size={18} />
                                    <span className="text-xs font-mono text-slate-700 font-medium group-hover:text-slate-900">GitHub</span>
                                </a>

                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-pink-300 hover:bg-pink-50/50 transition-all group shadow-sm"
                                >
                                    <FiLinkedin className="text-slate-600 group-hover:text-pink-600" size={18} />
                                    <span className="text-xs font-mono text-slate-700 font-medium group-hover:text-slate-900">LinkedIn</span>
                                </a>
                            </div>
                        </div>

                        {/* SYSTEM TERMINAL LOG */}
                        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 backdrop-blur-2xl font-mono text-xs space-y-3 shadow-2xl">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400 text-[10px]">
                                <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                                    <FiTerminal size={12} /> DISPATCH_SOCKET
                                </span>
                                <span className="text-emerald-400 font-semibold">STATUS: LISTENING</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-[11px]">
                                <span className="text-purple-400 mr-1.5">&gt;</span>
                                {submitted
                                    ? "HTTP/1.1 200 OK - Message payload dispatched successfully."
                                    : "Ready to transmit request payload to developer runtime."}
                            </p>
                        </div>

                    </div>

                    {/* RIGHT 7 COLS: FORM TIER */}
                    <div className="contact-card lg:col-span-7 rounded-3xl border border-slate-200 bg-white/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl shadow-purple-900/5">

                        {submitted ? (
                            <div className="py-12 text-center space-y-4 font-mono">
                                <div className="inline-flex p-4 rounded-full bg-purple-100 border border-purple-200 text-purple-700 mb-2">
                                    <FiCheckCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 font-sans">Packet Delivered</h3>
                                <p className="text-xs text-slate-600 max-w-md mx-auto">
                                    Thank you for getting in touch. Your message payload has been logged and I will respond shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs hover:bg-slate-200 transition-colors font-medium"
                                >
                                    Send Another Transmission
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">Transmission Payload</h3>
                                    <span className="text-[10px] font-mono font-semibold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200">
                                        SECURE ROUTE
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* NAME INPUT */}
                                    <div className="space-y-1.5 font-mono text-xs">
                                        <label className="text-slate-600 font-medium block">Ident / Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Jane Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition-all font-sans shadow-sm"
                                        />
                                    </div>

                                    {/* EMAIL INPUT */}
                                    <div className="space-y-1.5 font-mono text-xs">
                                        <label className="text-slate-600 font-medium block">Return Address / Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="jane@company.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition-all font-sans shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* SUBJECT INPUT */}
                                <div className="space-y-1.5 font-mono text-xs">
                                    <label className="text-slate-600 font-medium block">Subject Specification</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full-Stack Opportunity"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition-all font-sans shadow-sm"
                                    />
                                </div>

                                {/* MESSAGE INPUT */}
                                <div className="space-y-1.5 font-mono text-xs">
                                    <label className="text-slate-600 font-medium block">Payload / Message Body</label>
                                    <textarea
                                        rows={4}
                                        required
                                        placeholder="Outline your project scope, inquiry, or engineering role..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition-all font-sans resize-none shadow-sm"
                                    />
                                </div>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 disabled:opacity-50 active:scale-[0.99]"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                            DISPATCHING...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <FiSend size={14} />
                                            TRANSMIT MESSAGE
                                        </span>
                                    )}
                                </button>

                            </form>
                        )}

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Contact;