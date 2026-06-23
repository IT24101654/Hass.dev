import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Loader from './components/Loader';
import { AnimatePresence } from 'framer-motion';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import gradientImg from './assets/gradient.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader onLoaded={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Fixed background decorations */}
      <img
        src={gradientImg}
        alt="background gradient"
        className="fixed top-0 right-0 opacity-80 z-[-1] pointer-events-none"
      />
      <div className="fixed top-[20%] right-0 w-[15rem] h-0 shadow-[0_0_700px_15px_white] -rotate-[30deg] z-[-1] pointer-events-none"></div>

      {/* Fixed Navbar */}
      <Navbar />

      {/* 
        The main snap container:
        - h-screen + overflow-y-scroll  → scrolling happens HERE (not on html/body)
        - scroll-snap-type: y mandatory → snaps on this container
        Each direct child section gets scroll-snap-align: start
      */}
      <div
        id="snap-container"
        className={`bg-[#0f0f0f] text-white ${isLoading ? 'h-screen overflow-hidden' : 'h-screen overflow-y-scroll'}`}
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {/* Section 1 – Hero */}
        <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Hero isLoading={isLoading} />
        </div>

        {/* Section 2 – About */}
        <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <About />
        </div>

        {/* Section 3 – Projects */}
        <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Projects />
        </div>

        {/* Section 4 – Skills */}
        <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Skills />
        </div>

        {/* Section 5 – Contact */}
        <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
