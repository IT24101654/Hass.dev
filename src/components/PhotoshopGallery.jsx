import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';

import bgSarees from '../../Photoshop/Backround sarees.jpg';
import comingSoon from '../../Photoshop/Coming soon Post.jpg';
import happyNewYear from '../../Photoshop/HAPPY NEW YEAR.jpg';
import hbd from '../../Photoshop/HBD.jpg';
import newYearPost from '../../Photoshop/New year post.jpg';
import template from '../../Photoshop/Lionel Food.jpg';
import groupFrame from '../../Illustrator/Lionel Food Logo.png';
import logoDesign from '../../Illustrator/Siththaru Logo.jpg';
import livingartlogo from '../../Illustrator/Living art Logo.jpg';

// =======================================================================
// 🎨 GRAPHIC DESIGNS GALLERY DATA (TEMPLATE)
// =======================================================================
// How to add a new design:
// 1. Import your image at the top (e.g. import myImage from '../assets/myImage.jpg')
// 2. Add a new object to the DESIGNS array below using this format:
// { 
//    id: 9,                           // Must be a unique number
//    img: myImage,                    // The imported image variable
//    title: 'My Awesome Poster',      // Main heading 
//    category: 'Social Media',        // Sub-heading / Tag
//    app: 'photoshop'                 // Use 'photoshop' OR 'illustrator'
// }
// =======================================================================

const DESIGNS = [
  { id: 1, img: newYearPost, title: 'New Year Post', category: 'Social Media Post', app: 'photoshop' },
  { id: 2, img: happyNewYear, title: 'Happy New Year Banner', category: 'Banner Design', app: 'photoshop' },
  { id: 3, img: hbd, title: 'Birthday Greeting', category: 'Greeting Card', app: 'photoshop' },
  { id: 4, img: comingSoon, title: 'Coming Soon', category: 'Teaser Post', app: 'photoshop' },
  { id: 5, img: bgSarees, title: 'Sarees Product BG', category: 'Product Background', app: 'photoshop' },
  { id: 8, img: logoDesign, title: 'Logo & Brand Identity', category: 'Logo Branding', app: 'illustrator' },
  { id: 9, img: livingartlogo, title: 'Living Art Logo', category: 'Logo Design', app: 'illustrator' },
  { id: 6, img: template, title: 'Social Media Template', category: 'Template Design', app: 'photoshop' },
  { id: 7, img: groupFrame, title: 'Group 1 Frame Design', category: 'Vector Illustration', app: 'illustrator' },
];

/* ── Lightbox ─────────────────────────────────────────────────── */
function Lightbox({ items, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
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
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#ff2a2a] text-[11px] font-mono tracking-widest uppercase">{item.category}</span>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-1.5">
              <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.app}/${item.app}-plain.svg`} alt={item.app} className="w-3.5 h-3.5" />
              <span className="text-gray-400 text-xs capitalize">Adobe {item.app}</span>
            </div>
          </div>
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

/* ── Poster Card ──────────────────────────────────────────────── */
function PosterCard({ item, index, onOpen, className = "", activeTab = "all" }) {
  let heightClass = `w-full h-full ${className}`;
  if (activeTab === 'photoshop') {
    heightClass = 'h-[90px] sm:h-[150px] lg:h-[180px]';
  } else if (activeTab === 'illustrator') {
    heightClass = 'h-[120px] sm:h-[220px] lg:h-[260px]';
  }

  const isFiltered = activeTab !== 'all';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
      whileHover={{ zIndex: 10, scale: 1.05, y: -4 }}
      className={`group cursor-pointer relative overflow-hidden rounded-xl bg-[#111] flex-shrink-0 ${heightClass}`}
      onClick={() => onOpen(index)}
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.06)',
        width: isFiltered ? 'max-content' : undefined
      }}
    >
      <img
        src={item.img} alt={item.title}
        className={`block h-full transition-transform duration-500 group-hover:scale-110 ${isFiltered ? 'w-auto object-contain bg-white/5' : 'w-full object-cover'}`}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent
        opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4
        opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex justify-end">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
            <FiZoomIn size={14} className="text-white" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.app}/${item.app}-plain.svg`} alt={item.app} className="w-3 h-3" />
            <p className="text-[#ff2a2a] text-[8px] font-mono tracking-widest uppercase">{item.category}</p>
          </div>
          <p className="text-white font-bold text-xs sm:text-sm leading-tight">{item.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function PhotoshopGallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section
        id="photoshop"
        ref={sectionRef}
        className="has-noise relative min-h-screen md:h-screen flex items-start md:items-center overflow-hidden bg-[#0a0a0a]"
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
            <span>SOCIAL</span>
            <span>MEDIA</span>
            <span>DESIGNS</span>
          </motion.div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
          {/* ── LEFT: Section label ── */}
          <div className="flex-shrink-0 flex flex-col justify-center items-center md:items-start text-center md:text-left pl-0 sm:pl-12 lg:pl-16 w-full md:w-[30%] pt-20 md:pt-0 pb-1 md:pb-0 md:min-w-[220px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-black text-white uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem,3.5vw,5rem)', lineHeight: 0.88 }}>
                GRAPHIC
              </h2>
              <p className="font-light text-white/55 tracking-[0.18em] uppercase mt-2"
                style={{ fontSize: 'clamp(1rem,2vw,1.6rem)' }}>
                DESIGNS.
              </p>
              <div className="flex flex-row md:flex-col gap-2 mt-5 items-center md:items-start flex-wrap justify-center">
                <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg w-fit"
                  style={{ background: 'rgba(31,117,254,0.12)', border: '1px solid rgba(31,117,254,0.3)' }}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" alt="Ps" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[#4d9fff] text-[10px] sm:text-xs font-semibold tracking-wide">Adobe Photoshop</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg w-fit"
                  style={{ background: 'rgba(255,127,39,0.1)', border: '1px solid rgba(255,127,39,0.3)' }}>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg" alt="Ai" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[#FF7F27] text-[10px] sm:text-xs font-semibold tracking-wide">Adobe Illustrator</span>
                </div>
              </div>
              <p className="text-gray-600 font-mono text-xs mt-3">{DESIGNS.length} designs · click to enlarge</p>
            </motion.div>
          </div>

          {/* ── RIGHT: Poster cards — Clean Modern Grid ── */}
          <div className="flex-1 flex flex-col justify-start pt-1 md:pt-24 px-4 md:px-0 md:pr-10 lg:pr-14 h-full">
            {/* Tabs (Fixed Position) */}
            <div className="flex-shrink-0 flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-8 bg-white/[0.04] p-1 sm:p-1.5 rounded-[10px] sm:rounded-xl border border-white/10 w-fit mx-auto backdrop-blur-md">
              {['all', 'photoshop', 'illustrator'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[11px] sm:text-sm font-semibold transition-all capitalize ${activeTab === tab
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Custom Shape Gallery */}
            <div className="flex-1 overflow-y-visible pb-16 flex flex-col justify-start pt-2">
              {(() => {
                const filteredDesigns = DESIGNS.filter(item => activeTab === 'all' || item.app === activeTab);

                const getBentoClass = (i) => {
                  if (activeTab !== 'all') return 'col-span-1 row-span-1';
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
                  <div className={
                    activeTab === 'all'
                      ? "grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(40px,7.5vh)] sm:auto-rows-[14vh] lg:auto-rows-[16vh] grid-flow-dense gap-2 md:gap-2.5 w-full max-w-5xl mx-auto px-2"
                      : activeTab === 'photoshop'
                        ? "flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full max-w-5xl mx-auto px-4 pt-2"
                        : "flex flex-wrap justify-center items-center gap-4 sm:gap-6 w-full max-w-5xl mx-auto px-4 pt-2"
                  }>
                    <AnimatePresence mode="popLayout">
                      {filteredDesigns.map((item, i) => (
                        <PosterCard
                          key={item.id}
                          item={item}
                          index={DESIGNS.indexOf(item)}
                          onOpen={setLightboxIdx}
                          className={getBentoClass(i)}
                          activeTab={activeTab}
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
          <Lightbox items={DESIGNS} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
