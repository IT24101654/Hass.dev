import React, { useState, useEffect, useRef, useCallback } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ isLoading, onSplineLoadProp }) => {

  const containerRef = useRef(null);
  useEffect(() => {
    containerRef.current = document.getElementById('snap-container');
  }, []);

  const { scrollY } = useScroll({ container: containerRef });

  const splineCanvas = useRef(null);
  const onSplineLoad = useCallback((app) => {
    splineCanvas.current = app?.canvas ?? null;
    if (onSplineLoadProp) onSplineLoadProp();
  }, [onSplineLoadProp]);
  const onSectionMouseMove = useCallback((e) => {
    const c = splineCanvas.current;
    if (!c) return;
    // bubbles: false prevents the event re-triggering the parent onMouseMove (infinite loop fix)
    c.dispatchEvent(new MouseEvent('mousemove', {
      clientX: e.clientX, clientY: e.clientY,
      bubbles: false, cancelable: true,
    }));
  }, []);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;

  // Mobile: start smaller so the robot fits; desktop: keep original feel
  const initialScale = isMobile ? 1.5 : isTablet ? 0.8 : 1.1;
  const finalScale = isMobile ? 3.0 : isTablet ? 1.8 : 4.5;

  const hassStrokeFontSize = isMobile ? '40vw' : isTablet ? '25vw' : '35vw';

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const scale = useTransform(scrollY, [0, 900], [initialScale, finalScale]);
  const y = useTransform(scrollY, [0, 900], [0, -250]);

  const handleMouseMove = useCallback((e) => {
    // Pass to spline
    onSectionMouseMove(e);

    // Update coordinates for spotlight
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yC = e.clientY - rect.top;
    setMousePosition({ x, y: yC });
  }, [onSectionMouseMove]);

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      {/* Spotlight Background Text (Filled gradient, follows mouse) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          WebkitMaskImage: `radial-gradient(circle 380px at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
          maskImage: `radial-gradient(circle 380px at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
          transition: 'mask-image 0.05s, -webkit-mask-image 0.05s',
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full overflow-visible drop-shadow-2xl"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hass-fill-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff2a2a" />
              <stop offset="100%" stopColor="#ff7b00" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y={isMobile ? "28%" : "50%"}
            dominantBaseline="central"
            textAnchor="middle"
            className="select-none"
            style={{
              fontFamily: '"Impact", sans-serif',
              fontSize: hassStrokeFontSize,
              letterSpacing: '0.05em',
              fill: 'url(#hass-fill-grad)',
            }}
          >
            HASS
          </text>
        </svg>
      </div>

      <motion.div
        style={{ scale, y }}
        className="absolute top-[-5vh] md:top-[-90vh] xl:top-[-45%] left-1/2 -translate-x-1/2 w-[180vw] md:w-[300vw] xl:w-[140%] h-[180vw] md:h-[300vw] xl:h-[150%] z-[1] pointer-events-auto origin-center"
      >
        <motion.div
          initial={{ scale: 1.8, opacity: 1 }}
          animate={isLoading ? { scale: 1.8, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Spline
            onLoad={onSplineLoad}
            scene="https://prod.spline.design/1exYaNclVVLtii4g/scene.splinecode"
            className="drop-shadow-[1px_1px_1px_rgba(255,42,42,0.1)]"
          />
        </motion.div>
      </motion.div>

      {/* Stroke SVG HASS — gradient stroke, always visible, behind robot */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* gradient left-to-right across text bounding box */}
            <linearGradient id="hass-stroke-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff2a2a" />
              <stop offset="100%" stopColor="#ff7b00" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y={isMobile ? "28%" : "50%"}
            dominantBaseline="central"
            textAnchor="middle"
            style={{
              fontFamily: '"Impact", sans-serif',
              fontSize: hassStrokeFontSize,
              letterSpacing: '0.05em',
              fill: 'transparent',
              stroke: 'url(#hass-stroke-grad)',
              strokeWidth: '0.3px',
              paintOrder: 'stroke',
            }}
          >
            HASS
          </text>
        </svg>
      </div>

      <a href="#hero-details" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10 hover:opacity-80 transition-opacity">
        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff2a2a] to-transparent"></div>
      </a>
    </section>
  );
};

export default Hero;
