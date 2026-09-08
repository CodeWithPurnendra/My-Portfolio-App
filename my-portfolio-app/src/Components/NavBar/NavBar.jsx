import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins safely
gsap.registerPlugin(useGSAP);

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const headerRef = useRef(null);
  const navContainerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);
  const mobileMenuRef = useRef(null);

  linksRef.current = [];

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // OFFICIAL GSAP REACT HOOK (Handles cleanup, mounting & strict mode automatically)
  useGSAP(
    () => {
      // Create a fresh timeline scope
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .to(navContainerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
        })
        .to(
          logoRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
          },
          "-=0.4"
        )
        .to(
          linksRef.current,
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.4,
          },
          "-=0.3"
        )
        .to(
          ctaRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.2"
        );
    },
    { scope: headerRef }
  );

  // ACTIVE SECTION OBSERVER
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // MOBILE MENU ANIMATION
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -15, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        }
      );
    }
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  return (
    <header ref={headerRef} className="fixed left-0 top-0 z-50 w-full px-4 pt-4">
      {/* navContainer initial state forced via inline style to prevent hydration layout shift */}
      <nav
        ref={navContainerRef}
        style={{ opacity: 0, transform: "translateY(-30px)" }}
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/80 bg-white/75 px-5 py-3.5 backdrop-blur-xl shadow-[0_10px_30px_rgba(122,72,153,0.08)]"
        aria-label="Main navigation"
      >
        {/* LOGO */}
        <a
          ref={logoRef}
          style={{ opacity: 0, transform: "translateX(-20px)" }}
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#9d6bbd] to-[#d175a2] text-sm font-extrabold text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(209,117,162,0.35)]">
            PN
            <span className="absolute inset-0 rounded-full border border-white/40 transition-all duration-300 group-hover:scale-125" />
          </span>

          <span className="hidden text-sm font-bold tracking-[0.2em] text-[#1a1523] transition-colors duration-300 group-hover:text-[#8a3b68] sm:block">
            PURNENDRA
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 md:flex lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);

            return (
              <a
                key={item.name}
                ref={addToLinksRef}
                style={{ opacity: 0, transform: "translateY(-10px)" }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`group relative shrink-0 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#8a3b68] font-semibold"
                    : "text-[#4a4255] hover:text-[#7a4899]"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#9d6bbd] to-[#d175a2] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden md:block">
          <a
            ref={ctaRef}
            style={{ opacity: 0, transform: "translateX(20px)" }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="group inline-flex items-center gap-2 rounded-full border border-[#8a5ba6]/30 bg-white/80 px-5 py-2 text-sm font-semibold text-[#5c3773] shadow-xs backdrop-blur-md transition-all duration-300 hover:border-[#8a5ba6] hover:bg-[#8a5ba6] hover:text-white hover:shadow-[0_8px_20px_rgba(138,91,166,0.25)]"
          >
            Let's Talk
            <FiArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#8a5ba6]/20 bg-white/80 text-[#1a1523] shadow-xs transition-all duration-300 hover:border-[#8a5ba6] hover:text-[#8a3b68] md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="mx-auto mt-2 w-full max-w-7xl rounded-2xl border border-white/90 bg-white/90 p-4 backdrop-blur-xl shadow-[0_20px_40px_rgba(122,72,153,0.12)] md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#f0e8f5] text-[#8a3b68] font-semibold"
                      : "text-[#4a4255] hover:bg-[#f0e8f5]/60 hover:text-[#7a4899]"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}

            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9d6bbd] to-[#d175a2] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:opacity-95"
            >
              Let's Talk
              <FiArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;