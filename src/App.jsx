import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroDetails from './components/HeroDetails';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const handleLoaded = useCallback(() => setIsLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader key="loader" onLoaded={handleLoaded} isSplineLoaded={isSplineLoaded} />}
      </AnimatePresence>

      {/* Fixed red glow top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 right-0 z-0"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle at 80% 10%, rgba(255,42,42,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Main scrollable container */}
      <div
        id="snap-container"
        className="bg-[#0a0a0a] text-white snap-container"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          visibility: isLoading ? 'hidden' : 'visible',
        }}
        aria-hidden={isLoading}
      >
        <Navbar />

        {/* Section 1 – Hero */}
        <div className="section-snap h-screen shrink-0 relative w-full">
          <Hero isLoading={isLoading} onSplineLoadProp={() => setIsSplineLoaded(true)} />
        </div>

        {/* Section 1.5 - Hero Details */}
        <div className="section-snap h-screen shrink-0 relative w-full">
          <HeroDetails />
        </div>

        {/* Section 2 – About */}
        <div className="section-snap section-about shrink-0 relative w-full">
          <About />
        </div>

        {/* Section 3 – Projects */}
        <div className="section-snap section-projects shrink-0 relative w-full">
          <Projects />
        </div>

        {/* Section 4 – Skills */}
        <div className="section-snap section-skills shrink-0 relative w-full">
          <Skills />
        </div>

        {/* Section 5 – Contact */}
        <div className="section-snap section-contact shrink-0 relative w-full">
          <Contact />
        </div>

      </div>
    </>
  );
}
