import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';

import artist from '../../My Hobby/Artist.jpg';
import baby from '../../My Hobby/Baby.jpeg';
import dulmini from '../../My Hobby/Dulmini akka.jpg';
import fam from '../../My Hobby/Fam.jpg';
import tilini from '../../My Hobby/Tilini Teacher.jpeg';
import mashi from '../../My Hobby/Mashi Fam.jpeg';
import all from '../../My Hobby/All.jpeg';
import acrylic from '../../My Hobby/Acrylic paint.jpeg';
import kawindu from '../../My Hobby/Kawindu.jpeg';

// =======================================================================
// 🎨 MY HOBBY ARTWORKS DATA
// =======================================================================
const ARTWORKS = [
  { id: 1, img: artist, title: 'The Artist at Work', category: 'Photography' },
  { id: 2, img: baby, title: 'Baby Portrait', category: 'Pencil Art' },
  { id: 6, img: all, title: 'All Drawing', category: 'Pencil Art' },
  { id: 3, img: dulmini, title: 'Dulmini Akka', category: 'Pencil Art' },
  { id: 9, img: fam, title: 'Family', category: 'Personal' },
  { id: 4, img: tilini, title: 'Tilini Teacher', category: 'Pencil Art' },
  { id: 8, img: kawindu, title: 'Kawindu Portrait', category: 'Pencil Art' },
  { id: 5, img: mashi, title: 'Mashi Fam', category: 'Pencil Art' },
  { id: 7, img: acrylic, title: 'Acrylic Paint', category: 'Painting' },
];

/* ── Lightbox ─────────────────────────────────────────────────── */
function Lightbox({ items, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const item = items[idx];
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [items.length, onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex flex-col p-6 sm:p-8"
      role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />

      {/* Close Button */}
      <button onClick={onClose} className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-[#ff2a2a]/30 text-white transition-colors" aria-label="Close"><FiX size={20} /></button>

      {/* Image Area */}
      <div className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img key={idx} src={item.img} alt={item.title}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
            className="max-h-full max-w-full object-contain rounded-md shadow-2xl" />
        </AnimatePresence>
      </div>

      {/* Bottom Controls & Details */}
      <div className="relative z-10 shrink-0 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-6 mt-4 border-t border-white/10">
        {/* Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[#ff2a2a] text-[11px] font-mono tracking-widest uppercase mb-1.5">{item.category}</span>
          <h3 className="text-white font-bold text-xl md:text-2xl">{item.title}</h3>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5">
          <button onClick={() => setIdx(i => (i - 1 + items.length) % items.length)} className="p-3 rounded-full bg-white/10 hover:bg-[#ff2a2a] hover:text-white text-gray-300 transition-colors" aria-label="Previous"><FiChevronLeft size={22} /></button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="rounded-full transition-all duration-300"
                style={{ width: i === idx ? 28 : 8, height: 8, background: i === idx ? '#ff2a2a' : 'rgba(255,255,255,0.2)' }} aria-label={`Go to ${i + 1}`} />
            ))}
          </div>
          <button onClick={() => setIdx(i => (i + 1) % items.length)} className="p-3 rounded-full bg-white/10 hover:bg-[#ff2a2a] hover:text-white text-gray-300 transition-colors" aria-label="Next"><FiChevronRight size={22} /></button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Artwork Card ─────────────────────────────────────────────── */
function ArtworkCard({ work, index, onOpen, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
      whileHover={{ zIndex: 10, scale: 1.05, y: -4 }}
      className={`group cursor-pointer relative overflow-hidden rounded-xl bg-[#111] flex-shrink-0 w-full h-full ${className}`}
      onClick={() => onOpen(index)}
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <img src={work.img} alt={work.title}
        className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-110"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent
        opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4
        opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex justify-end">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
            <FiZoomIn size={16} className="text-white" />
          </div>
        </div>
        <div>
          <p className="text-[#ff2a2a] text-[10px] font-mono tracking-widest uppercase mb-1">{work.category}</p>
          <p className="text-white font-bold text-sm leading-tight">{work.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function HobbySection() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section
        id="hobby"
        ref={sectionRef}
        className="has-noise relative min-h-screen md:h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
      >
        {/* ── HUGE BACKGROUND TEXT ── */}
        <div className="absolute left-0 top-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden flex flex-col justify-start md:justify-center pt-13 md:pt-0" style={{ width: '60%' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col whitespace-nowrap"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(5rem, 14vw, 22rem)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: '10px',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.02\'/%3E%3C/svg%3E"), rgba(255, 255, 255, 0.04)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              transform: 'translateX(-5%)',
            }}
          >
            <span>HAND</span>
            <span>DRAWN</span>
            <span>ARTWORKS</span>
          </motion.div>
        </div>

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle at 10% 90%, rgba(255,42,42,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
          {/* LEFT: Label */}
          <div className="flex-shrink-0 flex flex-col justify-center items-center md:items-start text-center md:text-left pl-0 sm:pl-12 lg:pl-16 w-full md:w-[28%] pt-20 md:pt-0 pb-4 md:pb-0 md:min-w-[200px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-black text-white uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem,3.5vw,5rem)', lineHeight: 0.88 }}>
                ARTWORKS
              </h2>
              <p className="font-light text-white/55 tracking-[0.15em] uppercase mt-2"
                style={{ fontSize: 'clamp(0.8rem,1.6vw,1.3rem)' }}>
                & PAINTINGS.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed mt-4 max-w-[95%] px-2 md:px-0 md:max-w-[180px]">
                Hand-drawn portraits, paintings, photography, and personal moments.
              </p>
              <p className="text-gray-600 font-mono text-xs mt-3">{ARTWORKS.length} artworks · click to view</p>
            </motion.div>
          </div>

          {/* RIGHT: Artwork cards — Clean Modern Grid */}
          <div className="flex-1 overflow-y-visible pr-2 pb-4 md:pb-16 flex flex-col justify-start pt-2 h-full">
            <div className="w-full flex flex-col items-center justify-center max-w-5xl mx-auto h-full pt-4 md:pt-[15vh] lg:pt-[20vh] pb-4 md:pb-[10vh]">
              {(() => {
                const getBentoClass = (i) => {
                  switch (i) {
                    case 0: return 'col-span-1 row-span-2'; // Top-left tall
                    case 1: return 'col-span-1 row-span-1'; // Top-mid small
                    case 2: return 'col-span-1 row-span-1'; // Top-mid small
                    case 3: return 'col-span-1 row-span-2'; // Top-right tall
                    case 4: return 'col-span-2 row-span-2'; // CENTER GIANT
                    case 5: return 'col-span-1 row-span-2'; // Bottom-left tall
                    case 6: return 'col-span-1 row-span-2'; // Bottom-right tall
                    case 7: return 'col-span-1 row-span-1'; // Bottom-mid small
                    case 8: return 'col-span-1 row-span-1'; // Bottom-mid small
                    default: return 'col-span-1 row-span-1';
                  }
                };

                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(70px,11vh)] sm:auto-rows-[16vh] lg:auto-rows-[18vh] grid-flow-dense gap-2 md:gap-2.5 w-full px-2">
                    <AnimatePresence mode="popLayout">
                      {ARTWORKS.map((w, i) => (
                        <ArtworkCard
                          key={w.id}
                          work={w}
                          index={i}
                          onOpen={setLightboxIdx}
                          className={getBentoClass(i)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox items={ARTWORKS} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
