import React, { useEffect, useRef } from "react";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiTerminal,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(useGSAP);

export default function Hero({ loading = false, isBackendConnected = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // THREE.JS INTERACTIVE BACKGROUND CANVAS
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Swarm Creation
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color("#6366f1"); // Indigo
    const color2 = new THREE.Color("#ec4899"); // Pink
    const color3 = new THREE.Color("#8b5cf6"); // Purple

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 14;

      const rand = Math.random();
      const mixedColor = rand < 0.33 ? color1 : rand < 0.66 ? color2 : color3;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle Icosahedron Wireframe Center Object
    const wireGeo = new THREE.IcosahedronGeometry(2, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.6;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.6;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      particles.rotation.y += 0.0012;
      particles.rotation.x += 0.0008;

      wireMesh.rotation.x += 0.002;
      wireMesh.rotation.y += 0.003;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  // GSAP ENTRANCE ANIMATIONS
  useGSAP(
    () => {
      if (loading) return;

      gsap.set(".hero-badge", { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(".hero-title", { opacity: 0, y: 30 });
      gsap.set(".hero-subtitle", { opacity: 0, y: 20 });
      gsap.set(".hero-cta", { opacity: 0, y: 20 });
      gsap.set(".hero-social", { opacity: 0, x: -20 });
      gsap.set(".hero-card", { opacity: 0, scale: 0.92, y: 40 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".hero-badge", { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.2 })
        .to(".hero-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(".hero-social", { opacity: 1, x: 0, duration: 0.5 }, "-=0.4")
        .to(".hero-card", { opacity: 1, scale: 1, y: 0, duration: 0.9 }, "-=0.7");
    },
    { scope: containerRef, dependencies: [loading] }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-slate-950 pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center transition-colors duration-500"
    >
      {/* THREE.JS BACKGROUND CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* AMBIENT BACKGROUND LIGHT GLOWS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-pink-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* BADGE */}
            <div className="hero-badge inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-indigo-300 shadow-sm backdrop-blur-md mb-6 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              <span>Full-Stack & Interactive Web Developer</span>
            </div>

            {/* MAIN TITLE */}
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Engineering High Performance <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Digital Experiences.
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="hero-subtitle text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
              Hi, I'm <span className="text-white font-semibold">Purnendra</span>. I design and build full-stack web applications, interactive 3D interfaces, and scalable API systems with clean architecture and seamless UI animations.
            </p>

            {/* CALL TO ACTION BUTTONS */}
            <div className="hero-cta flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#projects"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Projects</span>
                <FiArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <FiDownload size={16} />
                <span>Get Resume</span>
              </a>
            </div>

            {/* SOCIAL LINKS */}
            <div className="hero-social flex items-center gap-4 pt-4 border-t border-white/10 w-full">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
                // Connect
              </span>
              <div className="h-px w-8 bg-white/10" />
              <div className="flex items-center gap-3">
                {[
                  { icon: <FiGithub size={18} />, href: "https://github.com/CodeWithPurnendra", label: "GitHub" },
                  { icon: <FiLinkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <FiMail size={18} />, href: "mailto:purnendranishad5@gmail.com", label: "Email" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 shadow-sm transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-500/20 hover:text-white hover:scale-105"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT TERMINAL CARD */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="hero-card relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-2xl shadow-2xl">
              
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-pink-500/30 opacity-70 blur-md -z-10" />

              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <FiTerminal size={14} className="text-indigo-400" />
                  <span>developer.ts</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="rounded-xl bg-slate-950/80 p-4 border border-white/5 mb-5 font-mono text-xs leading-relaxed text-slate-300">
                <p className="text-indigo-400">// Software Engineer & Web Architect</p>
                <p className="mt-1">
                  <span className="text-pink-400">interface</span> Developer {"{"}
                </p>
                <p className="pl-4 text-slate-300">
                  name: <span className="text-emerald-400">'Purnendra'</span>;
                </p>
                <p className="pl-4 text-slate-300">
                  stack: [<span className="text-amber-300">'PERN'</span>, <span className="text-amber-300">'Three.js'</span>, <span className="text-amber-300">'GSAP'</span>];
                </p>
                <p className="pl-4 text-slate-300">
                  status: <span className="text-indigo-300">{isBackendConnected ? "'API Connected'" : "'Available for Hire'"}</span>;
                </p>
                <p>{"}"}</p>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-emerald-400">➜</span>
                  <span className="text-indigo-300">~</span>
                  <span className="animate-pulse font-bold text-white">_</span>
                </div>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <FiCpu className="mx-auto text-indigo-400 mb-1" size={16} />
                  <span className="block text-lg font-bold text-white">2+</span>
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Years Exp</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <FiLayers className="mx-auto text-pink-400 mb-1" size={16} />
                  <span className="block text-lg font-bold text-white">15+</span>
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Projects</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <span className="block text-lg font-bold text-emerald-400 mt-5">100%</span>
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Quality</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}