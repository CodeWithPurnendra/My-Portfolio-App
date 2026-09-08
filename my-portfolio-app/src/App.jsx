import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Skills from "./Components/Skills/Skill";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import CustomLoader from "./Components/CustomLoader/CustomLoader";

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

      {/* Keep main in the DOM so GSAP can calculate layout, use opacity/pointer-events instead of unmounting */}
      <main
        className={`bg-[#07060b] min-h-screen text-white transition-opacity duration-700 ${
          loading ? "opacity-0 pointer-events-none h-0 overflow-hidden" : "opacity-100 opacity-100 pointer-events-auto"
        }`}
      >
        <Hero loading={loading} />
        <Navbar />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;