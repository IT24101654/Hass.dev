import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
// import Projects from './components/Projects';
// import Skills from './components/Skills';
// import Contact from './components/Contact';
import gradientImg from './assets/gradient.png';

import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white relative overflow-hidden z-0">

      <img
        src={gradientImg}
        alt="background gradient"
        className="fixed top-0 right-0 opacity-80 z-[-1] pointer-events-none"
      />

      <div className="fixed top-[20%] right-0 w-[15rem] h-0 shadow-[0_0_700px_15px_white] -rotate-[30deg] z-[-1] pointer-events-none"></div>

      <Navbar />

      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <About />

        {/* <Projects /> */}
        {/* <Skills /> */}
        {/* <Contact /> */}
      </div>
    </div>
  );
}

export default App;
