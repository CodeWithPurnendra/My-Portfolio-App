import { useEffect, useRef } from "react";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import { GiButterfly, GiFlowerEmblem } from "react-icons/gi";
import gsap from "gsap";
import * as THREE from "three";

function Hero({ loading = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const socialGroupRef = useRef(null);
  const cardRef = useRef(null);
  const floatingIconsRef = useRef([]);

  // THREE.JS BACKGROUND CANVAS EFFECT (Light Mode Adjusted)
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Swarm Creation - Deeper Pastel Tones for Light Mode
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const purple = new THREE.Color("#9d6bbd");
    const pink = new THREE.Color("#d175a2");

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;

      const mixedColor = Math.random() > 0.5 ? purple : pink;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      particles.rotation.y += 0.0015;
      particles.rotation.x += 0.001;

      // Smooth camera follow mouse
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
      renderer.dispose();
    };
  }, []);

  // GSAP ENTRANCE & FLOATING ANIMATIONS
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.1 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          socialGroupRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.9, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1 },
          "-=0.8"
        );

      floatingIconsRef.current.forEach((icon, index) => {
        if (!icon) return;
        gsap.to(icon, {
          y: index % 2 === 0 ? "-15px" : "15px",
          x: index % 2 === 0 ? "10px" : "-10px",
          rotate: index % 2 === 0 ? 12 : -12,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#f4f0f8] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center transition-colors duration-500"
    >
      {/* THREE.JS BACKGROUND CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* BACKGROUND AMBIENT SOFT GLOW ORBS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#c9a7e8]/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#e8a7c4]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#d8b4e2]/30 rounded-full blur-[110px] pointer-events-none" />

      {/* FLOATING MOTIF ICONS */}
      <div
        ref={(el) => (floatingIconsRef.current[0] = el)}
        className="absolute top-32 left-8 md:left-20 text-[#8a5ba6]/40 text-3xl md:text-5xl pointer-events-none"
      >
        <GiButterfly />
      </div>
      <div
        ref={(el) => (floatingIconsRef.current[1] = el)}
        className="absolute bottom-32 right-10 md:right-24 text-[#bc5d8e]/40 text-3xl md:text-5xl pointer-events-none"
      >
        <GiFlowerEmblem />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* BADGE */}
            <div
              ref={badgeRef}
              className="opacity-0 inline-flex items-center gap-2 rounded-full border border-[#8a5ba6]/20 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#703b8c] shadow-sm backdrop-blur-md mb-6"
            >
              <GiButterfly className="text-[#8a5ba6] animate-pulse" size={16} />
              <span>FULL-STACK DEVELOPER</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d175a2]" />
            </div>

            {/* MAIN TITLE */}
            <h1
              ref={titleRef}
              className="opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1a1523] tracking-tight leading-[1.1] mb-6"
            >
              Crafting Digital <br />
              <span className="bg-gradient-to-r from-[#7a4899] via-[#b34b80] to-[#8a5ba6] bg-clip-text text-transparent">
                Masterpieces
              </span>{" "}
              With Precision.
            </h1>

            {/* SUBTITLE */}
            <p
              ref={subtitleRef}
              className="opacity-0 text-base sm:text-lg text-[#4a4255] max-w-2xl font-normal leading-relaxed mb-8"
            >
              Hi, I'm <span className="text-[#8a3b68] font-semibold">Purnendra</span>. I build high-performance web applications, fluid interactive interfaces, and modern full-stack solutions with speed, elegance, and meticulous attention to detail.
            </p>

            {/* CALL TO ACTION BUTTONS */}
            <div
              ref={ctaGroupRef}
              className="opacity-0 flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
            >
              <a
                href="#projects"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#9d6bbd] to-[#d175a2] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(157,107,189,0.3)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(209,117,162,0.4)] hover:scale-[1.02]"
              >
                View Projects
                <FiArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#8a5ba6]/25 bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#5c3773] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#8a5ba6] hover:bg-white hover:text-[#1a1523]"
              >
                <FiDownload size={16} />
                Download Resume
              </a>
            </div>

            {/* SOCIAL LINKS */}
            <div ref={socialGroupRef} className="opacity-0 flex items-center gap-4 pt-2 border-t border-[#1a1523]/10 w-full">
              <span className="text-xs uppercase tracking-widest text-[#7c7388] font-medium">
                Connect
              </span>
              <div className="h-px w-8 bg-[#1a1523]/10" />
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8a5ba6]/20 bg-white/60 text-[#4a4255] shadow-sm transition-all duration-300 hover:border-[#8a5ba6] hover:bg-white hover:text-[#8a3b68] hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT HERO DISPLAY CARD */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              className="opacity-0 relative w-full max-w-md rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(122,72,153,0.12)]"
            >
              {/* Outer Glow Border */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#c9a7e8]/40 to-[#e8a7c4]/40 opacity-80 blur-sm -z-10" />

              {/* Card Header Spec */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#1a1523]/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#d175a2]" />
                  <div className="h-3 w-3 rounded-full bg-[#9d6bbd]" />
                  <div className="h-3 w-3 rounded-full bg-[#1a1523]/20" />
                </div>
                <span className="text-xs font-mono text-[#7c7388]">developer.config</span>
              </div>

              {/* Code / Profile Showcase Box */}
              <div className="rounded-2xl bg-[#f0e8f5]/80 p-5 border border-[#8a5ba6]/15 mb-6 font-mono text-xs leading-relaxed text-[#2d2438]">
                <p className="text-[#8a43b3]">// Creative Developer Profile</p>
                <p>
                  <span className="text-[#b83b7e]">const</span> developer = {"{"}
                </p>
                <p className="pl-4">
                  name: <span className="text-[#9e2b6c]">'Purnendra'</span>,
                </p>
                <p className="pl-4">
                  role: <span className="text-[#9e2b6c]">'Full-Stack Engineer'</span>,
                </p>
                <p className="pl-4">
                  skills: [<span className="text-[#7a3b99]">'React'</span>, <span className="text-[#7a3b99]">'GSAP'</span>, <span className="text-[#7a3b99]">'Three.js'</span>, <span className="text-[#7a3b99]">'Tailwind'</span>],
                </p>
                <p className="pl-4">
                  status: <span className="text-emerald-600 font-semibold">'Ready for action'</span>
                </p>
                <p>{"};"}</p>
              </div>

              {/* STATS STRIP */}
              <div className="grid grid-cols-3 gap-3 text-center pt-2">
                <div className="rounded-xl border border-[#8a5ba6]/15 bg-white/80 p-3 shadow-xs">
                  <span className="block text-xl font-bold text-[#8a43b3]">2+</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7c7388]">Years Exp</span>
                </div>
                <div className="rounded-xl border border-[#8a5ba6]/15 bg-white/80 p-3 shadow-xs">
                  <span className="block text-xl font-bold text-[#b83b7e]">15+</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7c7388]">Projects</span>
                </div>
                <div className="rounded-xl border border-[#8a5ba6]/15 bg-white/80 p-3 shadow-xs">
                  <span className="block text-xl font-bold text-[#7a3b99]">100%</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7c7388]">Precision</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;