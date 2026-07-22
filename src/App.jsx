import React, { useState, useCallback, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import PhotoshopGallery from './components/PhotoshopGallery';
import HobbySection from './components/HobbySection';
import Skills from './components/Skills';
import Contact from './components/Contact';

const JarvisPage = lazy(() => import('./pages/JarvisPage'));

function Portfolio() {
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
          /* will-change hints the GPU without creating a new stacking context
             (transform:translateZ(0) was removed — it breaks position:fixed children like Navbar) */
          willChange: 'scroll-position',
        }}
        aria-hidden={isLoading}
      >
        <Navbar />


        {/* Section 1 – Hero */}
        <div className="section-snap h-screen shrink-0 relative w-full">
          <Hero isLoading={isLoading} onSplineLoadProp={() => setIsSplineLoaded(true)} />
        </div>



        {/* Section 2 – About */}
        <div className="section-snap section-about shrink-0 relative w-full">
          <About />
        </div>

        {/* Section 3 – Projects */}
        <div className="section-snap section-projects shrink-0 relative w-full">
          <Projects />
        </div>

        {/* Section 4 – Graphic Gallery (Photoshop + Illustrator) */}
        <div className="section-snap section-gallery shrink-0 relative w-full">
          <PhotoshopGallery />
        </div>

        {/* Section 5 – My Hobby */}
        <div className="section-snap section-gallery shrink-0 relative w-full">
          <HobbySection />
        </div>

        {/* Section 7 – Skills */}
        <div className="section-snap section-skills shrink-0 relative w-full">
          <Skills />
        </div>

        {/* Section 8 – Contact */}
        <div className="section-snap section-contact shrink-0 relative w-full">
          <Contact />
        </div>

      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/jarvis" element={
        <Suspense fallback={null}>
          <JarvisPage />
        </Suspense>
      } />
    </Routes>
  );
}

