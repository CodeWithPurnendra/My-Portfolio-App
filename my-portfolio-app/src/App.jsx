import { useState, useEffect, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Critical components loaded immediately (above the fold)
import CustomLoader from "./Components/CustomLoader/CustomLoader";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/NavBar/NavBar";

// Lazy-loaded components (code-split into separate chunks)
const About = lazy(() => import("./Components/About/About"));
const Skills = lazy(() => import("./Components/Skills/Skill"));
const Projects = lazy(() => import("./Components/Projects/Projects"));
const Contact = lazy(() => import("./Components/Contact/Contact"));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Force GSAP to recalculate all scroll positions after DOM renders
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      {loading && <CustomLoader onComplete={() => setLoading(false)} />}

      {/* Main container remains in DOM so GSAP can calculate layout metrics */}
      <main
        className={`bg-[#07060b] min-h-screen text-white transition-opacity duration-700 ${
          loading
            ? "opacity-0 pointer-events-none h-0 overflow-hidden"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <Hero loading={loading} />
        <Navbar />

        {/* Wrap non-critical sections in Suspense */}
        <Suspense fallback={<div className="min-h-screen bg-[#07060b]" />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
    </>
  );
}

export default App;