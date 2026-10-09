import React, { useRef, useState, useEffect } from "react";
import { FiArrowUpRight, FiMenu, FiX, FiCode } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAV_ITEMS = [
  { name: "Home", href: "#home", id: "01" },
  { name: "About", href: "#about", id: "02" },
  { name: "Skills", href: "#skills", id: "03" },
  { name: "Projects", href: "#projects", id: "04" },
  { name: "Contact", href: "#contact", id: "05" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

export default function Navbar({ isBackendConnected = false }) {
  const [menuOpen, setMenuOpen] = useState(false); // logical state
  const [menuMounted, setMenuMounted] = useState(false); // keeps overlay in DOM during exit
  const [activeSection, setActiveSection] = useState("home");

  const headerRef = useRef(null);
  const overlayRef = useRef(null);
  const menuTweenRef = useRef(null);
  const scrollLockRef = useRef(false);
  const scrollLockTimerRef = useRef(null);

  // --------------------------------------------------
  // HEADER ENTRANCE ANIMATION
  // --------------------------------------------------
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const bar = header.querySelector(".header-bar");
      const items = header.querySelectorAll(".nav-item-anim");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        bar,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, clearProps: "transform,opacity" }
      ).fromTo(
        items,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.045,
          clearProps: "transform,opacity",
        },
        "-=0.3"
      );
    },
    { scope: headerRef }
  );

  // --------------------------------------------------
  // OPEN / CLOSE HELPERS
  // --------------------------------------------------
  const openMenu = () => {
    setMenuMounted(true);
    setMenuOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  // --------------------------------------------------
  // BODY SCROLL LOCK
  // --------------------------------------------------
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // --------------------------------------------------
  // CLOSE ON ESCAPE + WHEN RESIZED TO DESKTOP
  // --------------------------------------------------
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    mql.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  // --------------------------------------------------
  // MOBILE MENU ANIMATION (open + close)
  // --------------------------------------------------
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      // Stop whatever was running; keep current values (no revert => no flash)
      menuTweenRef.current?.kill();

      if (menuOpen) {
        const links = overlay.querySelectorAll(".mobile-nav-link");

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(overlay, {
          opacity: 1,
          clipPath: "circle(150% at 100% 0%)",
          duration: 0.5,
          ease: "power3.inOut",
        }).fromTo(
          links,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.055,
            clearProps: "transform",
          },
          "-=0.2"
        );

        menuTweenRef.current = tl;
      } else {
        menuTweenRef.current = gsap.to(overlay, {
          opacity: 0,
          clipPath: "circle(0% at 100% 0%)",
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => setMenuMounted(false),
        });
      }
    },
    { dependencies: [menuOpen] }
  );

  // --------------------------------------------------
  // ACTIVE SECTION TRACKING (scroll-position based)
  // --------------------------------------------------
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      if (scrollLockRef.current) return;

      const line = window.innerHeight * 0.35;
      let current = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;

      if (atBottom) current = SECTION_IDS[SECTION_IDS.length - 1];

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const releaseLock = () => {
      clearTimeout(scrollLockTimerRef.current);
      scrollLockRef.current = false;
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("scrollend", releaseLock);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", releaseLock);
      clearTimeout(scrollLockTimerRef.current);
    };
  }, []);

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------
  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const offset = headerRef.current?.offsetHeight ?? 0;
    const top = Math.max(
      target.getBoundingClientRect().top + window.scrollY - offset,
      0
    );

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (href) => {
    const id = href.slice(1);

    // Ignore observer updates while the smooth scroll is in flight
    scrollLockRef.current = true;
    clearTimeout(scrollLockTimerRef.current);
    scrollLockTimerRef.current = setTimeout(() => {
      scrollLockRef.current = false;
    }, 1000);

    setActiveSection(id);
    setMenuOpen(false);

    // Wait a frame so the body scroll lock is released first
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 z-50 w-full px-4 pt-4 md:px-8 md:pt-6"
      >
        <div className="header-bar mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-3.5 shadow-2xl backdrop-blur-2xl">
          {/* BRAND */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="nav-item-anim group flex items-center gap-3.5"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
              <FiCode className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Purnendra
                <span className="text-indigo-400">.dev</span>
              </span>

              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                      isBackendConnected ? "bg-emerald-400" : "bg-indigo-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      isBackendConnected ? "bg-emerald-500" : "bg-indigo-500"
                    }`}
                  />
                </span>

                <span>
                  {isBackendConnected ? "API Connected" : "Available for Hire"}
                </span>
              </div>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 py-1 md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`nav-item-anim group relative rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "font-bold text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.name}

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm shadow-indigo-500/80 transition-all duration-300 ease-out ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* DESKTOP CTA
              GSAP animates the wrapper; the link keeps its own CSS transitions,
              so the two never fight over transform/opacity. */}
          <div className="nav-item-anim hidden items-center gap-3 md:flex">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="group inline-flex items-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
            >
              <span>Let's Talk</span>
              <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            className="nav-item-anim relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-lg transition-colors hover:bg-white/10 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY
          Starts hidden via inline style (no flash on mount).
          Solid background instead of backdrop-blur: animating clip-path on a
          backdrop-filter element flickers in Chrome/Safari. */}
      {menuMounted && (
        <div
          ref={overlayRef}
          id="mobile-navigation"
          style={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-slate-950 px-6 pb-12 pt-28 will-change-[clip-path,opacity] md:hidden"
        >
          <nav aria-label="Mobile navigation">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`mobile-nav-link flex items-center justify-between rounded-2xl border px-6 py-4 transition-colors ${
                      isActive
                        ? "border-indigo-500/40 bg-indigo-600/30 text-white"
                        : "border-white/5 text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="text-xl font-bold">{item.name}</span>
                    <FiArrowUpRight className="h-5 w-5 opacity-60" />
                  </a>
                );
              })}
            </div>
          </nav>

          <p className="text-center text-xs tracking-wide text-slate-500">
            Let's build something meaningful.
          </p>
        </div>
      )}
    </>
  );
}