import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DISPLAY_NAME = 'Hass.dev';
const TAGLINE      = 'Full Stack Developer';

export default function Loader({ onLoaded }) {
  const [typed,       setTyped]       = useState('');
  const [showTagline, setShowTagline] = useState(false);
  const [progress,    setProgress]    = useState(0);

  /* ── Typewriter ──────────────────────────────── */
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(DISPLAY_NAME.slice(0, i));
      if (i >= DISPLAY_NAME.length) {
        clearInterval(t);
        setTimeout(() => setShowTagline(true), 200);
      }
    }, 110);
    return () => clearInterval(t);
  }, []);

  /* ── Progress ────────────────────────────────── */
  useEffect(() => {
    let cur = 0;
    const t = setInterval(() => {
      cur += Math.random() * 11 + 3;
      if (cur >= 100) {
        cur = 100;
        setProgress(100);
        clearInterval(t);
        setTimeout(() => onLoaded(), 450);
      } else {
        setProgress(Math.floor(cur));
      }
    }, 85);
    return () => clearInterval(t);
  }, [onLoaded]);

  const statusLabel =
    progress < 25 ? 'initialising...'
    : progress < 55 ? 'loading assets...'
    : progress < 85 ? 'preparing scene...'
    : 'ready';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.75, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] bg-[#09090b] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* ── Keyframes ────────────────────────────── */}
      <style>{`
        @keyframes scan  { 0%   { top: -2px; } 100% { top: 100%; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes cornerPulse { 0%,100% { opacity: .35; } 50% { opacity: .85; } }

        .ld-scanline {
          position: absolute; left: 0; width: 100%; height: 120px; pointer-events: none;
          background: linear-gradient(to bottom,
            transparent 0%, rgba(255,42,42,.04) 50%, transparent 100%);
          animation: scan 5s linear infinite;
        }
        .ld-cursor  { animation: blink .75s step-end infinite; }
        .ld-ring    { animation: spin 1.4s linear infinite; transform-origin: center; }
        .ld-corner  { animation: cornerPulse 2.4s ease-in-out infinite; }
      `}</style>

      {/* Scanline */}
      <div className="ld-scanline" aria-hidden="true" />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,42,42,.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:       'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 700, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(255,42,42,.07) 0%, transparent 60%)',
      }} />

      {/* Corner brackets */}
      {[['top-8 left-8','borderTop borderLeft'],['top-8 right-8','borderTop borderRight'],
        ['bottom-8 left-8','borderBottom borderLeft'],['bottom-8 right-8','borderBottom borderRight']]
        .map(([pos, borders], i) => (
          <div key={i} className={`ld-corner absolute ${pos}`} aria-hidden="true" style={{
            width: 28, height: 28,
            borderTop:    borders.includes('borderTop')    ? '2px solid rgba(255,42,42,.55)' : 'none',
            borderBottom: borders.includes('borderBottom') ? '2px solid rgba(255,42,42,.55)' : 'none',
            borderLeft:   borders.includes('borderLeft')  ? '2px solid rgba(255,42,42,.55)' : 'none',
            borderRight:  borders.includes('borderRight') ? '2px solid rgba(255,42,42,.55)' : 'none',
          }} />
        ))
      }

      {/* ── Centre content ─────────────────────── */}
      <div className="relative flex flex-col items-center gap-0">



        {/* Name — typewriter */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="flex items-baseline mb-2 h-14"
        >
          <h1 className="text-white font-extrabold text-5xl tracking-tight"
              style={{ fontFamily: 'Inter,sans-serif', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#ff2a2a', filter: 'drop-shadow(0 0 6px rgba(255,42,42,.7))' }}>
              {typed.slice(0, 1)}
            </span>
            {typed.slice(1)}
            <span className="ld-cursor text-[#ff2a2a] ml-0.5">|</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <div className="h-7 mb-14 flex items-center">
          <AnimatePresence>
            {showTagline && (
              <motion.p
                key="tagline"
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 0.7 }}
                className="text-gray-500 text-xs font-mono uppercase tracking-[0.3em]"
              >
                {TAGLINE}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-64 sm:w-80">
          <div className="relative h-[2px] rounded-full bg-white/[0.05] overflow-visible">
            {/* Track fill */}
            <div
              style={{
                position: 'absolute', inset: '0 auto 0 0',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #cc1a1a, #ff2a2a)',
                borderRadius: 999,
                boxShadow: '0 0 12px rgba(255,42,42,.8), 0 0 24px rgba(255,42,42,.3)',
                transition: 'width 0.1s linear',
              }}
            />
            {/* Leading glow dot */}
            <div style={{
              position: 'absolute', top: '50%',
              left: `${Math.min(progress, 99.5)}%`,
              transform: 'translate(-50%, -50%)',
              width: 6, height: 6, borderRadius: '50%',
              background: '#ff2a2a',
              boxShadow: '0 0 10px 3px rgba(255,42,42,.9)',
              transition: 'left 0.1s linear',
            }} />
          </div>

          {/* Status row */}
          <div className="flex justify-between items-center mt-3">
            <motion.span
              key={statusLabel}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-gray-600 text-[10px] font-mono tracking-wider"
            >
              {statusLabel}
            </motion.span>
            <span className="text-[11px] font-mono font-semibold"
              style={{ color: '#ff2a2a', textShadow: '0 0 8px rgba(255,42,42,.6)' }}>
              {progress}%
            </span>
          </div>
        </div>

      </div>


    </motion.div>
  );
}
