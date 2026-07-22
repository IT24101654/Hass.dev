import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn, FiArrowRight } from 'react-icons/fi';

import groupFrame from '../assets/Group 1 Frame.png';
import logoDesign from '../assets/logo.jpg';

const WORKS = [
  {
    id:1, img: groupFrame,
    title: 'Group 1 Frame Design',
    category: 'Vector Illustration',
    tagline: 'Precision vector frame artwork',
    desc: 'A detailed vector frame composition created with Adobe Illustrator — clean line work, structured layout, and scalable design principles.',
    accent: '#FF7F27', rotate:'-2deg',
  },
  {
    id:2, img: logoDesign,
    title: 'Logo & Brand Identity',
    category: 'Logo Branding',
    tagline: 'Identity through vector design',
    desc: 'A complete logo design built in Illustrator following professional branding principles — simplicity, memorability, and infinite scalability.',
    accent: '#FF7F27', rotate:'2deg',
  },
];

/* ── Detail Modal ─────────────────────────────────────────────── */
function DetailModal({ work, onClose }) {
  useEffect(() => {
    const k = (e) => { if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown',k);
    document.body.style.overflow='hidden';
    return () => { window.removeEventListener('keydown',k); document.body.style.overflow=''; };
  },[onClose]);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[300] flex items-center justify-center p-6"
      role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/88 backdrop-blur-xl" onClick={onClose}/>
      <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95}}
        transition={{duration:0.28}}
        className="relative z-10 w-full max-w-3xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden"
        style={{ boxShadow:`0 0 60px ${work.accent}20` }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors" aria-label="Close"><FiX size={18}/></button>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 md:w-[45%] bg-[#0a0a0a] flex items-center justify-center p-10" style={{minHeight:280}}>
            <img src={work.img} alt={work.title} className="max-w-full max-h-[260px] object-contain rounded-xl drop-shadow-2xl"/>
          </div>
          <div className="flex-1 p-7 flex flex-col">
            <span className="text-[10px] font-mono tracking-widest uppercase mb-2" style={{color:work.accent}}>{work.category}</span>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{work.title}</h3>
            <p className="text-gray-500 text-xs font-mono mb-3">{work.tagline}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{work.desc}</p>
            <div className="flex items-center gap-2 mt-auto">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg" alt="Ai" className="w-5 h-5"/>
              <span className="text-gray-500 text-xs">Adobe Illustrator</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Artwork Card ─────────────────────────────────────────────── */
function ArtworkCard({ work, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity:0, y:30, rotate:work.rotate }}
      animate={{ opacity:1, y:0, rotate:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.6, delay: index*0.12 }}
      whileHover={{ scale:1.04, rotate:work.rotate, zIndex:10 }}
      className="group cursor-pointer"
      style={{ transformOrigin:'center bottom' }}
      onClick={()=>onOpen(work)}
    >
      <div className="relative overflow-hidden rounded-2xl"
        style={{
          boxShadow:'0 16px 50px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.4)',
          border:'1px solid rgba(255,255,255,0.08)',
          background:'#111',
        }}>
        {/* Accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background:`linear-gradient(90deg, ${work.accent}, transparent)` }}/>
        {/* Image display area */}
        <div className="flex items-center justify-center p-8 bg-[#0d0d0d]" style={{ minHeight:200 }}>
          <img src={work.img} alt={work.title}
            className="max-h-[200px] max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
            loading="lazy"/>
        </div>
        {/* Footer */}
        <div className="p-4 bg-[#111]">
          <p className="text-[9px] font-mono tracking-widest uppercase mb-1" style={{color:work.accent}}>{work.category}</p>
          <p className="text-white font-bold text-sm">{work.title}</p>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
            style={{ background:`${work.accent}30`, border:`1px solid ${work.accent}60` }}>
            <FiZoomIn size={14}/> View Design
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function IllustratorGallery() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{threshold:0.05});
    if(sectionRef.current) obs.observe(sectionRef.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <>
      <section
        id="illustrator"
        ref={sectionRef}
        className="has-noise relative h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
      >
        <div className="section-bg-text" aria-hidden="true">
          <span>ILLUSTRATOR</span>
        </div>
        {/* Giant ghost letters */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true" style={{ width:'45%' }}>
          <span className="font-black uppercase leading-none"
            style={{
              fontSize:'28vw',
              color:'transparent',
              WebkitTextStroke:'2px rgba(255,127,39,0.06)',
              letterSpacing:'-0.04em',
              marginLeft:'-2vw',
              lineHeight:'0.8',
            }}>
            AI
          </span>
        </div>

        {/* Ambient glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none" aria-hidden="true"
          style={{ background:'radial-gradient(circle at 90% 90%, rgba(255,127,39,0.07) 0%, transparent 70%)' }}/>

        <div className="relative z-10 w-full h-full flex">
          {/* LEFT: Label */}
          <div className="flex-shrink-0 flex flex-col justify-center pl-8 sm:pl-12 lg:pl-16"
            style={{ width:'30%', minWidth:220 }}>
            <motion.div
              initial={{ opacity:0, x:-30 }}
              animate={visible ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.7 }}
            >
              <span className="text-[#ff2a2a] font-mono text-sm tracking-wider block mb-3">06.</span>
              <h2 className="font-black text-white uppercase leading-none tracking-tight"
                style={{ fontSize:'clamp(2rem,4.5vw,4.5rem)', lineHeight:0.88 }}>
                LOGO<br/>BRANDING
              </h2>
              <p className="font-light text-white/55 tracking-[0.15em] uppercase mt-2"
                style={{ fontSize:'clamp(0.9rem,1.8vw,1.4rem)' }}>
                DESIGNS.
              </p>
              <div className="flex items-center gap-2 mt-5 px-3 py-1.5 rounded-lg w-fit"
                style={{ background:'rgba(255,127,39,0.1)', border:'1px solid rgba(255,127,39,0.3)' }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg" alt="Ai" className="w-4 h-4"/>
                <span className="text-[#FF7F27] text-xs font-semibold tracking-wide">Adobe Illustrator</span>
              </div>
              <p className="text-gray-600 font-mono text-xs mt-3">{WORKS.length} artworks · click to view</p>
            </motion.div>
          </div>

          {/* RIGHT: Artwork cards — centered, big, staggered */}
          <div className="flex-1 flex items-center justify-center pr-8 sm:pr-12 lg:pr-16 gap-6">
            {WORKS.map((w,i)=>(
              <div key={w.id} style={{ flex:1, maxWidth:'38%', marginTop: i%2===0 ? '-40px' : '40px' }}>
                <ArtworkCard work={w} index={i} onOpen={setSelected}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <DetailModal work={selected} onClose={()=>setSelected(null)}/>}
      </AnimatePresence>
    </>
  );
}
